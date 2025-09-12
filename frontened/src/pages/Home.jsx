import React, { useEffect, useState } from "react";
import axios from "axios"
import Navbar from "../components/Navbar.jsx";
import NoteModal from "../components/NoteModal.jsx";
import NoteCard from "../components/NoteCard.jsx";

function Home() {
  const [isModalOpen , setModalOpen] = useState(false);
  const [notes , setNotes] = useState([]); // empty array
  const [currentNote , setCurrentNote] = useState(null); 
  // fetch and display the notes we add
  useEffect(()=>{
    fetchNote();
  }, [])

  const fetchNote = async()=>{
      try {
        const {data} = await axios.get("http://localhost:5000/api/note");
        setNotes(data.notes);
      } catch (error) {
        console.log(error)
      }
    }

    // function to edit the note
    const onEdit = (note)=>{
      setCurrentNote(note);
      setModalOpen(true);
    }
  // button to close the add note
  const closeModal = ()=>{
    setModalOpen(false);
  }
  // add note ka data server ya backened pr bhejna
  const addNote = async(title, description)=>{
    try {
        const reponse = await axios.post('http://localhost:5000/api/note/add' ,
          {id , title, description },
          {headers: { // generate token for the add note
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }}
      );
        console.log(reponse);
        if(reponse.data.success){
          fetchNote()
          closeModal();
        }
        
    } catch (error) {
        console.log(error);
        
    }
  }
  // function to edit the note if exist
  const editNote = async (id , title , description)=>{
    try {
        const response = await axios.put(`http://localhost:5000/api/note/${id}` ,
          {title, description },
          {headers: { // generate token for the add note
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }}
        );
        if(response.data.success){
          fetchNote()
          closeModal();
        }
        
    } catch (error) {
        console.log(error);
        
    }
  }

  // function to delete note
const deleteNote = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/note/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      fetchNote(); // refresh notes after delete
    }
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};


  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      {/* after getting notes from .get not need to display it*/}
      <div className="px-8 pt-4 grid grid-clos-1 md:grid-cols-3 gpa-6">
          {notes.map(note => {
            <NoteCard
                note = {note}
                onEdit = {onEdit}
            />
          })}
      </div>

      {/* Content space */}
      <div className="flex-grow"></div>

      {/* Bottom section */}
      <div className="flex justify-end items-center p-6">
        <button
           onClick={()=> setModalOpen(true)}
          className="w-12 h-12 bg-teal-500 text-white text-4xl font-bold 
                     rounded-lg shadow-md hover:bg-teal-600 transition duration-200"
        >
          +
        </button>

        {isModalOpen && <NoteModal 
        closeModal={closeModal}
        addNote = {addNote}
        currentNote = {currentNote}
        editNote = {editNote}
        deleteNote = {deleteNote}
        />}
      </div>
    </div>
  );
}

export default Home;
