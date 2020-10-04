const domManipulation = (() => {
  const addClasses = (element, arrayClassNames) => {
    arrayClassNames.forEach(className => {
      element.classList.add(className);
    });
  };

  const addId = (element, newId) => {
    element.id = newId;
  };
  const setRequired = (arrayInputs) => {
    arrayInputs.forEach((input) => {
      input.setAttribute('required', '');
    });
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
    setRequired,
  };
})();


export default domManipulation;