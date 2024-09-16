"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Note } from '@/data/notes'

type NoteWithIntensity = Note & { intensity: number };

type AIDescriptionProps = {
    selectedNotes: NoteWithIntensity[]
}

const AIDescription = ({ selectedNotes }: AIDescriptionProps) => {
    const [description, setDescription] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (selectedNotes.length > 0) {
            generateDescription()
        } else {
            setDescription(null)
        }
    }, [selectedNotes])

    const generateDescription = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/generate-description', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    notes: selectedNotes.map(note => ({
                        name: note.name,
                        category: note.category,
                        placement: note.placement
                    }))
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate description')
            }

            const data = await response.json()
            setDescription(data.description)
        } catch (err) {
            setError('Failed to generate description. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (selectedNotes.length === 0) {
        return null
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto mt-8 p-6 bg-secondary-100 rounded-lg shadow-lg"
        >
            <h2 className="text-2xl font-bold mb-4 text-secondary-800">Your Custom Fragrance</h2>
            {isLoading ? (
                <div className="flex items-center justify-center h-32">
                    <Loader2 className="w-8 h-8 animate-spin text-secondary-500" />
                </div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : description ? (
                <div>
                    <p className="text-secondary-700 leading-relaxed">{description}</p>
                    <button
                        onClick={generateDescription}
                        className="mt-4 px-4 py-2 bg-secondary-500 text-white rounded hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-opacity-50 transition-colors"
                    >
                        Regenerate Description
                    </button>
                </div>
            ) : null}
        </motion.div>
    )
}

export default AIDescription;

