import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import '../styles/page.css'; // Import global CSS for styling
import logo from '../assets/Infovision_Logo.png'
// Home Component
const Home = () => {
    const navigate = useNavigate();

    const handleGoToStock = async () => {
                try {
                  const response = await fetch('/stock', { method: 'GET' }); // Or appropriate API endpoint for stock management
                  if (response.ok) {
                    navigate('/stock'); // Navigate to the stock management page
                  } else {
                    console.error('Error navigating to stock:', response.status);
                    // Handle error, e.g., display an error message
                  }
                } catch (error) {
                  console.error('Error navigating to stock:', error);
                  // Handle error
                }
              };
            
              const handleGoToSale = async () => {
                try {
                  const response = await fetch('/sale', { method: 'GET' }); // Or appropriate API endpoint for sales management
                  if (response.ok) {
                    navigate('/sale'); // Navigate to the sales management page
                  } else {
                    console.error('Error navigating to sales:', response.status);
                    // Handle error
                  }
                } catch (error) {
                  console.error('Error navigating to sales:', error);
                  // Handle error
                }
              };
            
              const handleGoToReport = async () => {
                try {
                  const response = await fetch('/report', { method: 'GET' }); // Or appropriate API endpoint for report generation
                  if (response.ok) {
                    navigate('/report'); // Navigate to the report generation page
                  } else {
                    console.error('Error navigating to report:', response.status);
                    // Handle error
                  }
                } catch (error) {
                  console.error('Error navigating to report:', error);
                  // Handle error
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
                        <h1>Welcome to the Computer Shop Manager</h1>
                        <p>Choose an action below to manage your shop efficiently.</p>
                        <div className="button-group">
                            <button onClick={handleGoToStock} className="btn-primary">Manage Stock</button>
                            <button onClick={handleGoToSale} className="btn-secondary">Manage Sales</button>
                            <button onClick={handleGoToReport} className="btn-tertiary">Generate Report</button>
                        </div>
                    </div>
        
                    {/* Footer Section */}
                    <footer className="footer">
                        <p>&copy; 2024 Computer Shop Manager. All rights reserved.</p>
                    </footer>
                </div>
            );
};

export default Home;