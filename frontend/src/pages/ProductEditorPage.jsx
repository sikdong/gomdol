import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, fetchProductById, updateProduct, deleteProduct } from '../api/products';

const ProductEditorPage = ({ mode }) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    imageUrl: '',
    description: ''
  });

  useEffect(() => {
    if (mode === 'edit' && productId) {
      fetchProductById(productId).then((data) => {
        setForm({
          name: data.name,
          category: data.category,
          price: data.price,
          imageUrl: data.imageUrl,
          description: data.description
        });
      }).catch(() => {});
    }
  }, [mode, productId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...form, price: Number(form.price) };

    try {
      if (mode === 'edit' && productId) {
        await updateProduct(productId, payload);
      } else {
        await createProduct(payload);
      }
      navigate('/admin');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (productId && window.confirm('Delete this product?')) {
      await deleteProduct(productId);
      navigate('/admin');
    }
  };

  return (
    <section>
      <h1>{mode === 'edit' ? 'Edit Product' : 'Create Product'}</h1>
      <form className="grid max-w-2xl gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-600">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-sm font-medium text-slate-600">Category</label>
          <input
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-sm font-medium text-slate-600">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="imageUrl" className="text-sm font-medium text-slate-600">Image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium text-slate-600">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            Save
          </button>
          {mode === 'edit' && (
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-xl bg-rose-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default ProductEditorPage;
