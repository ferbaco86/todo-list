import domManipulation from './helpers';
import './style.css';

let counter = 0;
const projectList = [];

const project = (title, id) => {
  const todoArr = [];
  const todosList = {};
  const getTitle = () => title;
  const getId = () => id;

  const setTitle = (newTitle) => {
    title = newTitle;
  };

  const setId = (newId) => {
    id = newId;
  };

  const getTodo = () => todosList;

  const appendTodo = (todo) => {
    todoArr.push(todo);
    todosList[id] = todoArr;
  };

  return {
    getTitle,
    getId,
    setTitle,
    setId,
    getTodo,
    appendTodo,
  };
};

const todo = (title, description, dueDate, priority, notes) => {
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getNotes = () => notes;

  const setTitle = (todoTitle) => {
    title = todoTitle;
  };
  const setDescription = (todoDescription) => {
    description = todoDescription;
  };
  const setDueDate = (todoDueDate) => {
    dueDate = todoDueDate;
  };
  const setPriority = (todoPriority) => {
    priority = todoPriority;
  };
  const setNotes = (todoNotes) => {
    notes = todoNotes;
  };
  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getNotes,
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    setNotes,
  };
};

const newProject = project('', '');
const newTodo = todo('', '', '', '', '');

const btnAddProject = document.getElementById('btn-add-project');
const btnAddTodo = document.getElementById('btn-add-todo');

btnAddProject.addEventListener('click', () => {
  projectList.push(newProject);
  const projectContainer = document.getElementById('project-container');
  const projectTitleInput = document.getElementById('project-title').value;
  newProject.setTitle(projectTitleInput);
  newProject.setId(counter);

  const projectTitle = newProject.getTitle();

  const btnProject = domManipulation.createHtmlElement({
    tag: 'button', parentElement: projectContainer, arrayClassNames: ['button', 'project-btn'], text: projectTitle,
  });

  btnProject.setAttribute('id', counter);
  counter += 1;
});

btnAddTodo.addEventListener('click', () => {
  const todoTitle = document.getElementById('to-do-title').value;
  const todoDescription = document.getElementById('to-do-description').value;
  const todoDueDate = document.getElementById('to-do-date').value;
  const todoPriority = document.getElementById('priority').value;
  const todoNotes = document.getElementById('to-do-notes').value;

  // let newTodo = todoList(todoTitle, todoDescription, todoDueDate, todoPriority, todoNotes);
  newTodo.setTitle(todoTitle);
  newTodo.setDescription(todoDescription);
  newTodo.setDueDate(todoDueDate);
  newTodo.setPriority(todoPriority);
  newTodo.setNotes(todoNotes);

  newProject.appendTodo(newTodo);

  console.log(newProject.getTitle());
  console.log(newProject.getTodo());
  console.log(projectList[0].getTodo());
});
