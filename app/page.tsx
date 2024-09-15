"use client"
import AIDescription from "@/components/AIDescription";
import Hero from "@/components/Hero";
import NotesSelection from "@/components/NotesSelection";
import { useState } from "react";

type Note = {
  id: string;
  name: string;
  category: string;
}

const Home = () => {
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);

  const handleNoteSelection = (note: Note) => {
    setSelectedNotes([...selectedNotes, note]);
  };

  return (
    <>
      <Hero />

    </>
  )
}

export default Home;
