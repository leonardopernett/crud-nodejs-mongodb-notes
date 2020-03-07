controller = {};

const Note = require('../models/Note.js')

controller.getNotes =  async(req,res)=>{
    const notes =  await Note.find({user_id:req.user.id}).sort({createdAt:'desc'});
    res.render('notes/lists',{notes:notes});
}

controller.renderForm = (req,res)=>{
    res.render('notes/form');
}

controller.createNote = async (req,res)=>{
    const {title, description}= req.body;
    const newNote={
        title,
        description
    }
    
    const note = new Note(newNote)
    note.user_id = req.user.id
    await note.save();
    req.flash('info','note created successfuly')
    res.redirect('/notes');
}

controller.editNote = async (req,res)=>{
    const note = await Note.findById(req.params.id)
    if(note.user_id != req.user.id){
        return res.redirect('/notes')
    }
    res.render('notes/edit',{note});
}

controller.updateNote = async (req,res)=>{
    const {id}= req.params;
    const {title, description}= req.body;
    
    await Note.findOneAndUpdate(id,{
        title,
        description
    })
    req.flash('info','note updated successfuly')
    res.redirect('/notes');
}

controller.deleteNote = async (req,res)=>{
    const {id}= req.params;
    await Note.findByIdAndRemove(id)
    req.flash('info','note deleted successfuly')
    res.redirect('/notes');

}

module.exports=controller;