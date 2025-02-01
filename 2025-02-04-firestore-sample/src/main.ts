// Bootstrap CSSとJSをインポート
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { TodoService } from './TodoService';

document.addEventListener('DOMContentLoaded', async () => {
	const todoService = new TodoService();
	await todoService.setRealtimeUpdate();
});
