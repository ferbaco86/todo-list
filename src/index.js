import renders from './renders';
import projects from './projects';
import todos from './todos';
import './style.css';

const counter = 0;

const btnAddProject = document.getElementById('btn-add-project');
const btnShowForm = document.getElementById('btn-show-form');
const btnAddTodo = document.getElementById('btn-add-todo');

const projectContainer = document.getElementById('project-container');

// Check if localStorage has information stored and render it on the page if it's true.
const validation = (inputTitle) => {
  const alertMessageDiv = document.getElementById('alertMessage');
  let valid;
  if (inputTitle.validity.valueMissing) {
    alertMessageDiv.classList.remove('is-hidden');
    valid = false;
  } else {
    alertMessageDiv.classList.add('is-hidden');
    valid = true;
  }
  return valid;
};

if (localStorage.length !== 0) {
  const storedProjects = JSON.parse(localStorage.getItem('projectList'));

  Object.entries(storedProjects).forEach(([key, value]) => {
    if (key === 'currentProjectId' || key === 'list') { return; }
    const newProject = projects.project(value.projectTitle, key);
    projects.projectList[key] = {
      projectTitle: value.projectTitle,
      arrayOfToDos: value.arrayOfToDos,
    };
    projects.projectList.list.push(newProject);
    value.arrayOfToDos.forEach((toDo) => {
      const newTodo = todos.todo(toDo[0], toDo[1], toDo[2], toDo[3], toDo[4]);
      newProject.appendTodo(newTodo);
    });
    renders.renderProjectsBtns(value.projectTitle, key,
      projectContainer, projects.projectList, counter);
  });

  renders.retrieveTodos(projects.projectList.getCurrent());
}

// Check if the there is no project created, create a Default one

if (projects.projectList.list.length === 0) {
  projects.createProject('Default', 0);
  renders.renderProjectsBtns('Default', 0, projectContainer, projects.projectList, counter);
}


// Click event listeners for each of the buttons in the browser:

// Listener for the click event of the button we use to create a project
btnAddProject.addEventListener('click', () => {
  const titleInput = document.getElementById('project-title');
  if (validation(titleInput) === true) {
    const projectTitleInput = document.getElementById('project-title').value;
    projects.createProject(projectTitleInput, counter);
    renders.renderProjectsBtns(projectTitleInput, counter,
    projectContainer, projects.projectList, counter);
  }

});


// This event listener is attached to the container of the projects buttons
projectContainer.addEventListener('click', (e) => {
  const selTarget = e.target;


  if (selTarget.nodeName === 'BUTTON') {
    projects.projectList.currentProjectId = selTarget.getAttribute('id');

    todos.clearTodoContainer();

    renders.retrieveTodos(projects.projectList.getCurrent());

    const buttonList = document.querySelectorAll('.project-btn');
    buttonList.forEach((button) => {
      if (button === selTarget && !button.classList.contains('active')) {
        return button.classList.add('active');
      }
      return button.classList.remove('active');
    });
  }
});


// This is a simple eventListener to toggle the form between hidden and visible,
// and changing the button text accordingly
btnShowForm.addEventListener('click', (e) => {
  const btnTarget = e.target;
  const form = document.querySelector('.form');
  form.classList.toggle('is-hidden');
  if (btnTarget.innerHTML === "Click Here to add To-Do's") {
    btnTarget.innerHTML = 'Hide Form';
  } else {
    btnTarget.innerHTML = "Click Here to add To-Do's";
  }
});

// This click event listener acts on the add to-do button in the form
btnAddTodo.addEventListener('click', () => {
  const projectTodo = projects.projectList.getCurrent();

  const todoTitle = document.getElementById('to-do-title').value;
  const todoDescription = document.getElementById('to-do-description').value;
  const todoDueDate = document.getElementById('to-do-date').value;
  const todoPriority = document.getElementById('priority').value;
  const todoNotes = document.getElementById('to-do-notes').value;

  const newTodo = todos.todo(todoTitle, todoDescription, todoDueDate, todoPriority, todoNotes);
  projectTodo.appendTodo(newTodo);
  projects.projectList[projects.projectList.currentProjectId].arrayOfToDos.push(newTodo.getAll());
  renders.renderTodos(newTodo.getTitle(), newTodo.getDueDate(),
    newTodo.getDescription(), newTodo.getPriority(), newTodo.getNotes(), projectTodo, newTodo);
  localStorage.setItem('projectList', JSON.stringify(projects.projectList));
});