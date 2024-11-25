import React, { useState } from 'react';
import logo from '../assets/Infovision_Logo.png'

const Sales = () => {
    const [StockItemId, setStockItemId] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [SaleDate, setSaleDate] = useState(new Date());
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (!StockItemId || !Quantity) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/sale', { // Replace with your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ StockItemId: StockItemId, Quantity: Quantity, SaleDate: SaleDate }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add sale.');
            }

            const data = await response.json();
            setMessage(data.message || 'Sale added successfully.');

            // Clear the form after successful submission
            setStockItemId('');
            setQuantity('');

        } catch (error) {
            setError(error.message);
            console.error('Error adding sale:', error);

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
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center">Add Sale</h2>
                    <p className="text-muted text-center">Record a new sale by entering the item details below.</p>

                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-3">
                            <label htmlFor="StockItemId" className="form-label">Item ID</label>
                            <input
                                type="number"
                                id="StockItemId"
                                className="form-control"
                                placeholder="Enter item ID"
                                value={StockItemId}
                                onChange={(e) => setStockItemId(parseInt(e.target.value, 10) || 0)}
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
                        <div>
                    <label htmlFor="SaleDate">Sale Date:</label>
                    {/* <input type="number" id="SaleDate" value={SaleDate} onChange={e => setSaleDate(parseInt(e.target.value, 10) || 0)} /> */}
                    <input type="date" id="SaleDate"value={SaleDate .toISOString().slice(0, 10)} onChange={(e) => setSaleDate(new Date(e.target.value))} />
                    {/* <input type="date" value={SaleDate .toISOString().slice(0, 10)} onChange={(e) => setSaleDate(new Date(e.target.value))} /> */}
                </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Add Sale</button>
                        </div>
                    </form>

                    {message && (
                        <div className="alert alert-info mt-4" role="alert">
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

export default Sales;