import { type FormEvent, useEffect, useState } from 'react'
import './App.css'

interface Task {
  id: string
  title: string
  description: string
  created_at: string
  updated_at: string
}

interface TodoFormData {
  title: string
  description: string
}

function TodoForm({ onSubmit }: { onSubmit: (data: TodoFormData) => Promise<void> }) {
  const [formData, setFormData] = useState<TodoFormData>({
    title: '',
    description: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return
    
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form after successful submission
      setFormData({ title: '', description: '' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="What needs to be done?"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          placeholder="Add details (optional)"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? '...' : 'Add'}
      </button>
    </form>
  )
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks')
      if (!response.ok) {
        throw new Error('Failed to fetch tasks')
      }
      const data = await response.json()
      setTasks(data.tasks)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (data: TodoFormData) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create task')
      }

      // Refresh the task list
      fetchTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task')
      throw err // Re-throw to handle in the form component
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete task')
      }
      // Refresh the task list
      fetchTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task')
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="container">
      <h1>Todo Tasks</h1>
      <TodoForm onSubmit={createTask} />
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TodoItem key={task.id} task={task} onDelete={deleteTask} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

interface TodoItemProps {
  task: Task
  onDelete: (taskId: string) => Promise<void>
}

function TodoItem({ task, onDelete }: TodoItemProps) {
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

export default App
