import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, price, imageUrl, category }) => (
  <Link to={`/products/${id}`} className="block">
    <article className="group overflow-hidden rounded-3xl bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative">
        <div
          className="h-60 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl || 'https://placehold.co/600x400?text=Vintage'})` }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-800">
          {category}
        </span>
      </div>
      <div className="space-y-2 px-5 py-5">
        <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
        <p className="text-sm text-slate-500">Restored & authenticated</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-indigo-600">₩ {price?.toLocaleString?.() || price}</p>
          <span className="text-sm font-semibold text-slate-400 transition group-hover:text-slate-700">View details →</span>
        </div>
      </div>
    </article>
  </Link>
);

export default ProductCard;
