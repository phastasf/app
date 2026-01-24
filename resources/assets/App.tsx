import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [apiConnected, setApiConnected] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/";

    useEffect(() => {
        const fetchApiStatus = async () => {
            try {
                setIsLoading(true);
                setApiError(null);
                const response = await fetch(`${apiBaseUrl}/api/status`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const text = await response.text();
                if (text === "OK") {
                    setApiConnected(true);
                } else {
                    throw new Error("Unexpected response");
                }
            } catch (error) {
                setApiError(
                    error instanceof Error
                        ? error.message
                        : "Failed to connect to API",
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchApiStatus();
    }, [apiBaseUrl]);

    return (
        <div className="app-container">
            <div className="welcome-card">
                <div className="header">
                    <h1>Welcome to Phast</h1>
                    <p className="subtitle">
                        A lightweight, modern PHP framework built on PSR
                        standards
                    </p>
                </div>

                {isLoading && (
                    <div className="api-status api-status-loading">
                        <span>Connecting to API...</span>
                    </div>
                )}

                {apiError && (
                    <div className="api-status api-status-error">
                        <span>API Connection Error: {apiError}</span>
                    </div>
                )}

                {apiConnected && !apiError && (
                    <div className="api-status api-status-success">
                        <span>✓ API Connected</span>
                    </div>
                )}

                <div className="features-section">
                    <h2>Framework Features</h2>
                    <div className="features-grid">
                        <FeatureItem text="PSR-15 Middleware Support" />
                        <FeatureItem text="PSR-7 HTTP Messages" />
                        <FeatureItem text="PSR-11 Container" />
                        <FeatureItem text="PSR-3 Logging" />
                        <FeatureItem text="PSR-6 & PSR-16 Caching" />
                        <FeatureItem text="Dependency Injection" />
                        <FeatureItem text="Routing & Controllers" />
                        <FeatureItem text="View Rendering" />
                        <FeatureItem text="Database & ORM" />
                        <FeatureItem text="Migrations" />
                        <FeatureItem text="Queue System" />
                        <FeatureItem text="JWT Authentication" />
                    </div>
                </div>

                <div className="footer">
                    <a
                        href="https://github.com/phastasf/framework"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                    >
                        Documentation
                    </a>
                    <a
                        href="https://github.com/phastasf/framework"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="feature-item">
            <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                />
            </svg>
            <span>{text}</span>
        </div>
    );
}

export default App;
