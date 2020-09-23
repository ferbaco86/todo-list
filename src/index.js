import domManipulation from './helpers';
import './style.css';

let counter = 0;
const project = (title, id) => {
  const getTitle = () => title;
  const getId = () => id;

  const setTitle = (newTitle) => {
    title = newTitle;
  };

  const setId = (newId) => {
    id = newId;
  };

  return {
    getTitle,
    getId,
    setTitle,
    setId,
  };
};

const newProject = project('', '');

const btnAddProject = document.getElementById('btn-add-project');
btnAddProject.addEventListener('click', () => {
  const projectContainer = document.getElementById('project-container');
  const projectTitleInput = document.getElementById('project-title').value;
  newProject.setTitle(projectTitleInput);
  newProject.setId(counter);

  const projectTitle = newProject.getTitle();

  console.log(newProject.getId());
  console.log(newProject.getId());


  const btnProject = domManipulation.createHtmlElement({
    tag: 'button', parentElement: projectContainer, arrayClassNames: ['button', 'project-btn'], text: projectTitle,
  });

  btnProject.setAttribute('id', counter);
  counter += 1;
});
