/* src/components/landingPage/ProductsPreview.jsx */
import React from 'react';

import tomatoesImg      from '../../assets/images/Tomatoes.jpg';
import wheatImg         from '../../assets/images/Wheat.jpg';
import cabbageImg       from '../../assets/images/cabbage.jpg';
import carrotsImg       from '../../assets/images/Carrots.jpg';
import bananaImg        from '../../assets/images/Banana.jpg';
import greenGrapesImg   from '../../assets/images/green-grapes.jpg';
import purpleGrapesImg  from '../../assets/images/purple-grapes.jpg';
import strawberryImg    from '../../assets/images/Strawberry.jpg';

const products = [
  {
    name: 'Tomatoes',
    image: tomatoesImg,
    description: `Juicy, sun‑ripened tomatoes perfect for salads and sauces.
Grown organically without pesticides.`
  },
  {
    name: 'Wheat',
    image: wheatImg,
    description: `High‑quality whole wheat grains.
Ideal for baking and cereal.
Stone‑ground for extra nutrition.`
  },
  {
    name: 'Cabbage',
    image: cabbageImg,
    description: `Crisp green cabbage heads.
Rich in vitamins K and C.
Great for slaws and stir‑fries.`
  },
  {
    name: 'Carrots',
    image: carrotsImg,
    description: `Sweet and crunchy carrots.
Grown in nutrient‑rich soil.
Perfect for snacking or cooking.`
  },
  {
    name: 'Banana',
    image: bananaImg,
    description: `Creamy, ripe bananas hand‑picked for sweetness.
High in potassium and natural energy.
Perfect for smoothies and snacks.`
  },
  {
    name: 'Green Grapes',
    image: greenGrapesImg,
    description: `Crisp seedless green grapes bursting with juice.
Rich in antioxidants and vitamins.
Ideal for salads and healthy snacking.`
  },
  {
    name: 'Purple Grapes',
    image: purpleGrapesImg,
    description: `Sweet purple grapes with a deep, rich flavor.
Perfect for jams, jellies, and fresh eating.
Grown in nutrient‑rich vineyards.`
  },
  {
    name: 'Strawberry',
    image: strawberryImg,
    description: `Luscious red strawberries full of aroma.
Picked at peak ripeness for best taste.
Great in desserts, jams, or on their own.`
  },
];

export default function ProductsPreview() {
  return (
    <section id="products" className="py-20 container mx-auto px-20">
      <h2 className="text-3xl font-bold text-center text-primary mb-12">
        Fresh Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p.name}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={p.image}
              alt={p.name}
              className="h-48 w-full object-cover transition-opacity duration-300 hover:opacity-80"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-gray-700 whitespace-pre-line text-base leading-snug">
                {p.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
