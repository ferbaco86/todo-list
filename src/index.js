import domManipulation from './helpers';
import './style.css';

// counter for the id of the project (REMEMBER TO REFACTOR THIS LATER)
let counter = 0;

// Object with the list of the projects, the current id of the selected project
// and a function to retrieve the current project
const projectList = {
  list: [],
  currentProjectId: null,
  getCurrent() {
    return this.list[this.currentProjectId];
  },
};

// Factory function for creating a project.
const project = (title, id) => {
  const todoArr = []; // Array containing all the to-do's of a single project.
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

// Factory function for creating to-do's objects
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

// variables containing the buttons obtained from the DOM which will have an eventListener appended
const btnAddProject = document.getElementById('btn-add-project');
const btnShowForm = document.getElementById('btn-show-form');
const btnAddTodo = document.getElementById('btn-add-todo');

// variable containing the DIV element acting as a parent for the buttons to select each project
const projectContainer = document.getElementById('project-container');

// function to remove the to-do's cards from the to-do section when changing projects
const clearTodoContainer = () => {
  const todoSection = document.getElementById('todo-section'); // Here we get the DOM element that's the parent of the cards container
  const cardsContainer = document.querySelector('.cards-container'); // Here we obtain the container of the cards that needs to be removed
  cardsContainer.remove(); // The container gets removed

  // After the container gets removed, we create it again,
  // so we can render the cards inside of the new project selected
  domManipulation.createHtmlElement({ tag: 'div', parentElement: todoSection, arrayClassNames: ['cards-container'] });
};

// function to render the To-Do's cards in the browser.
// It receives as parameters each one of the todo's properties
// we get from calling the getters of the todo factory function

const renderTodos = (todoTitle, todoDueDate, todoDescription, todoPriority, todoNotes, project, todo) => {
  // Here we get the DIV acting as a container for the cards to be created
  const cardContainer = document.querySelector('.cards-container');
  const toDoArray = project.getTodo();
  const toDoIndex = toDoArray.indexOf(todo);
  // Here we create each HTML element that's going to be composing a single todo-card:

  // First the card itself
  const cardColumn = domManipulation.createHtmlElement({ tag: 'div', parentElement: cardContainer, arrayClassNames: ['card', 'column', 'is-3'] });
  cardColumn.setAttribute('data-index', toDoIndex);
  // Then the card Header and the card's title that's inside this header
  const cardHeader = domManipulation.createHtmlElement({ tag: 'header', parentElement: cardColumn, arrayClassNames: ['card-header'] });
  const cardTitle = domManipulation.createHtmlElement({
    tag: 'h5', parentElement: cardHeader, arrayClassNames: ['card-header-title'], text: todoTitle,
  });

  // Switch statement to establish the color of the card's title header according to it's priority
  switch (todoPriority) {
    case 'High':
      cardTitle.classList.add('priority-high');
      break;

    case 'Mid':
      cardTitle.classList.add('priority-mid');
      break;

    case 'Low':
      cardTitle.classList.add('priority-low');
      break;

    default:
      break;
  }

  // Now we create the mid section of the card with the content:

  // First the containers of the content
  const cardContent = domManipulation.createHtmlElement({ tag: 'div', parentElement: cardColumn, arrayClassNames: ['card-content'] });
  const content = domManipulation.createHtmlElement({ tag: 'div', parentElement: cardContent, arrayClassNames: ['content'] });
  const detailsContent = domManipulation.createHtmlElement({ tag: 'div', parentElement: content, arrayClassNames: ['is-hidden'] });

  // Then a label and a the info for each of the properties of the to-do's

  // The Due date label and info
  domManipulation.createHtmlElement({
    tag: 'label', parentElement: content, arrayClassNames: ['label'], text: 'Due Date',
  });
  domManipulation.createHtmlElement({
    tag: 'small', parentElement: content, text: todoDueDate,
  });

  // The Description label and info
  domManipulation.createHtmlElement({
    tag: 'label', parentElement: detailsContent, arrayClassNames: ['label'], text: 'Description',
  });
  domManipulation.createHtmlElement({
    tag: 'small', parentElement: detailsContent, text: todoDescription,
  });

  // And the Notes label and info
  domManipulation.createHtmlElement({
    tag: 'label', parentElement: detailsContent, arrayClassNames: ['label'], text: 'Notes',
  });
  domManipulation.createHtmlElement({
    tag: 'small', parentElement: detailsContent, text: todoNotes,
  });

  // And finally we create the card footer with an HTML element(footer item)
  // for each action we can perform on the To-Do's
  const cardFooter = domManipulation.createHtmlElement({ tag: 'footer', parentElement: cardColumn, arrayClassNames: ['card-footer'] });
  const details = domManipulation.createHtmlElement({
    tag: 'div', parentElement: cardFooter, arrayClassNames: ['card-footer-item'], text: '<i class="fas fa-info-circle"></i>',
  });
  details.addEventListener('click', () => {
    detailsContent.classList.toggle('is-hidden');
  });
  domManipulation.createHtmlElement({
    tag: 'div', parentElement: cardFooter, arrayClassNames: ['card-footer-item'], text: '<i class="fas fa-edit"></i>',
  });

  domManipulation.createHtmlElement({
    tag: 'div', parentElement: cardFooter, arrayClassNames: ['card-footer-item'], text: '<i class="fas fa-trash"></i>',
  });
};

// Click event listeners for each of the buttons in the browser:

// Listener for the click event of the button we use to create a project
btnAddProject.addEventListener('click', () => {
  // We get the value of the text input where we insert the new project title
  const projectTitleInput = document.getElementById('project-title').value;

  // Here we create a new project object using the project factory function.
  // We pass the projectTitleInput as the title parameter and the counter defined in line 5 as id
  const newProject = project(projectTitleInput, counter);

  // Here we add the project we just created
  // to the array inside our projectList object defined on line 9
  projectList.list.push(newProject);

  // Here we store the title of the project we just created inside the projectTitle variable
  const projectTitle = newProject.getTitle();

  // Now we create the button, with the project title as the text,
  // that's going to allow the user to select the project just created
  const btnProject = domManipulation.createHtmlElement({
    tag: 'button', parentElement: projectContainer, arrayClassNames: ['button', 'project-btn'], text: projectTitle,
  });

  // Here we select all the buttons that allows the user to select the project
  const buttonList = document.querySelectorAll('.project-btn');

  // And we iterate over each one of them to set them as inactive if they are active
  buttonList.forEach(element => {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    }
  });

  // Here we add to the button element the id attribute of the project being created
  btnProject.setAttribute('id', counter);

  // Here we add the id of the project being created as the current id of the selected project
  projectList.currentProjectId = counter;

  // And mark the project being created as active
  btnProject.classList.add('active');

  // Finally we clean the To-do's container in the browser
  // of any todo's cards when we create a new project
  clearTodoContainer();
  counter += 1;
});


