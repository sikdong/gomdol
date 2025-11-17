import React from 'react';

const CartPage = () => (
  <section className="rounded-3xl bg-white p-8 shadow-2xl">
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Cart coming soon
      </p>
      <h2 className="text-3xl font-semibold text-slate-900">Your cart is waiting for treasures</h2>
      <p className="max-w-2xl text-slate-500">
        We are polishing the cart experience so you can mix, match, and secure your favorite finds. For now,
        explore the collection and bookmark the pieces you love.
      </p>
      <a href="/" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800">
        Continue browsing
      </a>
    </div>
  </section>
);

export default CartPage;
