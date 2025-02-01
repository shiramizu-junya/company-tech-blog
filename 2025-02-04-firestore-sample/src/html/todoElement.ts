import { TodoType } from '../TodoService';

export const todoElement = (todo: TodoType) => `
    <div class="todo-item d-flex align-items-center p-2 border rounded mb-2 ${
			todo.isCompleted && 'bg-light'
		}">
        <div class="form-check">
            <input class="form-check-input js-complete-checkbox" type="checkbox" id="todo2" ${
							todo.isCompleted && 'checked'
						} data-id="${todo.id}">
            <label class="form-check-label ${
							todo.isCompleted && 'text-decoration-line-through'
						}" for="todo2">
                ${todo.description}
            </label>
        </div>
        <button class="btn btn-link text-danger ms-auto js-delete-todo-button" data-id="${todo.id}">
            <i class="bi bi-trash"></i>
        </button>
    </div>
`;
