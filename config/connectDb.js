const mongoose =require('mongoose')

const connectDb= async()=>{
   try {
   await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
      

      console.log('DATABASE IS CONNECTED SUCCESSFULLY ...')

   } catch (error) {
      console.log('FAILED TO CONNECT "DATABASE"  !!',error)
       
   }
}


module.exports=connectDb