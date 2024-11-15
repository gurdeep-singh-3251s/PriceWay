"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation';

const isValidAmazonProductURL = (url: string) => {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;

        return hostname.includes('amazon');
    } catch (error) {
        return false;
    }
}

const Searchbar = () => {
    const [searchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Validate the Amazon URL
        const isValidLink = isValidAmazonProductURL(searchPrompt);
        if (!isValidLink) {
            alert("Please provide a valid Amazon link");
            return;
        }
    
        try {
            setIsLoading(true); // Show loading state
    
            // Scrape and store the product
            const product = await scrapeAndStoreProduct(searchPrompt);
    
            // Check for redirection if the product already exists
            if (product?.redirectTo) {
                router.push(product.redirectTo);
            } else if (product && product._id) {
                // Redirect to the newly created product's page
                router.push(`/products/${product._id}`);
            } else {
                alert("Failed to retrieve product data. Please try again.");
            }
        } catch (error) {
            console.error("An error occurred while submitting:", error);
            alert("An error occurred while processing the request. Please try again.");
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    return (
        <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter product link"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                className="searchbar-input"
            />
            <button
                type="submit"
                className="searchbar-btn"
                disabled={searchPrompt === ''}
            >
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
}

export default Searchbar;
