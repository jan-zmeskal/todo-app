from flask import Flask, request, jsonify
from datetime import datetime
import uuid

app = Flask(__name__)

# In-memory storage for tasks (in production, use a proper database)
tasks = {}


@app.route('/api/tasks', methods=['POST'])
def create_task():
    """Create a new task"""
    try:
        data = request.get_json()

        # Validate required fields
        if not data or 'title' not in data:
            return jsonify({'error': 'Title is required'}), 400

        # Create new task
        task_id = str(uuid.uuid4())
        task = {
            'id': task_id,
            'title': data['title'],
            'description': data.get('description', ''),
            'completed': False,
            'created_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat()
        }

        tasks[task_id] = task

        return jsonify(task), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/tasks', methods=['GET'])
def list_tasks():
    """List all tasks"""
    try:
        # Convert dict to list and sort by creation date (newest first)
        task_list = sorted(
            tasks.values(),
            key=lambda x: x['created_at'],
            reverse=True
        )

        return jsonify({
            'tasks': task_list,
            'total': len(task_list)
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Delete a task by ID"""
    try:
        if task_id not in tasks:
            return jsonify({'error': 'Task not found'}), 404

        deleted_task = tasks.pop(task_id)

        return jsonify({
            'message': 'Task deleted successfully',
            'task': deleted_task
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
