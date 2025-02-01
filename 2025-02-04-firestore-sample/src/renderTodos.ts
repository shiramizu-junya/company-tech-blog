export const renderTodos = (todos: { id: string; description: string; isCompleted: boolean }[]) => {
	const todoList = document.querySelector('.js-todo-list')! as HTMLDivElement;
	todoList.innerHTML = '';

	todos.forEach((todo) => {
		const html = `
            <div class="todo-item d-flex align-items-center p-2 border rounded mb-2 ${
							todo.isCompleted ? 'bg-light' : ''
						}">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="todo1" ${
											todo.isCompleted ? 'checked' : ''
										}>
                    <label class="form-check-label ${
											todo.isCompleted ? 'text-decoration-line-through' : ''
										}" for="todo1">
                        ${todo.description}
                    </label>
                </div>
                <button class="btn btn-link text-danger ms-auto js-delete-todo-button" data-id="${todo.id}">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;

		todoList.insertAdjacentHTML('beforeend', html);
	});
};
