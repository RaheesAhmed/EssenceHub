"use client"

import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// Make sure to replace this with your actual publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const Stripe = ({ children }: { children: React.ReactNode }) => {
    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    )
}

export default Stripe;
