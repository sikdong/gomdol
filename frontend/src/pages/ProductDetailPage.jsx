import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import { fetchReviews } from '../api/reviews';
import ReviewList from '../components/ReviewList';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        setProduct({
          id: Number(productId),
          name: 'Sample Vintage Item',
          category: 'Outerwear',
          price: 99000,
          description: 'Description placeholder while API is wired up.'
        });
      }
    };

    const loadReviews = async () => {
      try {
        const data = await fetchReviews(productId);
        setReviews(data);
      } catch (err) {
        setReviews([]);
      }
    };

    loadProduct();
    loadReviews();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-12">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] bg-white p-6 shadow-2xl">
          <div
            className="h-[460px] rounded-[28px] bg-cover bg-center"
            style={{ backgroundImage: `url(${product.imageUrl || 'https://placehold.co/900x600?text=Vintage'})` }}
          />
        </div>
        <div className="rounded-[32px] bg-white p-8 shadow-2xl">
          <span className="text-xs uppercase tracking-[0.4em] text-slate-400">{product.category}</span>
          <h2 className="mt-4 text-4xl font-semibold text-slate-900">{product.name}</h2>
          <p className="mt-5 text-slate-600">{product.description}</p>
          <div className="mt-6 flex items-center gap-4">
            <p className="text-3xl font-bold text-indigo-600">
              ₩ {product.price?.toLocaleString?.() || product.price}
            </p>
            <span className="text-sm text-slate-400">Incl. complimentary garment care</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <button type="button" className="flex-1 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800">
              Add to cart
            </button>
            <button type="button" className="flex-1 rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600">
              Save to wishlist
            </button>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-slate-500">
            <li>• Free worldwide shipping on orders over ₩150,000</li>
            <li>• Ships within 2 business days from Seoul</li>
            <li>• Complimentary repair within 6 months</li>
          </ul>
        </div>
      </section>
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ProductDetailPage;
