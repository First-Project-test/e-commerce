import React, { useState } from 'react';
import '../css/GameFAQ.css';

const GameFAQ = () => {
    const [openQuestion, setOpenQuestion] = useState(null);

    const faqData = [
        {
            id: '01',
            question: 'What types of games do you offer?',
            answer: 'We offer a wide range of gaming experiences including action, adventure, RPG, strategy, sports, and multiplayer games. Our collection is designed to suit different gaming preferences and skill levels.'
        },
        {
            id: '02',
            question: 'Do you offer international game keys?',
            answer: 'Yes, we provide game keys that work internationally. However, some games might have regional restrictions based on publisher policies.'
        },
        {
            id: '03',
            question: 'What is your refund policy?',
            answer: 'We offer refunds for unused game keys within 14 days of purchase. Each case is reviewed individually to ensure the best customer service.'
        },
        {
            id: '04',
            question: 'What payment methods do you accept?',
            answer: 'We accept major credit cards (Visa, MasterCard, American Express,Discover), PayPal, and recurring options through APIs. All transactions are secure and encrypted.'
        }
    ];

    const toggleQuestion = (id) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    return (
        <div className="game-faq">
            <h2>We have got the answers to your questions</h2>
            <div className="faq-list">
                {faqData.map((faq) => (
                    <div 
                        key={faq.id} 
                        className={`faq-item ${openQuestion === faq.id ? 'active' : ''}`}
                        onClick={() => toggleQuestion(faq.id)}
                    >
                        <div className="faq-header">
                            <span className="faq-number">{faq.id}</span>
                            <h3 className="faq-question">{faq.question}</h3>
                            <span className="faq-arrow">›</span>
                        </div>
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameFAQ; 