import { useEffect } from 'react'
import { useTodos } from './hooks/useTodos'
import { TodoForm } from './components/TodoForm'
import { TodoItem } from './components/TodoItem'
import './App.css'

function App() {
  const { tasks, loading, error, fetchTasks, createTask, deleteTask } = useTodos()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

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

export default App
