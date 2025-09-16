"use client";
import { useState, useEffect } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}


const Home = ({ products, bannerData }: HomeProps) => {
  const [sortOrder, setSortOrder] = useState<'low' | 'high'>('low');
  const [sortedProducts, setSortedProducts] = useState<ProductsTypes[]>([...products]);

  // Sort products whenever sortOrder or products change
  useEffect(() => {
    const sorted = [...products].sort((a, b) => {
      if (sortOrder === 'low') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSortedProducts(sorted);
  }, [sortOrder, products]);

  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="mb-4 flex items-center flex-col">
        <h1
          className="headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary font-sans font-extrabold sm:rounded-t-3xl"
        >
          Best Selling Headphones
        </h1>
        {/* Sort select dropdown */}
        <div className="mt-2">
          <label htmlFor="sort" className="mr-2 font-medium text-secondary">Sort by price:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value as 'low' | 'high')}
            className="border rounded px-2 py-1 text-secondary"
          >
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </section>

      {/* === SHOW PRODUCTS  */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 lg:mx-20 overflow-hidden"
      >
        {/* === MAP PRODUCTS  */}
        {sortedProducts?.map((products: ProductsTypes) => {
          return <Products key={products._id} products={products} />;
        })}
      </section>

      {/* ==== FOOTER BANNER  */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
