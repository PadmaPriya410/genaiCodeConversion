import React, { useState } from 'react';
import logo from '../assets/Infovision_Logo.png'

const Stock = () => {
    const [Name, setStockItemName] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [Price, setPrice] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear any previous errors
        setMessage(null); // Clear any previous messages

        // Basic client-side validation (you might want more robust validation)
        if (!Name || !Quantity || !Price) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/add', { // Replace with your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Name: Name, Quantity: Quantity, Price: Price }),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Assuming error details are in JSON
                throw setMessage('Failed to add stock. Chech the input details');
                // throw new Error(errorData.message || 'Failed to add stock item.');
            }

            const data = await response.json(); // Assuming success message is in JSON
            setMessage(data.message || 'Stock item added successfully.');
            // Clear form after successful submission
            setStockItemName('');
            setQuantity('');
            setPrice('');

        } catch (err) {
            setError(err.message);
            console.error("Error adding stock:", err);
        }
    };

    return (
        <div className="app-container">
            {/* Header Section */}
            <header className="header">
                <div className="navbar">
                    <h1>Computer Shop Manager</h1>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/privacy">Privacy</a>
                    </nav>
                </div>
                {/* Logo */}
                <img src={logo} alt="Logo" className="header-logo" />  
            </header>

            {/* Main Content */}
            <div className="page-container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Add Stock Item</h2>
                    <p className="text-muted text-center">Fill in the details below to add a new stock item.</p>

                    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">                    
                        <div className="mb-3">
                            <label htmlFor="StockItemName" className="form-label">Item Name</label>
                            <input
                                type="text"
                                id="Name"
                                className="form-control"
                                placeholder="Enter item name"
                                value={Name}
                                onChange={(e) => setStockItemName(e.target.value)}
                                required
                            />
                            {error && <div className="text-danger">{error}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Quantity" className="form-label">Quantity</label>
                            <input
                                type="number"
                                id="Quantity"
                                className="form-control"
                                placeholder="Enter quantity"
                                value={Quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}
                                required
                            />                        
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Price" className="form-label">Price</label>
                            <input
                                type="number"
                                id="Price"
                                className="form-control"
                                placeholder="Enter price"
                                step="0.01"
                                value={Price}
                                onChange={(e) => setPrice(parseFloat(e.target.value, 10) || 0)}
                                required
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Add Stock</button>
                        </div>
                    </form>

                    {message && (
                        <div className="alert alert-success mt-4" role="alert">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>

            {/* Footer Section */}
            <footer className="footer">
                <p>&copy; 2024 Computer Shop Manager. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Stock;