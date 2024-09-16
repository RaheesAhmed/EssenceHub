"use client"
import { useState } from "react";
import { Note } from "@/data/notes";
import NotesSelection from "@/components/NotesSelection";
import FragranceCustomization from "@/components/FragranceCustomization";
import AIDescription from "@/components/AIDescription";
import RecommendedNotes from "@/components/RecommendedNotes";
import OrderSummary from "@/components/OrderSummary";

type NoteWithIntensity = Note & { intensity: number };

const CustomizePage = () => {
    const [selectedNotes, setSelectedNotes] = useState<NoteWithIntensity[]>([])
    const [description, setDescription] = useState<string>("")

    const handleNoteSelect = (note: Note) => {
        if (selectedNotes.length < 3 && !selectedNotes.find(n => n.id === note.id)) {
            setSelectedNotes([...selectedNotes, { ...note, intensity: 1 }])
        }
    }

    const handleNoteRemove = (note: NoteWithIntensity) => {
        setSelectedNotes(selectedNotes.filter(n => n.id !== note.id))
    }

    const handleIntensityChange = (noteId: string, change: number) => {
        setSelectedNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === noteId
                    ? { ...note, intensity: Math.max(1, Math.min(3, note.intensity + change)) }
                    : note
            )
        )
    }

    const generateDescription = async () => {
        const response = await fetch('/api/generate-description', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notes: selectedNotes }),
        });
        const data = await response.json();
        setDescription(data.description);
    }

    const saveFragrance = async () => {
        const response = await fetch('/api/save-fragrance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Custom Fragrance",
                notes: selectedNotes,
                description,
            }),
        });
        const data = await response.json();
        console.log("Saved fragrance:", data.fragrance);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                <div className="space-y-16">
                    <NotesSelection
                        selectedNotes={selectedNotes}
                        onNoteSelect={handleNoteSelect}
                        onNoteRemove={handleNoteRemove}
                    />
                    <FragranceCustomization
                        selectedNotes={selectedNotes}
                        onIntensityChange={handleIntensityChange}
                    />
                    <AIDescription
                        selectedNotes={selectedNotes}
                        description={description}
                        onGenerateDescription={generateDescription}
                    />
                    <RecommendedNotes
                        selectedNotes={selectedNotes}
                        onAddNote={handleNoteSelect}
                    />
                    <OrderSummary
                        selectedNotes={selectedNotes}
                        onSaveFragrance={saveFragrance}
                    />
                </div>
            </main>
        </div>
    )
}

export default CustomizePage;
