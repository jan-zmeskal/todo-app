import { type FormEvent, useState } from 'react'
import { type TodoFormData } from '../hooks/useTodos'

interface TodoFormProps {
  onSubmit: (data: TodoFormData) => Promise<void>
}

export function TodoForm({ onSubmit }: TodoFormProps) {
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
