import {Router} from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken';
import verifyToken from './veritfyToken.js';
import config from '../config.js';

const router = Router();

router.post('/signup', async (req,res, next) =>{
    const { username, email,password } = req.body
    const user = new User ({
        username,email,password
    })

    user.password = await user.encryptPassword(user.password);
    user.save()

    const token = jwt.sign({id: user._id},config.secret,{
        expiresIn: 60 * 60 * 24
    })
    res.json({auth: true, token})
})

router.get('/me', verifyToken, async (req,res, next) =>{

    const user = await User.findById(req.userId, {password: 0});
    if(!user) res.status(404).send('No user found')
    res.json(user)
})

router.post('/signin', async (req,res, next) =>{
    const {email,password} = req.body;
    const user =  await User.findOne({email:email})
  if(!user) return res.status(404).send('The email does not exist')

  const passwordIsValid = await user.validatePassword(password);

  if(!passwordIsValid){
    return res.status(401).json({auth: false, token: null})
  }

  const token = jwt.sign({id: user._id}, config.secret,{
    expiresIn: 60 * 60 * 24
  })

  res.json({auth: true, token: token})
  console.log(passwordIsValid)
})


export default router;