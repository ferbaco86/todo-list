import domManipulation from './helpers';
import todos from './todos';
import projects from './projects';

const renders = (() => {
  const renderTodos = (todoTitle, todoDueDate, todoDescription,
    todoPriority, todoNotes, project, todo) => {
    const cardContainer = document.querySelector('.cards-container');
    const toDoArray = project.getTodo();
    const toDoIndex = toDoArray.indexOf(todo);

    let newToDoPriority = todoPriority;

    const cardColumn = domManipulation.createHtmlElement({ tag: 'div', parentElement: cardContainer, arrayClassNames: ['card', 'column', 'is-3'] });
    cardColumn.setAttribute('data-index', toDoIndex);

    // Card Header and the card's title that's inside this header
    const cardHeader = domManipulation.createHtmlElement({ tag: 'header', parentElement: cardColumn, arrayClassNames: ['card-header'] });
    const cardTitle = domManipulation.createHtmlElement({
      tag: 'h5', parentElement: cardHeader, arrayClassNames: ['card-header-title'], text: todoTitle,
    });

    todos.setPriorityColor(newToDoPriority, cardTitle);

    // Mid section of the card with the content:

    const cardContent = domManipulation.createHtmlElement({ tag: 'div', parentElement: cardColumn, arrayClassNames: ['card-content'] });
    const content = domManipulation.createHtmlElement({ tag: 'div', parentElement: cardContent, arrayClassNames: ['content'] });
    const detailsContent = domManipulation.createHtmlElement({ tag: 'div', parentElement: content, arrayClassNames: ['is-hidden'] });


    domManipulation.createHtmlElement({
      tag: 'label', parentElement: content, arrayClassNames: ['label'], text: 'Due Date',
    });
    const toDoDueDateText = domManipulation.createHtmlElement({
      tag: 'small', parentElement: content, text: todoDueDate,
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

    // Creation of the edit form
    const editForm = domManipulation.createHtmlElement({ tag: 'form', parentElement: cardColumn, arrayClassNames: ['form', 'is-hidden'] });
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


    const field = domManipulation.createHtmlElement({ tag: 'div', parentElement: editForm, arrayClassNames: ['field'] });
    const notification = domManipulation.createHtmlElement({
      tag: 'div',
      parentElement: field,
      arrayClassNames: ['notification', 'is-danger', 'is-hidden'],
      newId: 'updateAlert',
    });
    domManipulation.createHtmlElement({
      tag: 'h5',
      parentElement: notification,
      arrayClassNames: ['title', 'is-5', 'has-text-centered'],
      text: 'All fields are required!',
    });

    domManipulation.setRequired([editInputTitle, editInputDueDate,
      editInputDescription, editInputNotes]);
    const updateBtn = domManipulation.createHtmlElement({
      tag: 'button', parentElement: editForm, arrayClassNames: ['button', 'is-primary', 'my-10'], text: 'Update',
    });
    updateBtn.setAttribute('type', 'button');
    updateBtn.addEventListener('click', (e) => {
      const arrayToDos = project.getTodo();
      const indexToDo = arrayToDos.indexOf(todo);
      const updatedTodo = toDoArray[indexToDo];
      const storageToDos = projects.projectList[projects.projectList.currentProjectId].arrayOfToDos;
      const storageTodo = storageToDos[indexToDo];

      if (todos.todoValidation(editInputTitle, editInputDescription,
        editInputDueDate, editInputNotes, e) === true) {
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
        const priorityClass = cardTitle.classList;

        todos.setPriorityColor(newToDoPriority, cardTitle, priorityClass);

        cardContent.classList.toggle('is-hidden');
        editForm.classList.toggle('is-hidden');
        cardHeader.classList.toggle('is-hidden');

        localStorage.setItem('projectList', JSON.stringify(projects.projectList));
      }
    });

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
      const indexToDo = arrayToDos.indexOf(todo);
      const storageToDos = projects.projectList[projects.projectList.currentProjectId].arrayOfToDos;
      arrayToDos.splice(indexToDo, 1);
      storageToDos.splice(indexToDo, 1);

      localStorage.setItem('projectList', JSON.stringify(projects.projectList));

      cardColumn.remove();
    });
  };

  const renderProjectsBtns = (projectTitle, projectId, projectContainer) => {
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

    btnProject.classList.add('active');
    todos.clearTodoContainer();
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
    renderTodos,
    renderProjectsBtns,
    retrieveTodos,
  };
})();

export default renders;