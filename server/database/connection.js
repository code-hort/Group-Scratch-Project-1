
const mongoose = require('mongoose')

const connectDB = async () => { 
    try { 
     await mongoose.connect(process.env.MONGO_URL,{
               // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'codeHort'
})
console.log(`MongoDB connected: ${connection.connection.host}`);

        } catch(err) { 
            console.log(err)
            process.exit(1)
        }
        
        }



module.exports = connectDB;