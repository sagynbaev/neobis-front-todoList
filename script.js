const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const taskName = document.getElementById('taskName').value;
  const category = document.querySelector('input[name="category"]:checked').value;
  
  const taskItem = document.createElement('li');
  taskItem.textContent = taskName;
  
  if (category === 'business') {
    taskItem.classList.add('business');
  } else if (category === 'personal') {
    taskItem.classList.add('personal');
  }
  
  taskList.appendChild(taskItem);
  
  taskForm.reset();
});
