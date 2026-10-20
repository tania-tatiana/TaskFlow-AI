import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";

interface ProfileModalProps {
  onClose: () => void;
}

function ProfileModal({ onClose }: ProfileModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    dialog.showModal();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (dialog.open) {
        dialog.close();
      }
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal profile-modal"
      onClick={handleBackdropClick}
      aria-labelledby="profile-modal-title"
    >
      <div className="modal-content">
        <div className="modal-heading">
          <h2 id="profile-modal-title">Мій профіль</h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Закрити"
          >
            ×
          </button>
        </div>

        <div className="profile-avatar-large">T</div>

        <h3 className="profile-name">Твій профіль</h3>
        <p className="profile-description">
          Персональний простір для твоїх планів і досягнень.
        </p>

        <div className="profile-info">
          <span>Обліковий запис</span>
          <strong>Демонстраційний</strong>
        </div>

        <button
          type="button"
          className="button button-primary button-full"
          onClick={onClose}
        >
          Готово
        </button>
      </div>
    </dialog>
  );
}

export default ProfileModal;
