import React from 'react';

const Footer = () => (
  <footer className="mt-16 bg-slate-900/95 text-slate-200">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-lg font-semibold">Gomdol Vintage</p>
        <p className="text-sm text-slate-400">Curated garments, modern charm.</p>
      </div>
      <nav className="flex flex-wrap gap-4 text-sm text-slate-300">
        <a className="transition hover:text-white" href="#story">Our Story</a>
        <a className="transition hover:text-white" href="#contact">Contact</a>
        <a className="transition hover:text-white" href="#faq">FAQ</a>
      </nav>
      <p className="text-xs text-slate-400">© {new Date().getFullYear()} Gomdol Vintage Shop. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
