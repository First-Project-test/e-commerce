import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategorySearch.css';

function CategorySearch() {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3030/api/categories');
                setCategories(response.data);
                setFilteredCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCategories(filtered);
    }, [searchTerm, categories]);

    return (
        <div className="category-search">
            <div className="search-input">
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-field"
                />
            </div>
            <div className="categories-list">
                {filteredCategories.map((category) => (
                    <div key={category.id} className="category-item">
                        <h3>{category.name}</h3>
                        {category.Electronics && category.Electronics.length > 0 && (
                            <p>{category.Electronics.length} products</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategorySearch; 