import React from 'react';

const OrdersPage = () => (
  <section className="rounded-3xl bg-white p-8 shadow-2xl">
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">
        Order history
      </p>
      <h2 className="text-3xl font-semibold text-slate-900">Track your past drops</h2>
      <p className="max-w-2xl text-slate-500">
        Once the backend endpoints are ready, you will see receipts, tracking links, and garment care guides for
        every purchase in this space.
      </p>
      <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-8 text-sm text-slate-500">
        No orders yet. Start curating your collection today.
      </div>
    </div>
  </section>
);

export default OrdersPage;
