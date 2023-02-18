
const mongoose = require('mongoose')



const connectDB = async () => { 
    try { 
        const connection = await mongoose.connect(process.env.MONGO_URL,{
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
            //deprecation warning for newURLparser
            //
        }

//lol this is hillrious  we should do our whole project like this

module.exports = connectDB;