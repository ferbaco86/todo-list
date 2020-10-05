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
    const todoSection = domManipulation.getHtmlElement({ byId: 'todo-section' });
    const cardsContainer = domManipulation.getHtmlElement({ byQueryClass: '.cards-container' });
    cardsContainer.remove();

    domManipulation.createHtmlElement({ tag: 'div', parentElement: todoSection, arrayClassNames: ['cards-container'] });
  };

  const setPriorityColor = (newToDoPriority, cardTitle, priorityClass = null) => {
    switch (newToDoPriority) {
      case 'High':
        if (priorityClass !== null) {
          domManipulation.removeClasses(cardTitle, [priorityClass[1]]);
        }
        domManipulation.addClasses(cardTitle, ['priority-high']);
        break;

      case 'Mid':
        domManipulation.addClasses(cardTitle, ['priority-mid']);

        break;

      case 'Low':
        domManipulation.addClasses(cardTitle, ['priority-low']);
        break;

      default:
        break;
    }
  };
  return {
    todo,
    clearTodoContainer,
    setPriorityColor,
  };
})();

export default todos;