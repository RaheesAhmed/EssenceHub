import React from 'react'
import Link from 'next/link'
import { ShoppingBag, User } from 'lucide-react'

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-primary-600">Essence Hub</span>
                        </Link>
                    </div>
                    <nav className="hidden md:flex space-x-10">
                        <Link href="/customize" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            Customize
                        </Link>
                        <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            About
                        </Link>
                        <Link href="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            Contact
                        </Link>
                    </nav>
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        <Link href="/cart" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                            <ShoppingBag className="h-6 w-6" />
                        </Link>
                        <Link
                            href="/account"
                            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                        >
                            <User className="h-5 w-5 mr-2" />
                            Account
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header