const {Router}= require('express');
const router = Router();

const {
       renderForm, 
       createNote, 
       getNotes,
       editNote, 
       updateNote, 
       deleteNote
    } = require('../controller/NoteController.js');

const {isAuthenticated} = require('../helpers/auth.js')

router.get('/add', isAuthenticated,renderForm);
router.post('/add',isAuthenticated,createNote);
router.get('/',isAuthenticated,getNotes);
router.get('/edit/:id',isAuthenticated, editNote);
router.put('/edit/:id',isAuthenticated, updateNote);
router.delete('/delete/:id',isAuthenticated, deleteNote);

module.exports= router;