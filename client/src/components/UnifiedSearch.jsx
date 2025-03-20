import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UnifiedSearch.css';

function UnifiedSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [gameCategories, setGameCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredGameCategories, setFilteredGameCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch both regular categories and game categories
                const [categoriesResponse, gameCategoriesResponse] = await Promise.all([
                    axios.get('http://localhost:2080/api/categories'),
                    axios.get('http://localhost:2080/api/game-categories')
                ]);
                
                setCategories(categoriesResponse.data);
                setGameCategories(gameCategoriesResponse.data);
                setFilteredCategories(categoriesResponse.data);
                setFilteredGameCategories(gameCategoriesResponse.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const filteredGames = gameCategories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setFilteredCategories(filtered);
        setFilteredGameCategories(filteredGames);
    }, [searchTerm, categories, gameCategories]);

    return (
        <div className="unified-search">
            <div className="search-input">
                <input
                    type="text"
                    placeholder="Search all categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-field"
                />
            </div>

            <div className="search-results">
                {/* Regular Categories Section */}
                {filteredCategories.length > 0 && (
                    <div className="categories-section">
                        <h2>Product Categories</h2>
                        <div className="categories-list">
                            {filteredCategories.map((category) => (
                                <div key={category.id} className="category-item">
                                    <h3>{category.name}</h3>
                                    {category.Electronics && category.Electronics.length > 0 && (
                                        <div className="category-info">
                                            <p>{category.Electronics.length} products</p>
                                            <div className="product-preview">
                                                {category.Electronics.slice(0, 3).map(product => (
                                                    <span key={product.id} className="product-tag">{product.name}</span>
                                                ))}
                                                {category.Electronics.length > 3 && (
                                                    <span className="more-products">+{category.Electronics.length - 3} more</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Game Categories Section */}
                {filteredGameCategories.length > 0 && (
                    <div className="categories-section">
                        <h2>Game Categories</h2>
                        <div className="categories-list">
                            {filteredGameCategories.map((category) => (
                                <div key={category.id} className="category-item">
                                    <h3>{category.name}</h3>
                                    {category.Games && category.Games.length > 0 && (
                                        <div className="category-info">
                                            <p>{category.Games.length} games</p>
                                            <div className="product-preview">
                                                {category.Games.slice(0, 3).map(game => (
                                                    <span key={game.id} className="product-tag">{game.name}</span>
                                                ))}
                                                {category.Games.length > 3 && (
                                                    <span className="more-products">+{category.Games.length - 3} more</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* No Results Message */}
                {filteredCategories.length === 0 && filteredGameCategories.length === 0 && (
                    <div className="no-results">
                        <p>No categories found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UnifiedSearch; 