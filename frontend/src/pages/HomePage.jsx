import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setProducts([
          {
            id: 1,
            name: 'Vintage Denim Jacket',
            category: 'Outerwear',
            price: 129000,
            imageUrl: ''
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-12">
      <section className="grid gap-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-800 px-8 py-16 text-white md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-indigo-300">New drop</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Curated vintage pieces for the modern wardrobe</h1>
          <p className="mt-4 text-lg text-indigo-100">Limited releases inspired by Seoul street markets and Paris ateliers.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#catalog" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5">
              Shop the collection
            </a>
            <a href="#story" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white">
              Learn our story
            </a>
          </div>
        </div>
        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
          <dl className="grid gap-6 text-sm text-indigo-100 sm:grid-cols-2">
            <div>
              <dt className="uppercase tracking-wide text-xs">Curated pieces</dt>
              <dd className="text-4xl font-semibold">150+</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wide text-xs">Partner ateliers</dt>
              <dd className="text-4xl font-semibold">12</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wide text-xs">Happy customers</dt>
              <dd className="text-4xl font-semibold">4.8k</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wide text-xs">Avg. restock</dt>
              <dd className="text-4xl font-semibold">Weekly</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="catalog" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-slate-400">New arrivals</p>
            <h2 className="text-2xl font-semibold text-slate-900">Handpicked for this week</h2>
          </div>
          <button type="button" className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
            View all
          </button>
        </div>
        {loading ? (
          <p className="text-slate-500">Loading products...</p>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </section>
        )}
      </section>

      <section id="story" className="rounded-3xl bg-white p-8 shadow-2xl">
        <h3 className="text-2xl font-semibold text-slate-900">From hidden markets to your wardrobe</h3>
        <p className="mt-3 text-slate-600">
          We scour flea markets, private auctions, and vintage collectors to bring you pieces with soul.
          Each garment is cleaned, restored, and authenticated before arriving at your doorstep.
        </p>
        <div className="mt-6 grid gap-4 text-sm text-slate-500 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-800">Authentic finds</p>
            <p>Every piece is authenticated and archived with detailed provenance.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-800">Mindful care</p>
            <p>Minor repairs and eco-friendly cleaning to preserve original textures.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-800">Worldwide shipping</p>
            <p>Secure packaging and tracked shipping from Seoul to your city.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
