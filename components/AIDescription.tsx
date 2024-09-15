"use client"
import React, { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

type Note = {
    id: string
    name: string
    category: string
}

type AIDescriptionProps = {
    selectedNotes: Note[]
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
            // In a real application, you would make an API call to your AI service here
            // For demonstration, we'll simulate an API call with a timeout
            await new Promise(resolve => setTimeout(resolve, 2000))

            const noteNames = selectedNotes.map(note => note.name).join(', ')
            const aiGeneratedDescription = `Your custom fragrance is a harmonious blend of ${noteNames}. This unique scent opens with a burst of freshness, gradually revealing a complex heart of floral and woody notes. As it settles, the fragrance evolves into a warm, inviting base that lingers on the skin. This personalized perfume is a true reflection of your individual style and preferences.`

            setDescription(aiGeneratedDescription)
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
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">Your Custom Fragrance</h2>
            {isLoading ? (
                <div className="flex items-center justify-center h-32">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                </div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : description ? (
                <div>
                    <p className="text-gray-700 leading-relaxed">{description}</p>
                    <button
                        onClick={generateDescription}
                        className="mt-4 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors"
                    >
                        Regenerate Description
                    </button>
                </div>
            ) : null}
        </div>
    )
}

export default AIDescription;

