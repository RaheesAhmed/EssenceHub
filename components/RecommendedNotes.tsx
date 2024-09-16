import React, { useState, useEffect } from 'react'
import { Loader2, Plus } from 'lucide-react'

type Note = {
    id: string
    name: string
    category: string
    placement: string
    description: string
}

type RecommendedNotesProps = {
    selectedNotes: Note[]
    onAddNote: (note: Note) => void
}

const RecommendedNotes = ({ selectedNotes, onAddNote }: RecommendedNotesProps) => {
    const [recommendedNotes, setRecommendedNotes] = useState<Note[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (selectedNotes.length > 0) {
            generateRecommendations()
        } else {
            setRecommendedNotes([])
        }
    }, [selectedNotes])

    const generateRecommendations = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/recommend-notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    notes: selectedNotes.map(note => ({
                        name: note.name,
                        category: note.category,
                        placement: note.placement,
                        description: note.description
                    }))
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate recommendations')
            }

            const data = await response.json()
            setRecommendedNotes(data.recommendations)
        } catch (err) {
            setError('Failed to generate recommendations. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (selectedNotes.length === 0) {
        return null
    }

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">Recommended Notes</h2>
            {isLoading ? (
                <div className="flex items-center justify-center h-32">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                </div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : recommendedNotes.length > 0 ? (
                <div>
                    <p className="text-gray-700 mb-4">Based on your current selection, we recommend the following notes:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {recommendedNotes.map(note => (
                            <button
                                key={note.id}
                                onClick={() => onAddNote(note)}
                                className="flex items-center justify-between p-2 border rounded-md hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                            >
                                <span>{note.name}</span>
                                <Plus className="w-5 h-5 text-primary-500" />
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={generateRecommendations}
                        className="mt-6 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors"
                    >
                        Refresh Recommendations
                    </button>
                </div>
            ) : (
                <p className="text-gray-700">No recommendations available at this time.</p>
            )}
        </div>
    )
}

export default RecommendedNotes;

