"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
}

const CustomerInfoForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)
        // Here you would typically send the data to your backend
        console.log(data)
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
        setIsSubmitting(false)
        // Handle success (e.g., show a success message, navigate to next step)
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="p-8 w-full">
                    <div className="uppercase tracking-wide text-sm text-primary-500 font-semibold mb-1">Step 1</div>
                    <h2 className="block mt-1 text-lg leading-tight font-medium text-black">Customer Information</h2>
                    <p className="mt-2 text-gray-500">Please provide your details for your custom perfume order.</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    {...register("firstName", { required: "First name is required" })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                                />
                                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    {...register("lastName", { required: "Last name is required" })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                                />
                                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number</label>
                            <input
                                type="tel"
                                id="phone"
                                {...register("phone", { required: "Phone number is required" })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Street address</label>
                            <input
                                type="text"
                                id="address"
                                {...register("address", { required: "Address is required" })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                            />
                            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    {...register("city", { required: "City is required" })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                                />
                                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    {...register("state", { required: "State is required" })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                                />
                                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    {...register("zipCode", { required: "ZIP code is required" })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                                />
                                {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CustomerInfoForm;

