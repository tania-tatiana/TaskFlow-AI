import type { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const priorityLabels: Record<Task["priority"], string> = {
  1: "Високий",
  2: "Середній",
  3: "Низький",
};

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <article className={`task-item ${task.completed ? "completed" : ""}`}>
      <button
        className={`task-checkbox ${task.completed ? "checked" : ""}`}
        onClick={() => onToggle(task.id)}
        aria-label={
          task.completed
            ? `Позначити «${task.name}» невиконаним`
            : `Позначити «${task.name}» виконаним`
        }
        aria-pressed={task.completed}
      >
        {task.completed ? "✓" : ""}
      </button>

      <div className="task-content">
        <h3 className="task-title">{task.name}</h3>

        <div className="task-meta">
          <span className="category-badge">{task.category}</span>
          <span className={`priority-badge priority-${task.priority}`}>
            {priorityLabels[task.priority]} пріоритет
          </span>
        </div>
      </div>

      <div className="task-end">
        <span className="task-time" title="Час виконання">
          ◷ {task.deadline}
        </span>

        <button
          className="delete-task"
          onClick={() => onDelete(task.id)}
          aria-label={`Видалити завдання «${task.name}»`}
          title="Видалити"
        >
          ×
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
