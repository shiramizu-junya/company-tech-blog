import {
	addDoc,
	COLLECTION_NAME,
	db,
	dbRef,
	deleteDoc,
	doc,
	onSnapshot,
	Timestamp,
	updateDoc,
} from './firebaseSdk';
import { todoElement } from './html/todoElement';

export type TodoType = {
	id: string;
	description: string;
	isCompleted: boolean;
};

export class TodoService {
	private todos: TodoType[] = [];

	constructor() {
		// 作成イベントは1回だけ設定
		this.initializeCreateTodoHandler();
	}

	private initializeCreateTodoHandler() {
		const createTodoButton = document.querySelector('.js-create-todo-button') as HTMLButtonElement;
		const todoInput = document.querySelector('.js-todo-input') as HTMLInputElement;

		createTodoButton.onclick = async () => {
			const todo = todoInput.value;
			if (!todo) return;

			await addDoc(dbRef, {
				description: todo,
				isCompleted: false,
				createdAt: Timestamp.now(),
				updatedAt: Timestamp.now(),
			});

			todoInput.value = '';
			alert('Todoの追加に成功しました');
		};
	}

	/**  レンダリングとイベントの設定 */
	renderTodos() {
		const todoList = document.querySelector('.js-todo-list') as HTMLDivElement;
		todoList.innerHTML = '';

		this.todos.forEach((todo) => {
			const todoHtml = todoElement(todo);
			todoList.insertAdjacentHTML('beforeend', todoHtml);
		});

		this.setTodoEventHandlers();
	}

	/** イベントセット */
	private setTodoEventHandlers() {
		// 削除イベントの設定
		const deleteButtons = document.querySelectorAll('.js-delete-todo-button');
		deleteButtons.forEach((button) => {
			const btn = button as HTMLButtonElement;
			btn.onclick = async (e) => {
				const target = e.currentTarget as HTMLElement;
				const id = target.dataset.id;
				if (!id) return;
				await deleteDoc(doc(db, COLLECTION_NAME, id));
				alert('Todoの削除に成功しました');
			};
		});

		// 更新イベントの設定
		const todoCheckboxes = document.querySelectorAll('.js-complete-checkbox');
		todoCheckboxes.forEach((todoCheckbox) => {
			const checkbox = todoCheckbox as HTMLInputElement;
			checkbox.onchange = async (e) => {
				const target = e.currentTarget as HTMLInputElement;
				const id = target.dataset.id;
				if (!id) return;
				const dbRef = doc(db, COLLECTION_NAME, id);
				await updateDoc(dbRef, {
					isCompleted: target.checked,
					updatedAt: Timestamp.now(),
				});
				alert('Todoの更新に成功しました');
			};
		});
	}

	/** Firestoreのデータ変更に応じて発火するイベントセット */
	setRealtimeUpdate() {
		return new Promise<void>((resolve) => {
			onSnapshot(dbRef, (snapshot) => {
				const updatedTodos = snapshot.docs.map((doc) => ({
					id: doc.id,
					description: doc.data().description,
					isCompleted: doc.data().isCompleted,
				}));
				this.todos = updatedTodos;
				this.renderTodos();
				resolve();
			});
		});
	}
}
