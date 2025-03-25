import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Dashboard.css';

function Addgame({setx,x}) {
  const [formData, setFormData] = useState({
    name: '',
    releaseDate: '',
    quantity: '',
    price: '',
    rating: '',
    description: '',
    image: [],
    categoryId: ''
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:2080/api/game-categories');
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
      if (!formData.name || !formData.releaseDate || !formData.quantity || !formData.price || !formData.categoryId || !formData.description) {
        alert('Please fill in all required fields');
        return;
      }

      const gameData = {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        rating: formData.rating ? Number(formData.rating) : null
      };

      const response = await axios.post('http://localhost:2080/api/games', gameData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        setFormData({
          name: '',
          releaseDate: '',
          quantity: '',
          price: '',
          rating: '',
          description: '',
          image: [],
          categoryId: ''
        });
        alert('Game added successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'Failed to add game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add New Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Release Date</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="image-preview">
            {formData.image.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-button"
          onClick={() => setx(!x)}
        >
          {loading ? 'Adding...' : 'Add Game'}
        </button>
      </form>
    </div>
  );
}

export default Addgame;
