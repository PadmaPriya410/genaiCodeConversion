import React, { useState } from 'react';
import logo from '../assets/Infovision_Logo.png'

const Report = () => {
    const [reportType, setReportType] = useState('');
    const [reportData, setReportData] = useState(null);
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        let url = '';
    if (reportType === 'Sale') {
      url = 'http://localhost:3000/api/report/sales';
    } else {
      url = 'http://localhost:3000/api/report/stock';
    }

        try {
            const response = await fetch(url, {  //replace with your api endpoint
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },                
            });


            if (!response.ok) {
                const errorData = await response.json(); // Assuming error details are sent as JSON
                throw new Error(errorData.message || 'Failed to generate report.');
            }

            const data = await response.json();
            setReportData(data);

        } catch (err) {
            setError(err.message);
            console.error("Error generating report:", err);
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
                    <h2 className="text-center mb-4">Generate Report</h2>
                    <p className="text-muted text-center">Select the type of report you want to generate.</p>

                    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                        <div className="mb-3">
                            <label htmlFor="ReportType" className="form-label">Report Type</label>
                            <select
                                id="ReportType"
                                className="form-select"
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select a report type</option>
                                <option value="Sale">Sale</option>
                                <option value="Stock">Stock</option>
                            </select>
                            {error && <div className="text-danger">{error}</div>} {/* Display error message */}

                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Generate Report</button>
                        </div>
                    </form>

                    {reportData && (
                        <div className="mt-4">
                            <h3>Report Data</h3>
                            <pre className="bg-light p-3 border rounded">{JSON.stringify(reportData, null, 2)}</pre>
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

export default Report;