const {noteModel} = require('../models/notesModel')


const createNote = async (req, res) => {
    const {id,taskname, description, status} = req.body
    console.log(req.body);
    try {
        const notesData = new noteModel(req.body)
        console.log("notesData",notesData);
        if(!notesData){
            res.status(500).json({msg:'notes data not found'})
        }
        const user_id = req.user._id
        console.log(req.user);
        const saved = await noteModel.create({id,taskname, description, status, user_id})
        const savedData = await saved.save()
        res.status(200).json({savedData:savedData, message: "user add successfully"})

    } catch (error) {
        res.status(500).json(error)
    }
}

const getallNote = async (req, res) => {
    const user_id = req.user._id
    console.log(user_id);
    try {
        const notesData = await noteModel.find({user_id})
        if(!notesData){
            res.status(500).json({msg:'notes data not found'})
        }

        res.status(200).json({notesData})
    } catch (error) {
        res.status(500).json(error)
    }
}

const getoneNote = async (req, res) => {
    const {id} = req.params

    try {
        const notesData = await noteModel.findById(id)

        if(!notesData){
            res.status(500).json({msg:'notes data not found'})
        }
        res.status(200).json({notesData})
    } catch (error) {
        res.status(500).json(error) 
    }
}

const deleteoneNote = async (req, res) => {
    const {id} = req.params

    try {
        const notesData = await noteModel.findById(id)

        if(!notesData){
            res.status(500).json({msg:'notes data not found'})
        }
        await noteModel.findByIdAndDelete(id)
        res.status(200).json({msg:"note deleted successfully"})
    } catch (error) {
        res.status(500).json(error) 
    }
}

const updateNote = async (req,res) => {
    const {id} = req.params

    try {

        const notesData = await noteModel.findById(id)
        if(!notesData){
            res.status(500).json({msg:'notes data not found'})
        }

        const updatedNote = await noteModel.findByIdAndUpdate(id,req.body, {new:true})
        res.status(200).json({updatedNote,msg:"note deleted successfully"})
        
    } catch (error) {
        res.status(500).json(error) 
    }
}

module.exports = {
    createNote,
    getallNote,
    getoneNote,
    deleteoneNote,
    updateNote
}