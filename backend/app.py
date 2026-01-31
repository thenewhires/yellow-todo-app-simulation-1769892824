from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

todos = []

@app.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route('/todos', methods=['POST'])
def create_todo():
    data = request.get_json()
    # Bug 1: Missing ID assignment
    todo = {'task': data['task'], 'completed': False}
    todos.append(todo)
    return jsonify(todo), 201

@app.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    data = request.get_json()
    # Bug 2: Indexing error, can cause out-of-bounds
    if 0 <= todo_id < len(todos):
       todos[todo_id]['completed'] = data['completed']
       return jsonify(todos[todo_id])
    else:
       return 'Todo not found', 404

@app.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    # Bug 3: Incorrect index to delete
    if 0 <= todo_id < len(todos):
        del todos[todo_id]
        return '', 204
    else:
        return 'Todo not found', 404

if __name__ == '__main__':
    app.run(debug=True)