"use client"
import AIDescription from "@/components/AIDescription";
import NotesSelection from "@/components/NotesSelection";
import OrderSummary from "@/components/OrderSummary";
import RecommendedNotes from "@/components/RecommendedNotes";
import { useState } from "react";

type Note = {
  id: string
  name: string
  category: string
}

type SelectedNotes = {
  selectedNotes: Note[]
  onNoteSelect: (note: Note) => void
  onNoteRemove: (note: Note) => void
}

const Home = () => {
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([])

  const handleNoteSelect = (note: Note) => {
    if (selectedNotes.length < 60 && !selectedNotes.find(n => n.id === note.id)) {
      setSelectedNotes([...selectedNotes, note])
    }
  }

  const handleNoteRemove = (note: Note) => {
    setSelectedNotes(selectedNotes.filter(n => n.id !== note.id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary-800">Customize Your Perfume</h1>
        <div className="space-y-16">
          <NotesSelection />
          {/* <RecommendedNotes
            selectedNotes={selectedNotes}
            onAddNote={handleNoteSelect}
          />
          <AIDescription selectedNotes={selectedNotes} />
          <OrderSummary selectedNotes={selectedNotes} /> */}
        </div>
      </main>
    </div>
  )
}

export default Home;