import express from 'express';
import Note from '../models/note';
import middleware from '../middleware/middleware';


const router = express.Router();
// go to the add note api to add more note
router.post('/add',middleware, async (req , res)=>{
    try {
        const {title , description} = req.body;

        const newNote = new Note(
            {title ,
             description,
             userId: req.user.id // access user by user Id
            }
        )

        await newNote.save();

        return res.
            status(200).
            json({success: true , message: "Note created Succesfully"})

    } catch (error) {
        return res.status(500).json({success: false, message: "error in adding note"});
    }
})

export default router