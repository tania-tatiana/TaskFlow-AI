import type { TaskView } from "../types/task";

interface HeaderProps {
  currentView: TaskView;
  onViewChange: (view: TaskView) => void;
  onAddTask: () => void;
  onOpenProfile: () => void;
}

function Header({
  currentView,
  onViewChange,
  onAddTask,
  onOpenProfile,
}: HeaderProps) {
  return (
    <header className="topbar">
      <a
        href="#main"
        className="brand"
        aria-label="TaskFlow AI — на головну"
        onClick={(event) => {
          event.preventDefault();
          onViewChange("dashboard");
        }}
      >
        <span className="brand-mark" aria-hidden="true">
          ✓
        </span>
        <span className="brand-name">
          TaskFlow <span>AI</span>
        </span>
      </a>

      <nav className="main-nav" aria-label="Основна навігація">
        <button
          className={`nav-link ${currentView === "dashboard" ? "active" : ""}`}
          onClick={() => onViewChange("dashboard")}
        >
          Мій день
        </button>

        <button
          className={`nav-link ${currentView === "tasks" ? "active" : ""}`}
          onClick={() => onViewChange("tasks")}
        >
          Усі завдання
        </button>

        <button
          className={`nav-link ${currentView === "calendar" ? "active" : ""}`}
          onClick={() => onViewChange("calendar")}
        >
          Розклад
        </button>
      </nav>

      <div className="header-actions">
        <button
          className="button button-primary header-add"
          onClick={onAddTask}
        >
          <span aria-hidden="true">＋</span>
          <span>Додати</span>
        </button>

        <button
          className="profile-button"
          onClick={onOpenProfile}
          aria-label="Відкрити профіль"
          title="Мій профіль"
        >
          T
        </button>
      </div>
    </header>
  );
}

export default Header;
