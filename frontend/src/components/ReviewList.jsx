import React from 'react';

const ReviewList = ({ reviews = [] }) => (
  <section className="mt-12 space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold text-slate-900">Community reviews</h3>
      <span className="text-sm text-slate-500">{reviews.length} entries</span>
    </div>
    {reviews.map((review) => (
      <article key={review.id} className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-amber-400">{'★'.repeat(review.rating)}</div>
          <span className="text-xs uppercase tracking-wide text-slate-400">Verified buyer</span>
        </div>
        <p className="mt-3 text-slate-700">{review.content}</p>
        <small className="mt-3 block text-xs text-slate-500">— {review.username}</small>
      </article>
    ))}
    {!reviews.length && (
      <p className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
        No reviews yet. Be the first to share your thoughts.
      </p>
    )}
  </section>
);

export default ReviewList;
