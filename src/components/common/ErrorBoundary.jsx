import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import './ErrorBoundary.css';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Log to console for observability
    console.error('[ITSA Circuit ErrorBoundary caught exception]:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="circuit-error-wrapper" role="alert" aria-live="assertive">
          <div className="circuit-error-card">
            {/* Top Badge */}
            <div className="circuit-error-tag font-mono">
              <span className="error-signal-dot" aria-hidden="true" />
              <span>CIRCUIT MALFUNCTION // RUNTIME_INTERRUPT</span>
            </div>

            <div className="circuit-error-icon-box" aria-hidden="true">
              <AlertTriangle size={36} />
            </div>

            <h1 className="circuit-error-title font-display">
              Subsystem Desynchronized
            </h1>

            <p className="circuit-error-desc">
              An unexpected failure occurred while rendering this interface node. The application topology prevented total crash and isolated the malfunction.
            </p>

            {this.state.error && (
              <div className="circuit-error-debug font-mono" tabIndex={0} aria-label="Error details">
                <code>{this.state.error.message || String(this.state.error)}</code>
              </div>
            )}

            <div className="circuit-error-actions">
              <button
                type="button"
                className="btn btn-primary error-action-btn"
                onClick={this.handleReload}
              >
                <RefreshCw size={16} />
                <span>Reinitialize Subsystem</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary error-action-btn"
                onClick={this.handleReset}
              >
                <Home size={16} />
                <span>Return to Command Center</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
