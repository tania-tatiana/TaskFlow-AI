import { useEffect, useRef, useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import type { NewTask, TaskCategory, TaskPriority } from "../types/task";

interface TaskModalProps {
  onClose: () => void;
  onAddTask: (task: NewTask) => void;
}

function TaskModal({ onClose, onAddTask }: TaskModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<TaskCategory>("Робота");
  const [deadline, setDeadline] = useState("12:00");
  const [priority, setPriority] = useState<TaskPriority>(2);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) return;

    onAddTask({
      name: trimmedName,
      category,
      deadline,
      priority,
    });
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClick={handleBackdropClick}
      aria-labelledby="task-modal-title"
    >
      <form className="modal-content" onSubmit={handleSubmit}>
        <div className="modal-heading">
          <div>
            <p className="eyebrow">ОРГАНІЗУЙ СВІЙ ДЕНЬ</p>
            <h2 id="task-modal-title">Нове завдання</h2>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Закрити"
          >
            ×
          </button>
        </div>

        <label className="form-field">
          <span>Назва завдання</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Наприклад, завершити проєкт"
            maxLength={120}
            autoFocus
            required
          />
        </label>

        <label className="form-field">
          <span>Категорія</span>
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as TaskCategory)
            }
          >
            <option value="Робота">Робота</option>
            <option value="Навчання">Навчання</option>
            <option value="Особисте">Особисте</option>
            <option value="Інше">Інше</option>
          </select>
        </label>

        <label className="form-field">
          <span>Час виконання</span>
          <input
            type="time"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
            required
          />
        </label>

        <fieldset className="form-field priority-field">
          <legend>Пріоритет</legend>

          <div className="priority-options">
            <label className="priority-option">
              <input
                type="radio"
                name="priority"
                value="1"
                checked={priority === 1}
                onChange={() => setPriority(1)}
              />
              <span className="priority-dot priority-dot-high" />
              Високий
            </label>

            <label className="priority-option">
              <input
                type="radio"
                name="priority"
                value="2"
                checked={priority === 2}
                onChange={() => setPriority(2)}
              />
              <span className="priority-dot priority-dot-medium" />
              Середній
            </label>

            <label className="priority-option">
              <input
                type="radio"
                name="priority"
                value="3"
                checked={priority === 3}
                onChange={() => setPriority(3)}
              />
              <span className="priority-dot priority-dot-low" />
              Низький
            </label>
          </div>
        </fieldset>

        <div className="modal-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={onClose}
          >
            Скасувати
          </button>

          <button type="submit" className="button button-primary">
            Додати завдання
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default TaskModal;
