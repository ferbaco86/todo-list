import renders from './renders';
import projects from './projects';
import todos from './todos';
import './style.css';
import domManipulation from './helpers';

let counter = 0;

const btnAddProject = domManipulation.getHtmlElement({ byId: 'btn-add-project' });
const btnShowForm = domManipulation.getHtmlElement({ byId: 'btn-show-form' });
const btnAddTodo = domManipulation.getHtmlElement({ byId: 'btn-add-todo' });

const projectContainer = domManipulation.getHtmlElement({ byId: 'project-container' });

// if there's info on localStorage, load it

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
      projectContainer);
  });


  counter = storedProjects.list.length - 1;
  projects.projectList.currentProjectId = counter;

  renders.retrieveTodos(projects.projectList.getCurrent());
  counter += 1;
}

// Check if the there is no project created, create a Default one

if (projects.projectList.list.length === 0) {
  projects.createProject('Default', 0);
  renders.renderProjectsBtns('Default', 0, projectContainer);
  projects.projectList.currentProjectId = counter;
  localStorage.setItem('projectList', JSON.stringify(projects.projectList));

  counter += 1;
}


// Click event listeners for each of the buttons in the browser:


// Listener for the click event of the button we use to create a project
btnAddProject.addEventListener('click', () => {
  const titleInput = document.getElementById('project-title');
  if (domManipulation.projectValidation(titleInput) === true) {
    const projectTitleInput = domManipulation.getHtmlElement({ byId: 'project-title' }).value;
    projects.createProject(projectTitleInput, counter);
    renders.renderProjectsBtns(projectTitleInput, counter,
      projectContainer);
    projects.projectList.currentProjectId = counter;
    localStorage.setItem('projectList', JSON.stringify(projects.projectList));

    counter += 1;
  }
});


// This event listener is attached to the container of the projects buttons
projectContainer.addEventListener('click', (e) => {
  const selTarget = e.target;

  domManipulation.setProjectActive(selTarget, projects, todos, renders);
});


// This is a simple eventListener to toggle the form between hidden and visible,
// and changing the button text accordingly
btnShowForm.addEventListener('click', (e) => {
  const btnTarget = e.target;
  const form = domManipulation.getHtmlElement({ byQueryClass: '.form' });
  domManipulation.showAndHideForm(form, btnTarget);
});

// This click event listener acts on the add to-do button in the form
btnAddTodo.addEventListener('click', (e) => {
  const projectTodo = projects.projectList.getCurrent();
  const todoTitleInput = domManipulation.getHtmlElement({ byId: 'to-do-title' });
  const todoDescriptionInput = domManipulation.getHtmlElement({ byId: 'to-do-description' });
  const todoDueDateInput = domManipulation.getHtmlElement({ byId: 'to-do-date' });
  const todoNotesInput = domManipulation.getHtmlElement({ byId: 'to-do-notes' });

  if (domManipulation.todoValidation(todoTitleInput, todoDescriptionInput,
    todoDueDateInput, todoNotesInput, e) === true) {
    const todoTitle = todoTitleInput.value;
    const todoDescription = todoDescriptionInput.value;
    const todoDueDate = todoDueDateInput.value;
    const todoPriority = domManipulation.getHtmlElement({ byId: 'priority' }).value;
    const todoNotes = todoNotesInput.value;
    const newTodo = todos.todo(todoTitle, todoDescription, todoDueDate, todoPriority, todoNotes);
    projectTodo.appendTodo(newTodo);
    projects.projectList[projects.projectList.currentProjectId].arrayOfToDos.push(newTodo.getAll());
    renders.renderTodos(newTodo.getTitle(), newTodo.getDueDate(),
      newTodo.getDescription(), newTodo.getPriority(), newTodo.getNotes(), projectTodo, newTodo);
    localStorage.setItem('projectList', JSON.stringify(projects.projectList));
  }
});
