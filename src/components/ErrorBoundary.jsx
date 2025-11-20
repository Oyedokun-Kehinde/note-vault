// src/components/ErrorBoundary.jsx
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>We couldn't load this part of the app.</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              marginTop: '1rem', 
              padding: '0.6rem 1.2rem', 
              backgroundColor: '#45BFDB', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer' 
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}