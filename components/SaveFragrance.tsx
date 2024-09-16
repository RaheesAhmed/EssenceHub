"use client"
import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Note } from '@/data/notes'

type NoteWithIntensity = Note & { intensity: number };

type SaveFragranceProps = {
    selectedNotes: NoteWithIntensity[]
    description: string | null
}

const SaveFragrance = ({ selectedNotes, description }: SaveFragranceProps) => {
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const response = await fetch('/api/save-fragrance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 'user-id', // Replace with actual user ID
                    name,
                    notes: selectedNotes,
                    description,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to save fragrance')
            }

            setSuccess(true)
            setName('')
        } catch (err) {
            setError('Failed to save fragrance. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSave} className="mt-8 space-y-4">
            <div>
                <label htmlFor="fragrance-name" className="block text-sm font-medium text-gray-700">
                    Fragrance Name
                </label>
                <input
                    type="text"
                    id="fragrance-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                />
            </div>
            <button
                type="submit"
                disabled={isLoading || selectedNotes.length === 0 || !description}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Fragrance'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Fragrance saved successfully!</p>}
        </form>
    )
}

export default SaveFragrance;