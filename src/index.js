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
  // const todosList = {};
  const getTitle = () => title;
  const getId = () => id;

  const setTitle = (newTitle) => {
    title = newTitle;
  };

  const setId = (newId) => {
    id = newId;
  };

  const getTodo = () => todoArr;

  const appendTodo = (todo) => {
    todoArr.push(todo);
    // todosList[id] = todoArr;
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

const btnAddProject = document.getElementById('btn-add-project');
const btnShowForm = document.getElementById('btn-show-form');
const btnAddTodo = document.getElementById('btn-add-todo');
const projectContainer = document.getElementById('project-container');

const clearTodoContainer = () => {
  const todoSection = document.getElementById('todo-section');
  const cardsContainer = document.querySelector('.cards-container');
  cardsContainer.remove();

  domManipulation.createHtmlElement({ tag: 'div', parentElement: todoSection, arrayClassNames: ['cards-container'] });
};

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
  clearTodoContainer();
  counter += 1;
});

const renderTodos = (todoTitle, todoDueDate) => {
  const cardContainer = document.querySelector('.cards-container');
  const cardColumn = domManipulation.createHtmlElement({ tag: 'div', parentElement: cardContainer, arrayClassNames: ['card', 'column', 'is-3'] });
  const cardHeader = domManipulation.createHtmlElement({ tag: 'header', parentElement: cardColumn, arrayClassNames: ['card-header'] });
  const cardTitle = domManipulation.createHtmlElement({
    tag: 'h5', parentElement: cardHeader, arrayClassNames: ['card-header-title', 'priority-low'], text: todoTitle,
  });

  const cardContent = domManipulation.createHtmlElement({ tag: 'div', parentElement: cardColumn, arrayClassNames: ['card-content'] });
  const content = domManipulation.createHtmlElement({ tag: 'div', parentElement: cardContent, arrayClassNames: ['content'] });
  const dueDateLabel = domManipulation.createHtmlElement({
    tag: 'label', parentElement: content, arrayClassNames: ['label'], text: 'Due Date',
  });
  const dueDateSmall = domManipulation.createHtmlElement({
    tag: 'small', parentElement: content, text: todoDueDate,
  });

  const cardFooter = domManipulation.createHtmlElement({ tag: 'footer', parentElement: cardColumn, arrayClassNames: ['card-footer'] });
  domManipulation.createHtmlElement({
    tag: 'div', parentElement: cardFooter, arrayClassNames: ['card-footer-item'], text: 'Details',
  });

  domManipulation.createHtmlElement({
    tag: 'div', parentElement: cardFooter, arrayClassNames: ['card-footer-item'], text: 'Edit',
  });

  domManipulation.createHtmlElement({
    tag: 'div', parentElement: cardFooter, arrayClassNames: ['card-footer-item'], text: 'Delete',
  });
};

projectContainer.addEventListener('click', (e) => {
  const selTarget = e.target;

  if (selTarget.nodeName === 'BUTTON') {
    projectList.currentProjectId = selTarget.getAttribute('id');
    const currentProject = projectList.getCurrent();
    const currentTodos = currentProject.getTodo();

    clearTodoContainer();
    currentTodos.forEach(todo => {
      const title = todo.getTitle();
      const dueDate = todo.getDueDate();

      renderTodos(title, dueDate);
    });
    const buttonList = document.querySelectorAll('.project-btn');
    buttonList.forEach((button) => {
      if (button === selTarget && !button.classList.contains('active')) {
        return button.classList.add('active');
      }
      return button.classList.remove('active');
    });
  }
});

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

btnAddTodo.addEventListener('click', () => {
  const projectTodo = projectList.getCurrent();
  const todoTitle = document.getElementById('to-do-title').value;
  const todoDescription = document.getElementById('to-do-description').value;
  const todoDueDate = document.getElementById('to-do-date').value;
  const todoPriority = document.getElementById('priority').value;
  const todoNotes = document.getElementById('to-do-notes').value;

  const newTodo = todo(todoTitle, todoDescription, todoDueDate, todoPriority, todoNotes);

  renderTodos(newTodo.getTitle(), newTodo.getDueDate());

  projectTodo.appendTodo(newTodo);
});
