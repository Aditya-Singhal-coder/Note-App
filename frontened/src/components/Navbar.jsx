import React from "react";
import { Link } from "react-router-dom";
import { userAuth } from "../context/ContextProvider";

const Navbar = ({setQuery}) => {
  // Inline styles
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#1e293b", // dark gray-blue
      padding: "12px 24px",
      color: "white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#38bdf8",
      textDecoration: "none",
    },
    search: {
      padding: "8px 14px",
      borderRadius: "6px",
      border: "none",
      outline: "none",
      background: "#334155",
      color: "white",
      width: "220px",
    },
    links: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    username: {
      marginRight: "10px",
      fontWeight: "500",
      color: "#f1f5f9",
    },
    btn: {
      padding: "8px 14px",
      borderRadius: "6px",
      fontSize: "0.95rem",
      cursor: "pointer",
      textDecoration: "none",
      color: "white",
      border: "none",
    },
    loginBtn: {
      background: "#3b82f6", // blue
    },
    signupBtn: {
      background: "#22c55e", // green
    },
    logoutBtn: {
      background: "#ef4444", // red
    },
  };
  const {user , logout} = userAuth();
  
  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div>
        <Link to="/" style={styles.logo}>NoteApp</Link>
        
      </div>

      {/* Search bar */}
      <div>
        <input type="text" placeholder="Search notes..." style={styles.search}
        onChange={(e) => setQuery(e.target.value)}
        />
        
      </div>

      {/* User + Links */}
      <div style={styles.links}>
        <span style={styles.username}>User Name</span>

        {/* if user is not logged in then display lgin and signup button*/}
        {!user ? (
            <>
                <Link to="/login" style={{ ...styles.btn, ...styles.loginBtn }}>Login</Link>
                <Link to="/register" style={{ ...styles.btn, ...styles.signupBtn }}>Signup</Link>
            </>
        ):
        (
           <>
            <span style={styles.username}>{user.name}</span>
            <button 
                style={{ ...styles.btn, ...styles.logoutBtn }} 
                onClick={logout}
              >
                Logout
              </button>

           </>
        )}
        </div>
    </nav>
  );
};

export default Navbar;
