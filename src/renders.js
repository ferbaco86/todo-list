import domManipulation from './helpers';
import todos from './todos';
import projects from './projects';

const renders = (() => {
  let cardHeader;
  let cardTitle;
  let cardColumn;
  let cardContent;
  let content;
  let detailsContent;
  let toDoArray;
  let newToDoPriority;
  let editForm;
  const cardContainer = document.querySelector('.cards-container');

  const createCardHeader = (todoTitle, toDoIndex) => {
    cardColumn = domManipulation.createHtmlElement({ tag: 'div', parentElement: cardContainer, arrayClassNames: ['card', 'column', 'is-3'] });
    cardColumn.setAttribute('data-index', toDoIndex);
    cardHeader = domManipulation.createHtmlElement({ tag: 'header', parentElement: cardColumn, arrayClassNames: ['card-header'] });
    cardTitle = domManipulation.createHtmlElement({
      tag: 'h5', parentElement: cardHeader, arrayClassNames: ['card-header-title'], text: todoTitle,
    });
  };

  const createEditForm = (project, todo, toDoDueDateText, toDoDescriptionText,
    todoNotesText) => {
    // Creation of the edit form
    editForm = domManipulation.createHtmlElement({ tag: 'form', parentElement: cardColumn, arrayClassNames: ['form', 'is-hidden'] });
    domManipulation.createHtmlElement({
      tag: 'label', parentElement: editForm, arrayClassNames: ['label'], text: ' New Title',
    });
    const editInputTitle = domManipulation.createHtmlElement({ tag: 'input', parentElement: editForm, arrayClassNames: ['input', 'my-10'] });
    editInputTitle.setAttribute('type', 'text');
    domManipulation.createHtmlElement({
      tag: 'label', parentElement: editForm, arrayClassNames: ['label'], text: ' New Priority',
    });
    const editInputPrioritySpan = domManipulation.createHtmlElement({ tag: 'span', parentElement: editForm, arrayClassNames: ['select', 'my-10'] });
    const editInputPriority = domManipulation.createHtmlElement({ tag: 'select', parentElement: editInputPrioritySpan });
    domManipulation.createHtmlElement({ tag: 'option', parentElement: editInputPriority, text: 'Low' });
    domManipulation.createHtmlElement({ tag: 'option', parentElement: editInputPriority, text: 'Mid' });
    domManipulation.createHtmlElement({ tag: 'option', parentElement: editInputPriority, text: 'High' });

    domManipulation.createHtmlElement({
      tag: 'label', parentElement: editForm, arrayClassNames: ['label'], text: ' New Due Date',
    });
    const editInputDueDate = domManipulation.createHtmlElement({ tag: 'input', parentElement: editForm, arrayClassNames: ['input', 'my-10'] });
    editInputDueDate.setAttribute('type', 'date');
    domManipulation.createHtmlElement({
      tag: 'label', parentElement: editForm, arrayClassNames: ['label'], text: ' New Description',
    });
    const editInputDescription = domManipulation.createHtmlElement({ tag: 'textarea', parentElement: editForm, arrayClassNames: ['textarea', 'my-10'] });
    editInputDescription.setAttribute('cols', '10');
    editInputDescription.setAttribute('rows', '1');

    domManipulation.createHtmlElement({
      tag: 'label', parentElement: editForm, arrayClassNames: ['label'], text: ' New Notes',
    });

    const editInputNotes = domManipulation.createHtmlElement({ tag: 'textarea', parentElement: editForm, arrayClassNames: ['textarea', 'my-10'] });
    editInputNotes.setAttribute('cols', '10');
    editInputNotes.setAttribute('rows', '1');

    const updateBtn = domManipulation.createHtmlElement({
      tag: 'button', parentElement: editForm, arrayClassNames: ['button', 'is-primary', 'my-10'], text: 'Update',
    });

    updateBtn.setAttribute('type', 'button');
    updateBtn.addEventListener('click', () => {
      const arrayToDos = project.getTodo();
      const storageToDos = projects.projectList[projects.projectList.currentProjectId].arrayOfToDos;
      const indexToDo = arrayToDos.indexOf(todo);
      const updatedTodo = toDoArray[indexToDo];
      const storageTodo = storageToDos[indexToDo];

      updatedTodo.setTitle(editInputTitle.value);
      updatedTodo.setPriority(editInputPriority.value);
      updatedTodo.setDueDate(editInputDueDate.value);
      updatedTodo.setDescription(editInputDescription.value);
      updatedTodo.setNotes(editInputNotes.value);

      storageTodo[0] = editInputTitle.value;
      storageTodo[1] = editInputDescription.value;
      storageTodo[2] = editInputDueDate.value;
      storageTodo[3] = editInputPriority.value;
      storageTodo[4] = editInputNotes.value;


      cardTitle.innerHTML = updatedTodo.getTitle();
      toDoDueDateText.innerHTML = updatedTodo.getDueDate();
      toDoDescriptionText.innerHTML = updatedTodo.getDescription();
      todoNotesText.innerHTML = updatedTodo.getNotes();
      newToDoPriority = updatedTodo.getPriority();
      const priorityClass = createCardHeader.cardTitle.classList;

      todos.setPriorityColor(newToDoPriority, cardTitle, priorityClass);
      cardContent.classList.toggle('is-hidden');
      editForm.classList.toggle('is-hidden');
      createCardHeader.cardHeader.classList.toggle('is-hidden');

      localStorage.setItem('projectList', JSON.stringify(projects.projectList));
    });
  };
  const createCardContainer = (todoDueDate, todoDescription, todoNotes, project, todo) => {
    cardContent = domManipulation.createHtmlElement({ tag: 'div', parentElement: cardColumn, arrayClassNames: ['card-content'] });
    content = domManipulation.createHtmlElement({ tag: 'div', parentElement: cardContent, arrayClassNames: ['content'] });
    detailsContent = domManipulation.createHtmlElement({ tag: 'div', parentElement: content, arrayClassNames: ['is-hidden'] });

    domManipulation.createHtmlElement({
      tag: 'label', parentElement: createCardContainer.content, arrayClassNames: ['label'], text: 'Due Date',
    });
    const toDoDueDateText = domManipulation.createHtmlElement({
      tag: 'small', parentElement: createCardContainer.content, text: todoDueDate,
    });


    domManipulation.createHtmlElement({
      tag: 'label', parentElement: detailsContent, arrayClassNames: ['label'], text: 'Description',
    });
    const toDoDescriptionText = domManipulation.createHtmlElement({
      tag: 'small', parentElement: detailsContent, text: todoDescription,
    });


    domManipulation.createHtmlElement({
      tag: 'label', parentElement: detailsContent, arrayClassNames: ['label'], text: 'Notes',
    });
    const todoNotesText = domManipulation.createHtmlElement({
      tag: 'small', parentElement: detailsContent, text: todoNotes,
    });

    createEditForm(project, todo, toDoDueDateText, toDoDescriptionText, todoNotesText);
  };
  const createCardFooter = (project, todo) => {
    const cardFooter = domManipulation.createHtmlElement({ tag: 'footer', parentElement: cardColumn, arrayClassNames: ['card-footer'] });
    const detailsButton = domManipulation.createHtmlElement({
      tag: 'div', parentElement: cardFooter, arrayClassNames: ['card-footer-item'], text: '<i class="fas fa-info-circle"></i>',
    });
    detailsButton.addEventListener('click', () => {
      detailsContent.classList.toggle('is-hidden');
    });
    const editButton = domManipulation.createHtmlElement({
      tag: 'div', parentElement: cardFooter, arrayClassNames: ['card-footer-item'], text: '<i class="fas fa-edit"></i>',
    });
    editButton.addEventListener('click', () => {
      cardContent.classList.toggle('is-hidden');
      editForm.classList.toggle('is-hidden');
      cardHeader.classList.toggle('is-hidden');
    });


    const deleteButton = domManipulation.createHtmlElement({
      tag: 'div', parentElement: cardFooter, arrayClassNames: ['card-footer-item'], text: '<i class="fas fa-trash"></i>',
    });
    deleteButton.addEventListener('click', () => {
      const arrayToDos = project.getTodo();
      const storageToDos = projects.projectList[projects.projectList.currentProjectId].arrayOfToDos;
      const indexToDo = arrayToDos.indexOf(todo);
      arrayToDos.splice(indexToDo, 1);
      storageToDos.splice(indexToDo, 1);

      localStorage.setItem('projectList', JSON.stringify(projects.projectList));


      cardColumn.remove();
    });
  };

  const renderTodos = (todoTitle, todoDueDate, todoDescription,
    todoPriority, todoNotes, project, todo) => {
    toDoArray = project.getTodo();
    const toDoIndex = toDoArray.indexOf(todo);
    newToDoPriority = todoPriority;

    createCardHeader(todoTitle, toDoIndex);

    todos.setPriorityColor(newToDoPriority, cardTitle);

    createCardContainer(todoDueDate, todoDescription, todoNotes, project, todo);

    createCardFooter(project, todo);
  };

  const renderProjectsBtns = (projectTitle, projectId, projectContainer, projectList, counter) => {
    const btnProject = domManipulation.createHtmlElement({
      tag: 'button', parentElement: projectContainer, arrayClassNames: ['button', 'project-btn'], text: projectTitle,
    });

    const buttonList = document.querySelectorAll('.project-btn');

    buttonList.forEach(element => {
      if (element.classList.contains('active')) {
        element.classList.remove('active');
      }
    });

    btnProject.setAttribute('id', projectId);

    projectList.currentProjectId = counter;

    btnProject.classList.add('active');
    todos.clearTodoContainer();
    counter += 1;
  };

  const retrieveTodos = (currentProject) => {
    const currentTodos = currentProject.getTodo();

    currentTodos.forEach(todo => {
      const title = todo.getTitle();
      const dueDate = todo.getDueDate();
      const description = todo.getDescription();
      const priority = todo.getPriority();
      const notes = todo.getNotes();

      renderTodos(title, dueDate, description, priority, notes, currentProject, todo);
    });
  };
  return {
    renderProjectsBtns,
    retrieveTodos,
    renderTodos,
  };
})();

export default renders;