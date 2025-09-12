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


// make a router which will help in read the note data to display it on frontened
router.get('/' , async(req,res)=>{
    try {
        const notes = await Note.find();
        return res.status(200).json({success:true , notes})
    } catch (error) {
        return res.status(500).json({success:false , message: "can't retrieve notes"})
    }
})

// make api to update the note
router.put("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const updateNote = await Note.findByIdAndUpdate(id , req.body , {new: true});
        return res.status(200).json({success: true , updateNote})
    } catch (error) {
        return res.status(500).json({success: false , message: "can't update notes"})

    }
})

router.delete("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const updateNote = await Note.findByIdAndDelete(id);
        return res.status(200).json({success: true , updateNote})
    } catch (error) {
        return res.status(500).json({success: false , message: "can't delete notes"})

    }
})
export default router