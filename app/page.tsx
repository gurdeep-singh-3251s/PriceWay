import HeroCarousel from "@/components/HeroCarousel"
import Searchbar from "@/components/Searchbar"
import Image from "next/image"
import {  getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"

const Home = async () => {
  const allProducts = await getAllProducts();
  return (
    <>
      <section className="nav">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Start Here : <Image src="/assets/icons/arrow-right.svg"
              width={16}
              height={16}
              alt="arrow-right"
              />
            </p>
            <h1 className="head-text">Unleash the Power of <span className='text-primary'>PriceWay</span></h1>
            <p className="mt-6">
            Unlock unbeatable deals with PriceWay—your one-stop app for comparing prices across platforms, saving you time and money!
            </p>

            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">
          Trending
        </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
        {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home