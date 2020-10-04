import domManipulation from './helpers';


const todos = (() => {
  const todo = (title, description, dueDate, priority, notes) => {
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;
    const getAll = () => [title, description, dueDate, priority, notes];

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
      getAll,
      setTitle,
      setDescription,
      setDueDate,
      setPriority,
      setNotes,
    };
  };

  const clearTodoContainer = () => {
    const todoSection = document.getElementById('todo-section');
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.remove();

    domManipulation.createHtmlElement({ tag: 'div', parentElement: todoSection, arrayClassNames: ['cards-container'] });
  };

  const setPriorityColor = (newToDoPriority, cardTitle, priorityClass = null) => {
    switch (newToDoPriority) {
      case 'High':
        if (priorityClass !== null) {
          cardTitle.classList.remove(priorityClass[1]);
        }
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
  };

  const todoValidation = (inputTitle, inputDescription, inputDueDate, inputNotes, event) => {
    let alertMessageDiv;
    if (event.currentTarget.getAttribute('id') === 'btn-add-todo') {
      alertMessageDiv = document.getElementById('todoAlertMessage');
    } else {
      alertMessageDiv = document.getElementById('updateAlert');
    }
    let valid;
    if (inputTitle.validity.valueMissing
      || inputDescription.validity.valueMissing || inputDueDate.validity.valueMissing
      || inputNotes.validity.valueMissing || inputNotes.validity.valueMissing) {
      alertMessageDiv.classList.remove('is-hidden');
      valid = false;
    } else {
      alertMessageDiv.classList.add('is-hidden');
      valid = true;
    }
    return valid;
  };
  return {
    todo,
    clearTodoContainer,
    setPriorityColor,
    todoValidation,
  };
})();

export default todos;