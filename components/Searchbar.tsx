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
        const isValidLink = isValidAmazonProductURL(searchPrompt);

        if (!isValidLink) return alert("Please provide a valid Amazon link");

        try {
            setIsLoading(true);

            // Scrape the product page and save it
            const product = await scrapeAndStoreProduct(searchPrompt);

            // Redirect to the product page if scraping and storing are successful
            if (product && product._id) {
                router.push(`/products/${product._id}`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

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
