

import { signOut } from "firebase/auth";
import { auth } from "../firebase"; 
import { useUser } from "../context/UserContext";
import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";
import { Trash } from 'lucide-react';
import { useState, useEffect } from "react";
import axios from "axios";
export default function Dashboard() {

 
  
  type Note = {
    uid:string,
    content:string,
  }
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [openNote, setopenNote] = useState(false);
  const Navigate= useNavigate()
  const { user } = useUser();

  const fetchNotes = async ()=>{
    if (!user?.uid) return 

    try {
      const res = await axios.get(`http://localhost:5000/api/notes?uid=${user.uid}`)
      if (res.data.success) {
        setNotes(res.data.notes || [])
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {
   

    fetchNotes()
  
  }, [user?.uid])


  console.log(notes);
  

    const handleSignout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully");
            Navigate("/login")
        } catch (error) {
            console.error("Error signing out:", error);
            alert("Failed to sign out. Please try again.");
        }
    }

const handelDeletenote=()=>{
  
}
    const handleCreateNote = async () => {
      if (!newNote.trim() || !user?.uid) return;
      
      try {
        const res = await axios.post("http://localhost:5000/api/notes", {
          uid: user.uid,
          content: newNote,
       
        });
        console.log(res);
        
        if (res.data.success) {
          setNewNote("");
          setNotes(prevNotes => [...prevNotes, res.data.note]);
          setopenNote(false);
        }
      } catch (error) {
          console.error(error);
         
      }
  }
  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="font-semibold text-lg">Dashboard</span>
        </div>
        <button onClick={handleSignout} className="text-blue-600 text-sm font-medium">Sign Out</button>
      </div>

      {/* Welcome Card */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="font-bold text-lg">
          {`Welcome, ${user?.name} !`}
        </h2>
        <p className="text-gray-600 text-sm">Email: {user?.email}</p>
      </div>

      {/* Create Note Button */}
      <button className="w-full max-w-md cursor-pointer bg-blue-600 text-white font-medium py-2 rounded-md shadow mb-6" onClick={()=>setopenNote(true)}>
        Create Note
      </button>
      {
        openNote && (
          <div className="w-full max-w-md flex space-x-2 mb-6">
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter note content"
            className="flex-1 border px-3 py-2 rounded-md"
          />
          <button
            onClick={handleCreateNote}
            className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        )
      }
    
      {/* Notes Section */}
      <div className="w-full max-w-md">
        <h3 className="font-semibold text-gray-800 mb-3">Notes</h3>

     {
      notes.length > 0 ? notes.map((note, index)=>{
        return (
          <div key={index} className="flex justify-between items-center bg-white shadow rounded-md p-3 mb-3">
          <span>{note.content}</span>
          <button onClick={handelDeletenote}><Trash className="text-black-500 hover:text-red-700 cursor-pointer" /></button>
        </div>
        )
      }) : <div className="text-gray-500 text-center py-4">No Notes Found</div>
     }
      </div>
    </div>
  );
}
