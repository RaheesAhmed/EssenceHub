"use client"

import React, { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import AIDescription from './AIDescription'

type Note = {
    id: string
    name: string
    category: string
}

const dummyNotes: Note[] = [
    { id: '1', name: 'Lavender', category: 'Floral' },
    { id: '2', name: 'Vanilla', category: 'Sweet' },
    { id: '3', name: 'Sandalwood', category: 'Woody' },
    { id: '4', name: 'Bergamot', category: 'Citrus' },
    { id: '5', name: 'Jasmine', category: 'Floral' },
    // Add more dummy notes here...
]

const NotesSelection = () => {
    const [notes, setNotes] = useState<Note[]>(dummyNotes)
    const [selectedNotes, setSelectedNotes] = useState<Note[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState<string | null>(null)

    useEffect(() => {
        // In a real application, you would fetch notes from an API here
        // For now, we're using the dummy data
    }, [])

    const filteredNotes = notes.filter(note =>
        note.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filter || note.category === filter)
    )

    const handleNoteSelect = (note: Note) => {
        if (selectedNotes.length < 60 && !selectedNotes.find(n => n.id === note.id)) {
            setSelectedNotes([...selectedNotes, note])
        }
    }

    const handleNoteRemove = (note: Note) => {
        setSelectedNotes(selectedNotes.filter(n => n.id !== note.id))
    }

    const categories = Array.from(new Set(notes.map(note => note.category)))

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Select Your Perfume Notes</h2>
            <div className="mb-4 flex flex-wrap items-center gap-2">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <select
                    value={filter || ''}
                    onChange={(e) => setFilter(e.target.value || null)}
                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {filteredNotes.map(note => (
                    <button
                        key={note.id}
                        onClick={() => handleNoteSelect(note)}
                        className="p-2 border rounded-md hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        {note.name}
                    </button>
                ))}
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-2">Selected Notes ({selectedNotes.length}/60)</h3>
                <div className="flex flex-wrap gap-2">
                    {selectedNotes.map(note => (
                        <div key={note.id} className="flex items-center bg-primary-100 rounded-full px-3 py-1">
                            <span>{note.name}</span>
                            <button
                                onClick={() => handleNoteRemove(note)}
                                className="ml-2 focus:outline-none"
                                aria-label={`Remove ${note.name}`}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <AIDescription selectedNotes={selectedNotes} />
        </div>
    )
}

export default NotesSelection;