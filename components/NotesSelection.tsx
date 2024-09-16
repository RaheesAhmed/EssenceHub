"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Note, notes, categories } from '@/data/notes'

type NoteWithIntensity = Note & { intensity: number };

type SelectedNotesProps = {
    selectedNotes: NoteWithIntensity[]
    onNoteSelect: (note: Note) => void
    onNoteRemove: (note: NoteWithIntensity) => void
}

const NotesSelection = ({ selectedNotes, onNoteSelect, onNoteRemove }: SelectedNotesProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const notesPerPage = 9

    const filteredNotes = notes.filter(note =>
        note.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filter || note.category === filter)
    )

    const pageCount = Math.ceil(filteredNotes.length / notesPerPage)
    const currentNotes = filteredNotes.slice(
        (currentPage - 1) * notesPerPage,
        currentPage * notesPerPage
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
        >
            <h2 className="text-3xl font-bold mb-6 text-primary-600">
                Select Your Perfume Notes
            </h2>
            <div className="mb-6 flex flex-wrap items-center gap-4">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 placeholder-gray-400"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <select
                    value={filter || ''}
                    onChange={(e) => setFilter(e.target.value || null)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700"
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {currentNotes.map(note => (
                    <motion.div
                        key={note.id}
                        className="p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onNoteSelect(note)}
                    >
                        <h3 className="font-medium text-lg text-primary-600 mb-1">{note.name}</h3>
                        <span className="text-xs block text-gray-500">{note.category}</span>
                        <span className="text-xs block text-gray-500">{note.placement}</span>
                        {note.famousFragrances && (
                            <div className="mt-2 text-xs text-gray-600">
                                <strong>Famous Fragrances:</strong> {note.famousFragrances}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 bg-primary-500 text-white rounded-full disabled:opacity-50"
                >
                    <ChevronLeft size={24} />
                </button>
                <span className="text-gray-700">{currentPage} / {pageCount}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                    disabled={currentPage === pageCount}
                    className="p-2 bg-primary-500 text-white rounded-full disabled:opacity-50"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-primary-600">Selected Notes ({selectedNotes.length}/3)</h3>
                <div className="flex flex-wrap gap-2">
                    {selectedNotes.map(note => (
                        <motion.div
                            key={note.id}
                            className="flex items-center bg-primary-100 rounded-full px-3 py-1"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <span className="text-primary-700">{note.name}</span>
                            <button
                                onClick={() => onNoteRemove(note)}
                                className="ml-2 focus:outline-none text-primary-500 hover:text-primary-700"
                                aria-label={`Remove ${note.name}`}
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default NotesSelection;