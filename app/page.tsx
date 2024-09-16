"use client"
import { useState } from "react";
import { Note } from "@/data/notes";
import Hero from "@/components/Hero";
import NotesSelection from "@/components/NotesSelection";
import FragranceCustomization from "@/components/FragranceCustomization";
import AIDescription from "@/components/AIDescription";
import RecommendedNotes from "@/components/RecommendedNotes";
import OrderSummary from "@/components/OrderSummary";

const Home = () => {
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([])

  const handleNoteSelect = (note: Note) => {
    if (selectedNotes.length < 3 && !selectedNotes.find(n => n.id === note.id)) {
      setSelectedNotes([...selectedNotes, note])
    }
  }

  const handleNoteRemove = (note: Note) => {
    setSelectedNotes(selectedNotes.filter(n => n.id !== note.id))
  }

  const handleIntensityChange = (noteId: string, change: number) => {
    // Implement intensity change logic here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-16">
          <Hero />
          <NotesSelection
            selectedNotes={selectedNotes}
            onNoteSelect={handleNoteSelect}
            onNoteRemove={handleNoteRemove}
          />
          <FragranceCustomization
            selectedNotes={selectedNotes}
            onIntensityChange={handleIntensityChange}
          />
          <AIDescription selectedNotes={selectedNotes} />
          <RecommendedNotes
            selectedNotes={selectedNotes}
            onAddNote={handleNoteSelect}
          />
          <OrderSummary selectedNotes={selectedNotes} />
        </div>
      </main>
    </div>
  )
}

export default Home;