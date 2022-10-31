const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://advance:Vezox@cluster0.29n3lnk.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,    
        });
        console.log('Connect successfully')
    } catch (error) {
        console.log('Connect failed')
    }
}

module.exports = { connect }