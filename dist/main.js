/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nconst domManipulation = (() => {\n  const addClasses = (element, arrayClassNames) => {\n    arrayClassNames.forEach(className => {\n      element.classList.add(className);\n    });\n  };\n\n  const addId = (element, newId) => {\n    element.id = newId;\n  };\n\n  const createImage = (source, alt, arrayClassNames = []) => {\n    const img = new Image();\n    img.src = source;\n    img.alt = alt;\n\n    if (arrayClassNames !== []) {\n      addClasses(img, arrayClassNames);\n    }\n\n    return img;\n  };\n\n  const createHtmlElement = ({\n    tag, parentElement, arrayClassNames = [], newId = '', text = '',\n  }) => {\n    const newElement = document.createElement(tag);\n\n    if (arrayClassNames !== []) {\n      addClasses(newElement, arrayClassNames);\n    }\n    if (newId !== '') {\n      addId(newElement, newId);\n    }\n    if (text !== '') {\n      newElement.innerHTML = text;\n    }\n    parentElement.appendChild(newElement);\n    return newElement;\n  };\n\n  return {\n    createHtmlElement, createImage,\n  };\n})();\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (domManipulation);\n\n//# sourceURL=webpack:///./src/helpers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nlet counter = 0;\nconst project = (title, id) => {\n  const getTitle = () => title;\n  const getId = () => id;\n\n  const setTitle = (newTitle) => {\n    title = newTitle;\n  };\n\n  const setId = (newId) => {\n    id = newId;\n  };\n\n  return {\n    getTitle,\n    getId,\n    setTitle,\n    setId,\n  };\n};\n\nconst newProject = project('', '');\n\nconst btnAddProject = document.getElementById('btn-add-project');\nbtnAddProject.addEventListener('click', () => {\n  const projectContainer = document.getElementById('project-container');\n  const projectTitleInput = document.getElementById('project-title').value;\n  newProject.setTitle(projectTitleInput);\n  newProject.setId(counter);\n\n  const projectTitle = newProject.getTitle();\n\n  console.log(newProject.getId());\n  console.log(newProject.getId());\n\n\n  const btnProject = _helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createHtmlElement({\n    tag: 'button', parentElement: projectContainer, arrayClassNames: ['button', 'project-btn'], text: projectTitle,\n  });\n\n  btnProject.setAttribute('id', counter);\n  counter += 1;\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/style.css?");

/***/ })

/******/ });