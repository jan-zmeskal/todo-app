import { useState, useCallback } from 'react'

export interface Task {
  id: string
  title: string
  description: string
  created_at: string
  updated_at: string
}

export interface TodoFormData {
  title: string
  description: string
}

export function useTodos() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async () => {
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
  }, [])

  const createTask = useCallback(async (data: TodoFormData) => {
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

      await fetchTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task')
      throw err
    }
  }, [fetchTasks])

  const deleteTask = useCallback(async (taskId: string) => {
    console.log("Delete task: " + taskId)
    alert("not implemented")
  }, [])

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    deleteTask,
  }
}
