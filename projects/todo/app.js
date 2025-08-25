// Simple To‑Do with localStorage + filter + search
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const form = $('#todo-form');
const input = $('#todo-input');
const list = $('#todo-list');
const search = $('#search');
const filter = $('#filter');
const clearCompletedBtn = $('#clear-completed');
const leftCount = $('#left-count');

let todos = JSON.parse(localStorage.getItem('todos-v1') || '[]');

function save() {
  localStorage.setItem('todos-v1', JSON.stringify(todos));
}

function render() {
  const term = search.value.trim().toLowerCase();
  const filt = filter.value;

  list.innerHTML = '';

  const filtered = todos.filter(t => {
    const matchesTerm = t.title.toLowerCase().includes(term);
    const matchesFilter =
      filt === 'all' ? true :
      filt === 'active' ? !t.completed :
      t.completed;
    return matchesTerm && matchesFilter;
  });

  filtered.forEach(t => {
    const li = document.createElement('li');
    li.className = `todo ${t.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <input type="checkbox" ${t.completed ? 'checked' : ''} aria-label="toggle">
      <div class="title" contenteditable="true" spellcheck="false">${t.title}</div>
      <div class="actions">
        <button class="done" title="Toggle complete">✓</button>
        <button class="remove" title="Delete">✕</button>
      </div>
    `;

    // Toggle via checkbox or ✓
    const checkbox = li.querySelector('input[type="checkbox"]');
    const doneBtn = li.querySelector('.done');
    const removeBtn = li.querySelector('.remove');
    const titleEl = li.querySelector('.title');

    const toggle = () => {
      t.completed = !t.completed;
      save(); render();
    };

    checkbox.addEventListener('change', toggle);
    doneBtn.addEventListener('click', toggle);

    removeBtn.addEventListener('click', () => {
      todos = todos.filter(x => x.id !== t.id);
      save(); render();
    });

    // Inline edit
    titleEl.addEventListener('blur', () => {
      const newTitle = titleEl.textContent.trim();
      if (newTitle) {
        t.title = newTitle;
        save();
      } else {
        // if emptied, remove
        todos = todos.filter(x => x.id !== t.id);
        save(); render();
      }
    });

    list.appendChild(li);
  });

  leftCount.textContent = todos.filter(t => !t.completed).length;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  todos.unshift({ id: crypto.randomUUID(), title, completed: false });
  input.value = '';
  save(); render();
});

search.addEventListener('input', render);
filter.addEventListener('change', render);

clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter(t => !t.completed);
  save(); render();
});

// Initial render
render();
