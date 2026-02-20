document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('add-task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    const getTasks = () => {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    };

    // Save tasks to localStorage
    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    let tasks = getTasks();

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                tasks[index].completed = checkbox.checked;
                saveTasks(tasks);
                renderTasks();
            });

            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task.text;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks(tasks);
                renderTasks();
            });

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskText);
            taskItem.appendChild(deleteButton);

            taskList.appendChild(taskItem);
        });
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            saveTasks(tasks);
            renderTasks();
            taskInput.value = '';
            taskInput.focus();
        }
    });

    renderTasks();
});
