"use client"

import React, { useMemo } from 'react'
import { ShoppingCart } from 'lucide-react'

type Note = {
    id: string
    name: string
    category: string
}

type OrderSummaryProps = {
    selectedNotes: Note[]
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
        }, {} as Record<string, Note[]>)
    }, [selectedNotes])

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-primary-600 flex items-center">
                <ShoppingCart className="mr-2" />
                Order Summary
            </h2>
            <div className="mb-6">
                <p className="text-gray-700">Base Price: ${basePrice.toFixed(2)}</p>
                <p className="text-gray-700">Additional Notes: {selectedNotes.length} x ${pricePerNote.toFixed(2)}</p>
                <p className="text-xl font-semibold mt-2">Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Selected Notes ({selectedNotes.length}):</h3>
                {Object.entries(categorizedNotes).map(([category, notes]) => (
                    <div key={category} className="mb-4">
                        <h4 className="font-medium text-primary-500">{category}</h4>
                        <ul className="list-disc list-inside pl-4">
                            {notes.map(note => (
                                <li key={note.id} className="text-gray-700">{note.name}</li>
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
        </div>
    )
}

export default OrderSummary;