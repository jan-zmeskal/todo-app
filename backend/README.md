# TODO API - Backend Assessment

This is a simple Flask REST API for a TODO application. Your tasks are:
- Start the backend

## Setup Instructions

1. **Clone the repository**

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the application**:
   ```bash
   python app.py
   ```

   The API will be available at `http://localhost:5000`

## API Endpoints

### 1. Create Task
- **POST** `/api/tasks`
- **Body**: 
  ```json
  {
    "title": "Task title",
    "description": "Optional task description"
  }
  ```
- **Response**: Created task object

### 2. List Tasks
- **GET** `/api/tasks`
- **Response**: List of all tasks

### 3. Delete Task
- **DELETE** `/api/tasks/<task_id>`
- **Response**: Deleted task object

## Testing the API

You can test the API using curl commands:

```bash
# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'

# List all tasks
curl http://localhost:5000/api/tasks

# Delete a task (replace <task_id> with actual ID)
curl -X DELETE http://localhost:5000/api/tasks/<task_id>
```

## Your Task

Please add the following feature to the API:

### Update Task Endpoint

Implement a new endpoint to update an existing task:

- **Endpoint**: `PUT /api/tasks/<task_id>`
- **Request Body**: 
  ```json
  {
    "title": "Updated title (optional)",
    "description": "Updated description (optional)",
    "completed": true/false (optional)
  }
  ```
- **Requirements**:
  - The endpoint should update only the fields provided in the request
  - Update the `updated_at` timestamp when a task is modified
  - Return 404 if the task doesn't exist
  - Return the updated task object on success

### Example Usage:
```bash
# Update a task
curl -X PUT http://localhost:5000/api/tasks/<task_id> \
  -H "Content-Type: application/json" \
  -d '{"completed": true, "title": "Buy groceries - DONE"}'
```

## Submission

Once you've implemented the update endpoint:
1. Test it to ensure it works correctly
2. Commit your changes
3. Be prepared to discuss your implementation and any challenges you faced

Good luck!