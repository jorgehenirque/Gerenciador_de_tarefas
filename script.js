  document.addEventListener('DOMContentLoaded', () => {
            // DOM Elements
            const taskForm = document.getElementById('add-task-form');
            const taskInput = document.getElementById('task-input');
            const taskList = document.getElementById('task-list');
            const editModal = document.getElementById('edit-modal');
            const editInput = document.getElementById('edit-input');
            const saveEditBtn = document.getElementById('save-edit-btn');
            const cancelEditBtn = document.getElementById('cancel-edit-btn');

            // State
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            let currentTaskId = null;

            // --- Main Render Function ---
            const renderTasks = () => {
                taskList.innerHTML = ''; // Clear current list
                
                if (tasks.length === 0) {
                    taskList.innerHTML = '<p style="text-align: center; color: var(--text-gray);">Nenhuma tarefa adicionada ainda.</p>';
                    return;
                }

                tasks.forEach(task => {
                    const li = document.createElement('li');
                    li.className = `task-item ${task.completed ? 'completed' : ''}`;
                    li.dataset.id = task.id;

                    li.innerHTML = `
                        <div class="task-content">
                            <span class="task-text">${task.text}</span>
                        </div>
                        <div class="task-actions">
                            <button class="action-btn btn-complete" title="${task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}">
                                <i class="fas ${task.completed ? 'fa-xmark' : 'fa-check'}"></i>
                            </button>
                            <button class="action-btn btn-edit" title="Editar tarefa">
                                <i class="fas fa-pencil"></i>
                            </button>
                            <button class="action-btn btn-delete" title="Excluir tarefa">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                    taskList.appendChild(li);
                });
            };
            
            // --- Save to Local Storage ---
            const saveTasks = () => {
                localStorage.setItem('tasks', JSON.stringify(tasks));
            };

            // --- Add Task ---
            taskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const taskText = taskInput.value.trim();
                if (taskText) {
                    const newTask = {
                        id: Date.now(),
                        text: taskText,
                        completed: false
                    };
                    tasks.push(newTask);
                    saveTasks();
                    renderTasks();
                    taskInput.value = '';
                    taskInput.focus();
                }
            });

            // --- Handle Task Actions (Complete, Edit, Delete) using Event Delegation ---
            taskList.addEventListener('click', (e) => {
                const target = e.target.closest('.action-btn');
                if (!target) return;

                const parentLi = target.closest('.task-item');
                const taskId = Number(parentLi.dataset.id);

                // Delete Task
                if (target.classList.contains('btn-delete')) {
                    tasks = tasks.filter(task => task.id !== taskId);
                    saveTasks();
                    renderTasks();
                }
                
                // Complete/Uncomplete Task
                if (target.classList.contains('btn-complete')) {
                    const task = tasks.find(t => t.id === taskId);
                    if (task) {
                        task.completed = !task.completed;
                        saveTasks();
                        renderTasks();
                    }
                }

                // Edit Task
                if (target.classList.contains('btn-edit')) {
                    const task = tasks.find(t => t.id === taskId);
                    if (task) {
                        currentTaskId = taskId;
                        editInput.value = task.text;
                        editModal.classList.add('active');
                        editInput.focus();
                    }
                }
            });
            
            // --- Edit Modal Logic ---
            const closeEditModal = () => {
                editModal.classList.remove('active');
                currentTaskId = null;
                editInput.value = '';
            };

            saveEditBtn.addEventListener('click', () => {
                const newText = editInput.value.trim();
                if (newText && currentTaskId !== null) {
                    const task = tasks.find(t => t.id === currentTaskId);
                    if (task) {
                        task.text = newText;
                        saveTasks();
                        renderTasks();
                    }
                }
                closeEditModal();
            });

            cancelEditBtn.addEventListener('click', closeEditModal);

            // Close modal on overlay click
            editModal.addEventListener('click', (e) => {
                if(e.target === editModal) {
                    closeEditModal();
                }
            });

            // Initial render on page load
            renderTasks();
        });