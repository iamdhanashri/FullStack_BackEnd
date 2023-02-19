const express = require('express');
const { NoteModel } = require("../model/Note.model")

const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
    const notes = await NoteModel.find()
    res.send(notes);
})

noteRouter.post("/create", async (req, res) => {
    const user = new NoteModel(req.body);
    await user.save();
    res.send({ msg: "Notes Created" });
})

noteRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    const note = await NoteModel.findOne({ "_id": id });
    const userId_in_note = note.user
    const userId_in_req = req.body.user
    try {
        if (userId_in_req == userId_in_note) {
            await NoteModel.findByIdAndUpdate({ _id: id }, req.body)
            res.send("note updated successfully");
        }
        else {
            res.send("You are not Authorized ");

        }

    } catch (e) {
        res.send("Something went wrong  ");

    }
})

noteRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const note = await NoteModel.findOne({ "_id": id });
    const userId_in_note = note.user
    const userId_in_req = req.body.user
    try {
        if (userId_in_req == userId_in_note) {
            await NoteModel.findByIdAndDelete({ _id: id })
            res.send("note Deleted successfully");
        }
        else {
            res.send("You are not Authorized ");

        }

    } catch (e) {
        res.send("Something went wrong  ");

    }
})




module.exports = { noteRouter }