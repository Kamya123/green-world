/* src/components/landingPage/ProductsPreview.jsx */
import React from 'react';

const products = [
  { name: 'Tomatoes', image: '/images/tomatoes.jpg' },
  { name: 'Rice', image: '/images/rice.jpg' },
  { name: 'Lettuce', image: '/images/lettuce.jpg' },
  { name: 'Carrots', image: '/images/carrots.jpg' },
];

export default function ProductsPreview() {
  return (
    <section id="products" className="py-20 container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-primary mb-12">Fresh Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div key={p.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={p.image} alt={p.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <button className="mt-2 px-4 py-2 bg-accent text-white rounded hover:bg-opacity-90">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}