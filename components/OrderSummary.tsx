"use client"

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { Note } from '@/data/notes'

type NoteWithIntensity = Note & { intensity: number };

type OrderSummaryProps = {
    selectedNotes: NoteWithIntensity[]
}

const OrderSummary = ({ selectedNotes }: OrderSummaryProps) => {
    const basePrice = 50 // Base price for the custom perfume
    const pricePerNote = 5 // Price per additional note

    const totalPrice = useMemo(() => {
        return basePrice + (selectedNotes.length * pricePerNote)
    }, [selectedNotes])

    const categorizedNotes = useMemo(() => {
        return selectedNotes.reduce((acc, note) => {
            if (!acc[note.category]) {
                acc[note.category] = []
            }
            acc[note.category].push(note)
            return acc
        }, {} as Record<string, NoteWithIntensity[]>)
    }, [selectedNotes])

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto mt-8 p-6 bg-primary-50 rounded-lg shadow-lg"
        >
            <h2 className="text-2xl font-bold mb-4 text-primary-800 flex items-center">
                <ShoppingCart className="mr-2" />
                Order Summary
            </h2>
            <div className="mb-6">
                <p className="text-primary-700">Base Price: ${basePrice.toFixed(2)}</p>
                <p className="text-primary-700">Additional Notes: {selectedNotes.length} x ${pricePerNote.toFixed(2)}</p>
                <p className="text-xl font-semibold mt-2 text-primary-800">Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-primary-700">Selected Notes ({selectedNotes.length}):</h3>
                {Object.entries(categorizedNotes).map(([category, notes]) => (
                    <div key={category} className="mb-4">
                        <h4 className="font-medium text-primary-600">{category}</h4>
                        <ul className="list-disc list-inside pl-4">
                            {notes.map(note => (
                                <li key={note.id} className="text-primary-700">{note.name} (Intensity: {note.intensity})</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button
                className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors"
            >
                Proceed to Checkout
            </button>
        </motion.div>
    )
}

export default OrderSummary;