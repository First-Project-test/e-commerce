import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Addelectronic() {
  const [formData, setFormData] = useState({
    name: '',
    release: '',
    quantity: '',
    price: '',
    rating: '',
    description: '',
    image: [],
    CategoryId: ''
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const token=localStorage.getItem("token")

  useEffect(() => {
   
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:2080/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });

      
      const response = await fetch("http://localhost:2080/api/cloudinary/upload-multiple", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Failed to upload images");

      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        image: [...prev.image, ...data.urls] 
      }));
    } catch (error) {
      console.error("Upload Error:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:2080/api/electronics', formData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Reset form
      setFormData({
        name: '',
        release: '',
        quantity: '',
        price: '',
        rating: '',
        description: '',
        image: [],
        CategoryId: ''
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Electronic Item</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Release Date</label>
          <input
            type="date"
            name="release"
            value={formData.release}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="100"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="CategoryId"
            value={formData.CategoryId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full"
          />
          <div className="mt-2 flex gap-2">
            {formData.image.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded Preview ${index + 1}`}
                className="h-20 w-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Electronic Item'}
        </button>
      </form>
    </div>
  );
}

export default Addelectronic;
