import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GameCategorySearch.css';

function GameCategorySearch() {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3030/api/game-categories');
                setCategories(response.data);
                setFilteredCategories(response.data);
            } catch (error) {
                console.error('Error fetching game categories:', error);
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
        <div className="game-category-search">
            <div className="search-input">
                <input
                    type="text"
                    placeholder="Search game categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-field"
                />
            </div>
            <div className="categories-list">
                {filteredCategories.map((category) => (
                    <div key={category.id} className="category-item">
                        <h3>{category.name}</h3>
                        {category.Games && category.Games.length > 0 && (
                            <div className="category-info">
                                <p>{category.Games.length} games</p>
                                <div className="game-preview">
                                    {category.Games.slice(0, 3).map(game => (
                                        <span key={game.id} className="game-tag">{game.name}</span>
                                    ))}
                                    {category.Games.length > 3 && (
                                        <span className="more-games">+{category.Games.length - 3} more</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameCategorySearch; 