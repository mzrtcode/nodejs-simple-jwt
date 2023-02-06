import mongoose from 'mongoose'


mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/simplejwt',{
    useNewUrlParser: true
}).then(db => console.log('Database is connected'))

