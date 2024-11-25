import React from 'react';

const Error = ({ showRequestId, requestId }) => { // Assuming these props are passed
    return (
        <div>
            <h1 className="text-danger">Error.</h1>
            <h2 className="text-danger">An error occurred while processing your request.</h2>

            {showRequestId && (
                <p>
                    <strong>Request ID:</strong> <code>{requestId}</code>
                </p>
            )}

            <h3>Development Mode</h3>
            <p>
                Swapping to the <strong>Development</strong> environment displays detailed information about the error that occurred.
            </p>
            <p>
                <strong>The Development environment shouldn't be enabled for deployed applications.</strong>
                It can result in displaying sensitive information from exceptions to end users.
                For local debugging, enable the <strong>Development</strong> environment by setting the <strong>ASPNETCORE_ENVIRONMENT</strong> environment variable to <strong>Development</strong>
                and restarting the app.
            </p>
        </div>
    );
};


export default Error;