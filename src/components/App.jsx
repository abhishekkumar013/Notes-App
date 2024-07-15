import React, { useState, useEffect } from 'react'
import Footer from './footer'
import Header from './header'
import Note from './Note'
import CreateArea from './CreateArea'

function App() {
  const [notes, setNotes] = useState([])

  // Fetch notes from localStorage when component mounts
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || []
    setNotes(storedNotes)
  }, [])

  // Update localStorage whenever notes state changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote]
    })
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => index !== id)
    })
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  )
}

export default App
