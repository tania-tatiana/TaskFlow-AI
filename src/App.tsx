import { useCallback, useMemo, useState } from "react";
import type { NewTask, Task, TaskView } from "./components/types/task";
import "./App.css";
import Header from "./components/Header/Header";
import TaskList from "./components/TaskList/TaskList";
import TaskModal from "./components/TaskModal/TaskModal";
import ProfileModal from "./components/ProfileModal/ProfileModal";
import Toast from "./components/Toast/Toast";

const initialTasks: Task[] = [
  {
    id: 1,
    name: "Завершити дизайн головної сторінки",
    category: "Робота",
    deadline: "12:00",
    priority: 1,
    completed: false,
  },
  {
    id: 2,
    name: "Пройти урок з TypeScript",
    category: "Навчання",
    deadline: "14:30",
    priority: 2,
    completed: false,
  },
  {
    id: 3,
    name: "Відповісти на робочі листи",
    category: "Робота",
    deadline: "16:00",
    priority: 3,
    completed: true,
  },
  {
    id: 4,
    name: "Запланувати справи на завтра",
    category: "Особисте",
    deadline: "18:00",
    priority: 2,
    completed: false,
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [currentView, setCurrentView] = useState<TaskView>("dashboard");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [sortByPriority, setSortByPriority] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [aiPlanGenerated, setAiPlanGenerated] = useState(false);

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;

  const progress =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  const nearestTask = useMemo(() => {
    return tasks
      .filter((task) => !task.completed)
      .sort((a, b) => a.deadline.localeCompare(b.deadline))[0];
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    let result = [...tasks];

    if (currentView === "dashboard") {
      result = result.filter((task) => !task.completed);
    }

    if (currentView === "calendar") {
      result.sort((a, b) => a.deadline.localeCompare(b.deadline));
    }

    if (sortByPriority) {
      result.sort((a, b) => a.priority - b.priority);
    }

    return result;
  }, [tasks, currentView, sortByPriority]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  const addTask = (newTask: NewTask) => {
    const task: Task = {
      ...newTask,
      id: Date.now(),
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, task]);
    setIsTaskModalOpen(false);
    showToast("Завдання успішно додано!");
  };

  const toggleTask = (id: number) => {
    const task = tasks.find((item) => item.id === id);

    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );

    if (task) {
      showToast(
        task.completed
          ? "Завдання повернуто до активних"
          : "Завдання виконано!",
      );
    }
  };

  const deleteTask = (id: number) => {
    setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id));

    showToast("Завдання видалено");
  };

  const generateAiPlan = () => {
    setAiPlanGenerated(true);
    showToast("План на день сформовано!");
  };

  const viewTitle =
    currentView === "tasks"
      ? "Усі завдання"
      : currentView === "calendar"
        ? "Розклад завдань"
        : "Пріоритети на сьогодні";

  return (
    <div className="app">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onAddTask={() => setIsTaskModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      <main className="main-content">
        <section className="welcome-section">
          <div>
            <p className="eyebrow">ТВІЙ ПРОДУКТИВНИЙ ПРОСТІР</p>
            <h1>Привіт! Час втілювати плани 💙</h1>
            <p className="welcome-description">
              Організуй свій день, зосередься на головному та досягай більшого
              разом із TaskFlow AI.
            </p>
          </div>

          <button
            className="button button-primary"
            onClick={() => setIsTaskModalOpen(true)}
          >
            <span aria-hidden="true">＋</span> Нове завдання
          </button>
        </section>

        <section className="stats-grid" aria-label="Статистика завдань">
          <article className="stat-card">
            <div className="stat-icon blue-icon" aria-hidden="true">
              ☑
            </div>
            <p className="stat-label">Усього завдань</p>
            <p className="stat-value">{tasks.length}</p>
            <p className="stat-note">У твоєму списку</p>
          </article>

          <article className="stat-card">
            <div className="stat-icon green-icon" aria-hidden="true">
              ✓
            </div>
            <p className="stat-label">Виконано</p>
            <p className="stat-value">{completedCount}</p>
            <p className="stat-note">Чудова робота!</p>
          </article>

          <article className="stat-card">
            <div className="stat-icon orange-icon" aria-hidden="true">
              ◷
            </div>
            <p className="stat-label">Залишилося</p>
            <p className="stat-value">{activeCount}</p>
            <p className="stat-note">Крок за кроком</p>
          </article>

          <article className="stat-card">
            <div className="stat-icon sky-icon" aria-hidden="true">
              ◷
            </div>
            <p className="stat-label">Найближчий дедлайн</p>
            <p className="stat-value stat-value-time">
              {nearestTask?.deadline ?? "—"}
            </p>
            <p className="stat-note">
              {nearestTask?.name ?? "Усі справи виконано"}
            </p>
          </article>
        </section>

        <section className="content-grid">
          <div className="tasks-panel panel">
            <div className="panel-heading">
              <div>
                <h2>{viewTitle}</h2>
                <p className="panel-subtitle">
                  {currentView === "dashboard"
                    ? "Почни з найважливішого"
                    : currentView === "calendar"
                      ? "Завдання за часом виконання"
                      : "Керуй усіма своїми справами"}
                </p>
              </div>

              <button
                className={`button button-secondary ${
                  sortByPriority ? "is-selected" : ""
                }`}
                onClick={() => setSortByPriority((previous) => !previous)}
                aria-pressed={sortByPriority}
              >
                ⇅ {sortByPriority ? "За пріоритетом" : "Сортувати"}
              </button>
            </div>

            <TaskList
              tasks={visibleTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />

            {currentView === "dashboard" && (
              <button
                className="text-button"
                onClick={() => setCurrentView("tasks")}
              >
                Переглянути всі завдання <span aria-hidden="true">→</span>
              </button>
            )}

            {currentView === "calendar" && (
              <p className="calendar-note">
                Це демонстраційний розклад: завдання впорядковано за часом.
              </p>
            )}
          </div>

          <aside className="sidebar">
            <section className="ai-card">
              <div className="ai-card-top">
                <span className="ai-sparkle" aria-hidden="true">
                  ✦
                </span>
                <span className="ai-label">TASKFLOW AI</span>
              </div>

              <h2>Твій розумний планувальник</h2>
              <p>
                Дозволь планувальнику допомогти розставити пріоритети та
                організувати твій день.
              </p>

              <button className="button ai-button" onClick={generateAiPlan}>
                ✦ Сформувати план
              </button>

              {aiPlanGenerated && (
                <div className="ai-plan-result">
                  <h3>Рекомендований порядок</h3>
                  <ol>
                    {tasks
                      .filter((task) => !task.completed)
                      .sort((a, b) => a.priority - b.priority)
                      .slice(0, 3)
                      .map((task) => (
                        <li key={task.id}>{task.name}</li>
                      ))}
                  </ol>
                  <p>
                    Почни з важливого завдання, а потім переходь до наступного.
                  </p>
                </div>
              )}
            </section>

            <section className="panel progress-panel">
              <div className="panel-heading">
                <h2>Мій прогрес</h2>
                <span className="progress-percent">{progress}%</span>
              </div>

              <p className="panel-subtitle">
                {completedCount} із {tasks.length} завдань виконано
              </p>

              <div
                className="progress-track"
                role="progressbar"
                aria-label="Прогрес виконання завдань"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="progress-message">
                {progress === 100
                  ? "Усе виконано! Чудовий результат 🎉"
                  : progress >= 50
                    ? "Ти вже багато зробила. Продовжуй!"
                    : "Кожен маленький крок має значення."}
              </p>
            </section>

            <section className="tip-card">
              <div className="tip-icon" aria-hidden="true">
                💡
              </div>
              <div>
                <h3>Порада дня</h3>
                <p>
                  Зосередься на одному важливому завданні за раз. Так легше
                  зберігати увагу та помічати свій прогрес.
                </p>
              </div>
            </section>
          </aside>
        </section>
      </main>

      <footer className="footer">
        <span className="footer-brand">
          <span className="footer-check" aria-hidden="true">
            ✓
          </span>
          TaskFlow <span>AI</span>
        </span>
        <p>Плануй розумніше. Досягай більшого.</p>
      </footer>

      {isTaskModalOpen && (
        <TaskModal
          onClose={() => setIsTaskModalOpen(false)}
          onAddTask={addTask}
        />
      )}

      {isProfileModalOpen && (
        <ProfileModal onClose={() => setIsProfileModalOpen(false)} />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}

export default App;
