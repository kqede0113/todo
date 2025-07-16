const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const priorityInput = document.getElementById('priority-input');
const todoList = document.getElementById('todo-list');

let todos = [];

// localStorageから復元
function loadTodos() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    todos = JSON.parse(saved);
  }
}

// localStorageへ保存
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  // 優先度:高→中→低でソートして表示
  todoList.innerHTML = '';
  const sorted = todos.slice().sort((a, b) => b.priority - a.priority);
  for (const todo of sorted) {
    const li = document.createElement('li');
    // 優先度ラベル
    let prioLabel = '';
    if (todo.priority === 3) prioLabel = '高';
    else if (todo.priority === 2) prioLabel = '中';
    else prioLabel = '低';

    li.textContent = `${todo.text} [優先度: ${prioLabel}]`;

    // クラスで色分け
    if (todo.priority === 3) li.classList.add('priority-high');
    else if (todo.priority === 2) li.classList.add('priority-medium');
    else li.classList.add('priority-low');

    // 削除ボタン
    const delBtn = document.createElement('button');
    delBtn.textContent = '削除';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => {
      todos = todos.filter(t => t !== todo);
      renderTodos();
    };

    li.appendChild(delBtn);
    todoList.appendChild(li);
  }
  saveTodos(); // 表示したら保存
}

addBtn.addEventListener('click', () => {
  const todoText = todoInput.value.trim();
  const priority = parseInt(priorityInput.value, 10);
  if (!todoText) return;
  todos.push({ text: todoText, priority });
  renderTodos();
  todoInput.value = '';
  todoInput.focus();
});

todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

// 初回ロード
loadTodos();
renderTodos();
