import "./sass/main.scss";
import app from "./js/app";
import { loadNotes } from './js/utils/api';

// window.onload = () => {
//   setTimeout(() => 
//     document.querySelector('.preload').style.display = 'none', 1500
//   )
// }

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.preload').style.display = 'none';
        document.querySelector('.app').style.display = 'block';
    }, 1500
    )
})

const todo = new app();

loadNotes().then(data => {
  if(data && data.length > 0) {
    todo.notes = data;
    todo.renderNodesList();
  };
  
});

