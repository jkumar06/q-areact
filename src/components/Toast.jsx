/**
 * Toast Component
 * Notification system for copy, print, etc.
 */
import { useState, useEffect } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const show = (message, type = 'info', duration = 2000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }

    return id;
  };

  const dismiss = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return { toasts, show, dismiss };
}

function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    copy: '📋'
  };

  return (
    <div className={`toast toast-${type}`} role="status">
      <span className="toast-icon">{icons[type] || icons.info}</span>
      <span className="toast-message">{message}</span>
    </div>
  );
}

function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onDismiss={() => onDismiss(toast.id)}
        />
      ))}
    </div>
  );
}

export default ToastContainer;
