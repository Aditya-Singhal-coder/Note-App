import React, { useState } from "react";

const NoteModal = ({ closeModal,addNote,onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

   const handleSubmit = async(e) => {
    e.preventDefault();
    addNote(title , description)
    
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Close Button */}
        <button style={closeBtnStyle} onClick={onClose}>
          ×
        </button>

        <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
          Add New Note
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Note Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...inputStyle, height: "100px" }}
          ></textarea>

          <div style={btnGroupStyle}>
            <button type="submit" style={addBtnStyle}>
              Add Note
            </button>
            <button type="button" onClick={closeModal} style={cancelBtnStyle}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ Inline CSS Styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  position: "relative",
};

const closeBtnStyle = {
  position: "absolute",
  top: "10px",
  right: "15px",
  fontSize: "20px",
  fontWeight: "bold",
  color: "#666",
  border: "none",
  background: "transparent",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  marginBottom: "12px",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const btnGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const addBtnStyle = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
};

const cancelBtnStyle = {
  background: "none",
  color: "red",
  border: "none",
  cursor: "pointer",
};

export default NoteModal;
