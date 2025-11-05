import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { createProduct, fetchProductById, updateProduct, deleteProduct } from '../api/products';

const Form = styled.form`
  display: grid;
  gap: 16px;
  max-width: 540px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background: ${(props) => props.$variant === 'danger' ? '#dc2626' : '#2563eb'};
  color: #fff;
  cursor: pointer;
`;

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
      <Form onSubmit={handleSubmit}>
        <Field>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} required />
        </Field>
        <Field>
          <label htmlFor="category">Category</label>
          <input id="category" name="category" value={form.category} onChange={handleChange} required />
        </Field>
        <Field>
          <label htmlFor="price">Price</label>
          <input id="price" name="price" type="number" value={form.price} onChange={handleChange} required />
        </Field>
        <Field>
          <label htmlFor="imageUrl">Image URL</label>
          <input id="imageUrl" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
        </Field>
        <Field>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows="4" value={form.description} onChange={handleChange} />
        </Field>
        <ButtonRow>
          <Button type="submit">Save</Button>
          {mode === 'edit' && <Button type="button" $variant="danger" onClick={handleDelete}>Delete</Button>}
        </ButtonRow>
      </Form>
    </section>
  );
};

export default ProductEditorPage;
