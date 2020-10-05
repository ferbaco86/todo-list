
const domManipulation = (() => {
  const addClasses = (element, arrayClassNames) => {
    arrayClassNames.forEach(className => {
      element.classList.add(className);
    });
  };

  const removeClasses = (element, arrayClassNames) => {
    arrayClassNames.forEach(className => {
      element.classList.remove(className);
    });
  };

  const toggleClass = (element, classToggle) => {
    element.classList.toggle(classToggle);
  };

  const addId = (element, newId) => {
    element.id = newId;
  };

  const setRequired = (arrayInputs) => {
    arrayInputs.forEach((input) => {
      input.setAttribute('required', '');
    });
  };

  const setInnerHtml = (element, text) => {
    element.innerHTML = text;
  };

  const setHtmlAttributes = (element, attribute, value) => {
    element.setAttribute(attribute, value);
  };

  const setProjectActive = (target, projects, todos, renders) => {
    if (target.nodeName === 'BUTTON') {
      projects.projectList.currentProjectId = target.getAttribute('id');

      todos.clearTodoContainer();

      renders.retrieveTodos(projects.projectList.getCurrent());

      const buttonList = document.querySelectorAll('.project-btn');
      buttonList.forEach((button) => {
        if (button === target && !button.classList.contains('active')) {
          return button.classList.add('active');
        }
        return button.classList.remove('active');
      });
    }
  };

  const showAndHideForm = (form, btnTarget) => {
    form.classList.toggle('is-hidden');
    if (btnTarget.innerHTML === "Click Here to add To-Do's") {
      btnTarget.innerHTML = 'Hide Form';
    } else {
      btnTarget.innerHTML = "Click Here to add To-Do's";
    }
  };

  const getHtmlElement = ({ byId = '', byQueryClass = '', byQueryAllClass = '' }) => {
    let element;
    if (byId !== '') {
      element = document.getElementById(byId);
    }
    if (byQueryClass !== '') {
      element = document.querySelector(byQueryClass);
    }
    if (byQueryAllClass !== '') {
      element = document.querySelectorAll(byQueryAllClass);
    }
    return element;
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

  const projectValidation = (inputTitle) => {
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

  const createHtmlElement = ({
    tag, parentElement, arrayClassNames = [], newId = '', text = '',
  }) => {
    const newElement = document.createElement(tag);

    if (arrayClassNames !== []) {
      addClasses(newElement, arrayClassNames);
    }
    if (newId !== '') {
      addId(newElement, newId);
    }
    if (text !== '') {
      newElement.innerHTML = text;
    }
    parentElement.appendChild(newElement);
    return newElement;
  };

  return {
    createHtmlElement,
    getHtmlElement,
    setHtmlAttributes,
    setRequired,
    todoValidation,
    projectValidation,
    addClasses,
    removeClasses,
    showAndHideForm,
    setInnerHtml,
    toggleClass,
    setProjectActive,
  };
})();


export default domManipulation;