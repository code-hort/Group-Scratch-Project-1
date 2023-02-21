



const mongoose = require('mongoose')

console.log(process.env.MONGO_URL)

const connectDB = async () => { 
    try { 
        await mongoose.connect(process.env.MONGO_URL,{
               // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'codeHort'
})
console.log("connected to db")
// console.log(`MongoDB connected: ${connection.connection.host}`);

        } catch(err) { 
            console.log(err)
            process.exit(1)
        }
            //deprecation warning for newURLparser
            //
        }


module.exports = connectDB;




































// const mongoose = require('mongoose')

// const connectDB = async () => { 
//     try { 
//      await mongoose.connect('mongodb+srv://garretthutson:CodeClimb99@cluster0.ilxwjxc.mongodb.net/?retryWrites=true&w=majority',{
//                // options for the connect method to parse the URI
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // sets the name of the DB that our collections are part of
//     dbName: 'codeHort'
// })
// // console.log(`MongoDB connected: ${connection.connection.host}`);

//         } catch(err) { 
//             console.log(err)
//             process.exit(1)
//         }
        
//         }



// module.exports = connectDB;