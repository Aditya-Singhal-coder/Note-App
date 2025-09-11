import React, { useState } from "react";
import axios from "axios"
import Navbar from "../components/Navbar.jsx";
import NoteModal from "../components/NoteModal.jsx";

function Home() {
  const [isModalOpen , setModalOpen] = useState(false);

  // button to close the add note
  const closeModal = ()=>{
    setModalOpen(false);
  }
  // add note ka data server ya backened pr bhejna
  const addNote = async(title, description)=>{
    try {
        const reponse = await axios.post('http://localhost:5000/api/note/add' ,
          {title, description },
          {headers: { // generate token for the add note
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }}
      );
        console.log(reponse);
        if(reponse.data.success){
          closeModal();
        }
        
    } catch (error) {
        console.log(error);
        
    }
  }
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

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
        />}
      </div>
    </div>
  );
}

export default Home;
