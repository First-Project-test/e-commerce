import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Dashboard.css';

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

      const data = await response.json()
      console.log(data)
      
      setFormData(prev => ({
        ...prev,
        image: data.urls
      }));
    } catch (error) {
      console.error("Upload Error:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    // don't refresh the page on form submission
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:2080/api/electronics', formData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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
    <div className="add-product-form">
      <h2>Add New Electronic Item</h2>
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
            name="release"
            value={formData.release}
            onChange={handleChange}
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
            max="100"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="CategoryId"
            value={formData.CategoryId}
            onChange={handleChange}
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
                alt={`Uploaded Preview ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Adding...' : 'Add Electronic Item'}
        </button>
      </form>
    </div>
  );
}

export default Addelectronic; 