// This event listener is attached to the container of the projects buttons
projectContainer.addEventListener('click', (e) => {
  // First we get the target of the click
  const selTarget = e.target;


  if (selTarget.nodeName === 'BUTTON') {
    // if the target is a button we set the current id of the project in the projectList object
  // with the attribute id we obtain of the button the user clicks
    projectList.currentProjectId = selTarget.getAttribute('id');

    // We get the current project selected,
    // and obtain the array with the to-do's of the selected project
    const currentProject = projectList.getCurrent();
    const currentTodos = currentProject.getTodo();

    // Now we remove the todos cards form the browser
    clearTodoContainer();

    // And iterate over each one of the to-do's obtained in the currentTodos array,
    // and render the cards with the info of these todo's
    currentTodos.forEach(todo => {
      const title = todo.getTitle();
      const dueDate = todo.getDueDate();
      const description = todo.getDescription();
      const priority = todo.getPriority();
      const notes = todo.getNotes();

      renderTodos(title, dueDate, description, priority, notes, currentProject, todo);
    });

    // And finally here we add the outline to the button that's being clicked
    // while removing it from the inactive ones
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
  // First we get the current project from the projectList
  const projectTodo = projectList.getCurrent();

  // Now we get each one of the information input from the user
  const todoTitle = document.getElementById('to-do-title').value;
  const todoDescription = document.getElementById('to-do-description').value;
  const todoDueDate = document.getElementById('to-do-date').value;
  const todoPriority = document.getElementById('priority').value;
  const todoNotes = document.getElementById('to-do-notes').value;

  // Here we create a new To-Do using the factory function todo,
  // and passing the values obtained from the input as paramaters
  const newTodo = todo(todoTitle, todoDescription, todoDueDate, todoPriority, todoNotes);
  projectTodo.appendTodo(newTodo);
  // And we render the recently created to-do in an card in the browser
  renderTodos(newTodo.getTitle(), newTodo.getDueDate(),
    newTodo.getDescription(), newTodo.getPriority(), newTodo.getNotes(), projectTodo, newTodo);

  // Finally we append the created to-do to the current project

});
