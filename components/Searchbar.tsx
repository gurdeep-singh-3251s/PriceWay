"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, {useState, useEffect, FormEvent} from 'react'

const isValidAmazonProductURL = (url : string) =>{
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;

        if(hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.includes('amazon')){
            return true;
        }
        else{
            return false;
        }
    } catch (error) {
        return false
    }
}

const Searchbar = () => {
    const [searchPrompt, setSearchPrompt]  = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit =async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValidLink = isValidAmazonProductURL(searchPrompt);
        if(!isValidLink) return alert("Please Provide a valid Amazon Link");

        try {
            setIsLoading(true);
            // scrape the product page
            const product = await  scrapeAndStoreProduct(searchPrompt);
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoading(false)

        }

    }

  return (
    <form action="" className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter product link' value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}className='searchbar-input' name="" id="" />
        <button type="submit" className='searchbar-btn'
        disabled={searchPrompt === ''}>
        {isLoading ? 'Searching...' : 'Search'}
        </button>
    </form>

  )
}

export default Searchbar