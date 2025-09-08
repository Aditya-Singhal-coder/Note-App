import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import NoteModal from "../components/NoteModal.jsx";

function Home() {
  const [isModalOpen , setModalOpen] = useState(false)
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

        {isModalOpen && <NoteModal />}
      </div>
    </div>
  );
}

export default Home;
