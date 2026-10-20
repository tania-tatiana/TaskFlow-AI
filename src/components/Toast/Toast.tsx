import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timeoutId = window.setTimeout(onClose, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [message, onClose]);

  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-check" aria-hidden="true">
        ✓
      </span>
      <span>{message}</span>

      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Закрити повідомлення"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
