import { type Task } from '../hooks/useTodos'

interface TodoItemProps {
  task: Task
  onDelete: (taskId: string) => Promise<void>
}

export function TodoItem({ task, onDelete }: TodoItemProps) {
  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{new Date(task.created_at).toLocaleString()}</td>
      <td>
        <button onClick={() => onDelete(task.id)} className="delete-btn">
          Delete
        </button>
      </td>
    </tr>
  )
}
