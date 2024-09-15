import React, { useState } from 'react'
import { useStripe, useElements, LinkAuthenticationElement, CardElement } from '@stripe/react-stripe-js'
import { Loader2 } from 'lucide-react'
import Stripe from '@/components/Stripe'
import { StripeError, PaymentIntent } from '@stripe/stripe-js'

type CheckoutProps = {
    totalPrice: number
    onSuccess: () => void
    onError: (error: string) => void
}

type CheckoutFormProps = {
    totalPrice: number
    onSuccess: () => void
    onError: (error: string) => void
}

export const CheckoutForm = ({ totalPrice, onSuccess, onError }: CheckoutFormProps) => {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsLoading(true)

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/order-confirmation`,
            },
        })

        if (result.error) {
            onError(result.error.message || 'An unexpected error occurred.')
        } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
            onSuccess()
        }

        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <LinkAuthenticationElement id="email" />
            </div>
            <div>
                <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">
                    Card details
                </label>
                <CardElement id="card-element" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <button
                type="submit"
                disabled={!stripe || isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    `Pay $${totalPrice.toFixed(2)}`
                )}
            </button>
        </form>
    )
}

export default function Checkout({ totalPrice, onSuccess, onError }: CheckoutProps) {
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-primary-600">Checkout</h2>
            <Stripe>
                <CheckoutForm totalPrice={totalPrice} onSuccess={onSuccess} onError={onError} />
            </Stripe>
        </div>
    )
}