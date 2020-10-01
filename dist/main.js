!function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=1)}([function(e,t,r){},function(e,t,r){"use strict";r.r(t);var a=(()=>{const e=(e,t)=>{t.forEach(t=>{e.classList.add(t)})};return{createHtmlElement:({tag:t,parentElement:r,arrayClassNames:a=[],newId:n="",text:s=""})=>{const l=document.createElement(t);return a!==[]&&e(l,a),""!==n&&((e,t)=>{e.id=t})(l,n),""!==s&&(l.innerHTML=s),r.appendChild(l),l},createImage:(t,r,a=[])=>{const n=new Image;return n.src=t,n.alt=r,a!==[]&&e(n,a),n}}})();var n={todo:(e,t,r,a,n)=>({getTitle:()=>e,getDescription:()=>t,getDueDate:()=>r,getPriority:()=>a,getNotes:()=>n,getAll:()=>[e,t,r,a,n],setTitle:t=>{e=t},setDescription:e=>{t=e},setDueDate:e=>{r=e},setPriority:e=>{a=e},setNotes:e=>{n=e}}),clearTodoContainer:()=>{const e=document.getElementById("todo-section");document.querySelector(".cards-container").remove(),a.createHtmlElement({tag:"div",parentElement:e,arrayClassNames:["cards-container"]})},setPriorityColor:(e,t,r=null)=>{switch(e){case"High":null!==r&&t.classList.remove(r[1]),t.classList.add("priority-high");break;case"Mid":t.classList.add("priority-mid");break;case"Low":t.classList.add("priority-low")}}};var s=(()=>{const e={list:[],currentProjectId:null,getCurrent(){return this.list[this.currentProjectId]}},t=(e,t)=>{const r=[];return{getTitle:()=>e,getId:()=>t,setTitle:t=>{e=t},setId:e=>{t=e},getTodo:()=>r,appendTodo:e=>{r.push(e)}}};return{projectList:e,project:t,createProject:(r,a)=>{const n=t(r,a);e[a]={projectTitle:r,arrayOfToDos:[]},e.list.push(n),localStorage.setItem("projectList",JSON.stringify(e))}}})();var l=(()=>{let e,t,r,l,o,i,c,d,m;const u=document.querySelector(".cards-container"),g=(n,s)=>{r=a.createHtmlElement({tag:"div",parentElement:u,arrayClassNames:["card","column","is-3"]}),r.setAttribute("data-index",s),e=a.createHtmlElement({tag:"header",parentElement:r,arrayClassNames:["card-header"]}),t=a.createHtmlElement({tag:"h5",parentElement:e,arrayClassNames:["card-header-title"],text:n})},p=(e,u,y,E,v)=>{l=a.createHtmlElement({tag:"div",parentElement:r,arrayClassNames:["card-content"]}),o=a.createHtmlElement({tag:"div",parentElement:l,arrayClassNames:["content"]}),i=a.createHtmlElement({tag:"div",parentElement:o,arrayClassNames:["is-hidden"]}),a.createHtmlElement({tag:"label",parentElement:p.content,arrayClassNames:["label"],text:"Due Date"});const f=a.createHtmlElement({tag:"small",parentElement:p.content,text:e});a.createHtmlElement({tag:"label",parentElement:i,arrayClassNames:["label"],text:"Description"});const L=a.createHtmlElement({tag:"small",parentElement:i,text:u});a.createHtmlElement({tag:"label",parentElement:i,arrayClassNames:["label"],text:"Notes"});((e,o,i,u,p)=>{m=a.createHtmlElement({tag:"form",parentElement:r,arrayClassNames:["form","is-hidden"]}),a.createHtmlElement({tag:"label",parentElement:m,arrayClassNames:["label"],text:" New Title"});const y=a.createHtmlElement({tag:"input",parentElement:m,arrayClassNames:["input","my-10"]});y.setAttribute("type","text"),a.createHtmlElement({tag:"label",parentElement:m,arrayClassNames:["label"],text:" New Priority"});const E=a.createHtmlElement({tag:"span",parentElement:m,arrayClassNames:["select","my-10"]}),v=a.createHtmlElement({tag:"select",parentElement:E});a.createHtmlElement({tag:"option",parentElement:v,text:"Low"}),a.createHtmlElement({tag:"option",parentElement:v,text:"Mid"}),a.createHtmlElement({tag:"option",parentElement:v,text:"High"}),a.createHtmlElement({tag:"label",parentElement:m,arrayClassNames:["label"],text:" New Due Date"});const f=a.createHtmlElement({tag:"input",parentElement:m,arrayClassNames:["input","my-10"]});f.setAttribute("type","date"),a.createHtmlElement({tag:"label",parentElement:m,arrayClassNames:["label"],text:" New Description"});const L=a.createHtmlElement({tag:"textarea",parentElement:m,arrayClassNames:["textarea","my-10"]});L.setAttribute("cols","10"),L.setAttribute("rows","1"),a.createHtmlElement({tag:"label",parentElement:m,arrayClassNames:["label"],text:" New Notes"});const j=a.createHtmlElement({tag:"textarea",parentElement:m,arrayClassNames:["textarea","my-10"]});j.setAttribute("cols","10"),j.setAttribute("rows","1");const b=a.createHtmlElement({tag:"button",parentElement:m,arrayClassNames:["button","is-primary","my-10"],text:"Update"});b.setAttribute("type","button"),b.addEventListener("click",()=>{const r=e.getTodo(),a=s.projectList[s.projectList.currentProjectId].arrayOfToDos,E=r.indexOf(o),b=c[E],T=a[E];b.setTitle(y.value),b.setPriority(v.value),b.setDueDate(f.value),b.setDescription(L.value),b.setNotes(j.value),T[0]=y.value,T[1]=L.value,T[2]=f.value,T[3]=v.value,T[4]=j.value,t.innerHTML=b.getTitle(),i.innerHTML=b.getDueDate(),u.innerHTML=b.getDescription(),p.innerHTML=b.getNotes(),d=b.getPriority();const H=g.cardTitle.classList;n.setPriorityColor(d,t,H),l.classList.toggle("is-hidden"),m.classList.toggle("is-hidden"),g.cardHeader.classList.toggle("is-hidden"),localStorage.setItem("projectList",JSON.stringify(s.projectList))})})(E,v,f,L,a.createHtmlElement({tag:"small",parentElement:i,text:y}))},y=(o,u,y,E,v,f,L)=>{c=f.getTodo();const j=c.indexOf(L);d=E,g(o,j),n.setPriorityColor(d,t),p(u,y,v,f,L),((t,n)=>{const o=a.createHtmlElement({tag:"footer",parentElement:r,arrayClassNames:["card-footer"]});a.createHtmlElement({tag:"div",parentElement:o,arrayClassNames:["card-footer-item"],text:'<i class="fas fa-info-circle"></i>'}).addEventListener("click",()=>{i.classList.toggle("is-hidden")});a.createHtmlElement({tag:"div",parentElement:o,arrayClassNames:["card-footer-item"],text:'<i class="fas fa-edit"></i>'}).addEventListener("click",()=>{l.classList.toggle("is-hidden"),m.classList.toggle("is-hidden"),e.classList.toggle("is-hidden")});a.createHtmlElement({tag:"div",parentElement:o,arrayClassNames:["card-footer-item"],text:'<i class="fas fa-trash"></i>'}).addEventListener("click",()=>{const e=t.getTodo(),a=s.projectList[s.projectList.currentProjectId].arrayOfToDos,l=e.indexOf(n);e.splice(l,1),a.splice(l,1),localStorage.setItem("projectList",JSON.stringify(s.projectList)),r.remove()})})(f,L)};return{renderProjectsBtns:(e,t,r,s,l)=>{const o=a.createHtmlElement({tag:"button",parentElement:r,arrayClassNames:["button","project-btn"],text:e});document.querySelectorAll(".project-btn").forEach(e=>{e.classList.contains("active")&&e.classList.remove("active")}),o.setAttribute("id",t),s.currentProjectId=l,o.classList.add("active"),n.clearTodoContainer(),l+=1},retrieveTodos:e=>{e.getTodo().forEach(t=>{const r=t.getTitle(),a=t.getDueDate(),n=t.getDescription(),s=t.getPriority(),l=t.getNotes();y(r,a,n,s,l,e,t)})},renderTodos:y}})();r(0);const o=document.getElementById("btn-add-project"),i=document.getElementById("btn-show-form"),c=document.getElementById("btn-add-todo"),d=document.getElementById("project-container");if(0!==localStorage.length){const e=JSON.parse(localStorage.getItem("projectList"));Object.entries(e).forEach(([e,t])=>{if("currentProjectId"===e||"list"===e)return;const r=s.project(t.projectTitle,e);s.projectList[e]={projectTitle:t.projectTitle,arrayOfToDos:t.arrayOfToDos},s.projectList.list.push(r),t.arrayOfToDos.forEach(e=>{const t=n.todo(e[0],e[1],e[2],e[3],e[4]);r.appendTodo(t)}),l.renderProjectsBtns(t.projectTitle,e,d,s.projectList,0)}),l.retrieveTodos(s.projectList.getCurrent())}0===s.projectList.list.length&&(s.createProject("Default",0),l.renderProjectsBtns("Default",0,d,s.projectList,0)),o.addEventListener("click",()=>{if(!0===(e=>{const t=document.getElementById("alertMessage");let r;return e.validity.valueMissing?(t.classList.remove("is-hidden"),r=!1):(t.classList.add("is-hidden"),r=!0),r})(document.getElementById("project-title"))){const e=document.getElementById("project-title").value;s.createProject(e,0),l.renderProjectsBtns(e,0,d,s.projectList,0)}}),d.addEventListener("click",e=>{const t=e.target;if("BUTTON"===t.nodeName){s.projectList.currentProjectId=t.getAttribute("id"),n.clearTodoContainer(),l.retrieveTodos(s.projectList.getCurrent());document.querySelectorAll(".project-btn").forEach(e=>e!==t||e.classList.contains("active")?e.classList.remove("active"):e.classList.add("active"))}}),i.addEventListener("click",e=>{const t=e.target;document.querySelector(".form").classList.toggle("is-hidden"),"Click Here to add To-Do's"===t.innerHTML?t.innerHTML="Hide Form":t.innerHTML="Click Here to add To-Do's"}),c.addEventListener("click",()=>{const e=s.projectList.getCurrent(),t=document.getElementById("to-do-title"),r=document.getElementById("to-do-description"),a=document.getElementById("to-do-date");document.getElementById("priority");if(!0===((e,t,r,a,n)=>{const s=document.getElementById("alertMessage");let l;return e.validity.valueMissing||t.validity.valueMissing||r.validity.valueMissing||n.validity.valueMissing||n.validity.valueMissing?(s.classList.remove("is-hidden"),l=!1):(s.classList.add("is-hidden"),l=!0),l})(t,r,a,0,document.getElementById("to-do-notes"))){const t=document.getElementById("to-do-title").value;console.log("Here we go");const r=document.getElementById("to-do-description").value,a=document.getElementById("to-do-date").value,o=document.getElementById("priority").value,i=document.getElementById("to-do-notes").value,c=n.todo(t,r,a,o,i);e.appendTodo(c),s.projectList[s.projectList.currentProjectId].arrayOfToDos.push(c.getAll()),l.renderTodos(c.getTitle(),c.getDueDate(),c.getDescription(),c.getPriority(),c.getNotes(),e,c),localStorage.setItem("projectList",JSON.stringify(s.projectList))}})}]);