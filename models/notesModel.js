const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
    id:{
      type:String,
      required:true
    },
    taskname:{
        type:String,
        required: true
     },
     description:{
      type:String,
      required:true
     },
     status:{
      type:String,
      required: true
   },
     user_id:{
      type:String,
      required:true
     }   
},{ timestamps: true })

const noteModel = mongoose.model('notes', noteSchema)
module.exports = {noteModel}
// module.exports = mongoose.model('notes', notesModel)