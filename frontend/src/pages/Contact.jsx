import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [formSubmitted, setFormSubmitted] = useState(false); // New state

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle form submission, e.g., send data to a server
        console.log('Form submitted:', formData); // Placeholder - replace with actual submission logic
        setFormSubmitted(true); // Set submitted state to true

        // Reset form after submission (optional)
        setFormData({ name: '', email: '', message: '' });


    };

    return (
        <div className="contact-page">
             <div className="contact-container">
            <h1 className="contact-title">Contact Us</h1>


            {formSubmitted ? ( // Conditionally render thank you message
                <div className="thank-you-message">
                    <p>Thank you for your message! We'll get back to you soon.</p>
                </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>

                )}
                </div>

        </div>
    );
};

export default Contact;
