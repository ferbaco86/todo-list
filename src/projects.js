const projects = (() => {
  const projectList = {
    list: [],
    currentProjectId: null,
    getCurrent() {
      return this.list[this.currentProjectId];
    },
  };

  const project = (title, id) => {
    const todoArr = [];
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

  const createProject = (newProjectTitle, newProjectId) => {
    const newProject = project(newProjectTitle, newProjectId);
    projectList[newProjectId] = {
      projectTitle: newProjectTitle,
      arrayOfToDos: [],
    };

    projectList.list.push(newProject);
    localStorage.setItem('projectList', JSON.stringify(projectList));
  };
  return {
    projectList,
    project,
    createProject,

  };
})();

export default projects;