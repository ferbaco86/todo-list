import domManipulation from './helpers';
import './style.css';

let counter = 0;
const projectList = {
  list: [],
  currentProjectId: null,
  getCurrent() {
    return this.list[this.currentProjectId];
  },
};

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

// const newProject = project('', '');
const newTodo = todo('', '', '', '', '');

const btnAddProject = document.getElementById('btn-add-project');
const btnAddTodo = document.getElementById('btn-add-todo');
const projectContainer = document.getElementById('project-container');

btnAddProject.addEventListener('click', () => {
  const projectTitleInput = document.getElementById('project-title').value;
  const newProject = project(projectTitleInput, counter);
  projectList.list.push(newProject);
  // newProject.setTitle(projectTitleInput);
  // newProject.setId(counter);

  const projectTitle = newProject.getTitle();

  const btnProject = domManipulation.createHtmlElement({
    tag: 'button', parentElement: projectContainer, arrayClassNames: ['button', 'project-btn'], text: projectTitle,
  });
  const buttonList = document.querySelectorAll('.project-btn');
  buttonList.forEach(element => {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    }
  });
  btnProject.setAttribute('id', counter);
  projectList.currentProjectId = counter;
  btnProject.classList.add('active');
  counter += 1;
});

projectContainer.addEventListener('click', (e) => {
  const selTarget = e.target;
  if (selTarget.nodeName === 'BUTTON') {
    projectList.currentProjectId = selTarget.getAttribute('id');
    const buttonList = document.querySelectorAll('.project-btn');
    buttonList.forEach((button) => {
      if (button === selTarget && !button.classList.contains('active')) {
        return button.classList.add('active');
      }
      return button.classList.remove('active');
    });
  }
});

btnAddTodo.addEventListener('click', () => {
  const projectTodo = projectList.getCurrent();
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

  projectTodo.appendTodo(newTodo);

  console.log(projectTodo.getTitle());
  console.log(projectTodo.getTodo());
  // console.log(projectList[0].getTodo());
});
