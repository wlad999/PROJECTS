import { generatePhrase, genarateId } from "./utils/helper";
import { deleteNote, addNote } from "./utils/api";
import quotes from "../notes.json";
// console.log(quotes);

export const notes = [
  {
    id: 1,
    title: "First",
    body: "1111111",
    inProgress: false,
    completed: false,
    favorite: true
  },
  {
    id: 2,
    title: "Second",
    body: "2222222",
    inProgress: false,
    completed: false
  },
  {
    id: 3,
    title: "Third",
    body: "333333333",
    inProgress: true,
    completed: false
  },
  {
    id: 4,
    title: "Fourth",
    body: "444444444444",
    inProgress: true,
    completed: false
  }
];

export default class App {
  constructor() {
    this._notes = [];
    this.refs = {};
    this.refs.todoElement;
    this.refs.trash = document.querySelector(".todo-trash");
    this.refs.noteList = document.querySelector(".main__card-todo");
    this.refs.start = document.querySelector(`.main__card__start`);
    this.refs.inprogress = document.querySelector(`.main__card__progress`);
    this.refs.completed = document.querySelector(`.main__card__completed`);
    this.refs.afor = document.querySelector(".afor");
    this.refs.circle = document.querySelector(".circleHover");
    this.refs.text = document.querySelector(".text");
    this.refs.circle2 = document.querySelector(".circle2");
    this.refs.author = document.querySelector(".author");
    this.refs.ball8 = document.querySelector(".ball8");

    // Modal refs
    this.refs.add = document.querySelector(`.btn2`);
    this.refs.modalWrapper = document.querySelector(`.modal_wrapper`);
    this.refs.modal = document.querySelector(`.modal_window`);
    this.refs.checkbox = document.querySelector(`.favCheckbox`);
    this.refs.btnAdd = document.querySelector(`.btn`);
    this.refs.body = document.querySelector(`body`);
    this.refs.h2 = document.querySelector(`.main_title_input`);
    this.refs.p = document.querySelector(`.main_content_text`);

    this.renderNodesList = this.renderNodesList.bind(this);
    this.dragAndDrop = this.dragAndDrop.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
    this.dragDrop = this.dragDrop.bind(this);
    this.taskComplited = this.taskComplited.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCreateNote = this.handleCreateNote.bind(this);

    // Listeners

    this.refs.body.addEventListener(`click`, this.showModal);
    this.refs.btnAdd.addEventListener(`click`, this.handleCreateNote);

    this.refs.trash.addEventListener("mousedown", this.dragAndDrop);
    this.refs.trash.addEventListener("dragover", this.dragOver);
    this.refs.trash.addEventListener("dragenter", this.dragEnter);
    this.refs.trash.addEventListener("dragleave", this.dragLeave);
    this.refs.trash.addEventListener("drop", this.dragDrop);
  }

  get notes() {
    return this._notes;
  }

  set notes(notes) {
    this._notes = notes;
  }

  addTodo(obj) {
    this._notes.push(obj);
    this.renderNodesList();
    addNote(this._notes);
  }

  deleteTodo(id) {
    deleteNote(id);
    this.renderNodesList();
  }

  editTodo() {}

  createNoteContent({ title, body, favorite, id }) {
    const div = document.createElement("DIV");
    const fav = document.createElement("DIV");
    const h2 = document.createElement("H2");
    const p = document.createElement("P");
    div.className = "main__card-todo";
    div.setAttribute("draggable", "true");
    div.setAttribute("data-id", `${id}`);
    h2.textContent = title;
    h2.className = "main__card-title";
    p.className = "main__card-body";
    p.textContent = body;
    div.appendChild(h2);
    div.appendChild(p);
    if (favorite) {
      // console.log(favorite);
      fav.className = "main__card-fav";
      div.appendChild(fav);
    }

    return div;
  }

  renderNodesList() {
    this.refs.start.innerHTML = null;
    this.refs.inprogress.innerHTML = null;
    this.refs.completed.innerHTML = null;
    this._notes.forEach(el => {
      if (el.inProgress) {
        this.refs.inprogress.append(this.createNoteContent(el));
      } else if (el.completed) {
        this.refs.completed.append(this.createNoteContent(el));
      } else {
        this.refs.start.append(this.createNoteContent(el));
      }
    });
    this.refs.allNotes = [...document.querySelectorAll(".main__card-todo")];
    this.refs.notesContainer = [...document.querySelectorAll(".main__card")];
    this.refs.allNotes.forEach(note => {
      note.addEventListener("dragstart", this.dragStart);
      note.addEventListener("dragend", this.dragEnd);
    });
    this.refs.notesContainer.forEach(el => {
      console.log(el);
      el.addEventListener("mousedown", this.dragAndDrop);
      el.addEventListener("dragover", this.dragOver);
      el.addEventListener("dragenter", this.dragEnter);
      el.addEventListener("dragleave", this.dragLeave);
      el.addEventListener("drop", this.dragDrop);
    });
  }

  dragAndDrop(e) {
    e.stopPropagation();
    let target = e.target.closest(".main__card-todo");

    this.refs.todoElement = target;
  }

  dragStart(e) {
    setTimeout(() => (e.target.classList.toggle("invisible"), 0));
  }

  dragEnd(e) {
    e.target.classList.remove("invisible");
  }

  dragOver(e) {
    e.preventDefault();
  }

  dragEnter(e) {
    e.preventDefault();
    e.target.classList.toggle("hovered");
  }

  dragLeave(e) {
    e.target.classList.remove("hovered");
  }

  dragDrop(e) {
    let target = e.target.closest(".main__card");

    if (e.target.classList.contains("todo-trash")) {
      console.log("ok");
      deleteNote(Number(this.refs.todoElement.dataset.id));
      this._notes = this._notes.filter(
        el => el.id !== Number(this.refs.todoElement.dataset.id)
      );
      return this.renderNodesList();
    } else if (target.classList.contains("main__card__start")) {
      let curentElementId = Number(this.refs.todoElement.dataset.id);
      this._notes.forEach(el => {
        if (curentElementId === el.id) {
          el.inProgress = false;
          el.completed = false;
        }
      });
      addNote(this._notes);
    } else if (target.classList.contains("main__card__progress")) {
      let curentElementId = Number(this.refs.todoElement.dataset.id);
      this._notes.forEach(el => {
        if (curentElementId === el.id) {
          el.inProgress = true;
          el.completed = false;
        }
      });
      addNote(this._notes);
    } else if (target.classList.contains("main__card__completed")) {
      let curentElementId = Number(this.refs.todoElement.dataset.id);
      this._notes.forEach(el => {
        if (curentElementId === el.id) {
          el.inProgress = false;
          el.completed = true;
        }
      });
      addNote(this._notes);
      setTimeout(() => this.taskComplited(), 1000);
    }
    target.append(this.refs.todoElement);
    console.log(e.target.classList.contains("todo-trash"));
  }

  // _________________________8BALL____________
  taskComplited() {
    const quote = quotes[generatePhrase(99) + ""];
    this.refs.ball8.classList.add("active");

    console.log("quote", quote);

    const changePhrase = () => {
      this.refs.afor.innerHTML = quote.quoteText;
      if (quote.quoteAuthor !== "") {
        this.refs.author.innerHTML = "- " + quote.quoteAuthor + " -";
      }
    };

    setTimeout(() => {
      this.refs.circle.classList.add("circle");
      this.refs.circle.classList.remove("circleHover");
    }, 1600);

    setTimeout(() => {
      this.refs.circle2.classList.add("circle2Hover");
    }, 1000);

    setTimeout(() => {
      changePhrase();
      this.refs.text.classList.add("textHover");
    }, 3200);

    // text.addEventListener('click', changePhrase)
    setTimeout(() => {
      this.refs.ball8.classList.remove("active");
      this.refs.circle.classList.add("circleHover");
      this.refs.circle2.classList.remove("circle2Hover");
      this.refs.text.classList.remove("textHover");
      this.refs.afor.innerHTML = "";
      this.refs.author.innerHTML = "";
    }, 14000);
  }

  showModal(el) {
    console.log(el.target);
    if (el.target === this.refs.modalWrapper) {
      this.refs.modalWrapper.classList.toggle(`show`);
    } else if (
      el.target.closest(".btn2") === this.refs.add ||
      el.target === this.refs.add
    ) {
      this.refs.modalWrapper.classList.toggle(`show`);
    } else if (el.target === this.refs.btnAdd) {
      if (this.refs.h2.value === "" || this.refs.p.value === "") {
        alert(`Заполните все поля`);
      } else {
        this.refs.modalWrapper.classList.toggle(`show`);
        this.refs.h2.value = null;
        this.refs.p.value = null;
      }
    }
  }

  handleCreateNote() {
    const obj = {
      id: genarateId(this._notes),
      title: this.refs.h2.value,
      body: this.refs.p.value,
      inProgress: false,
      completed: false,
      favorite: this.refs.checkbox.checked
    };

    if (this.refs.h2.value !== `` && this.refs.p.value !== ``) {
      console.log(obj);

      this.addTodo(obj);
    }
  }
}
// const app = new App();
// app.renderNodesList();

// genarateId(notes);

// const a = new App();
// a.addTodo(notes[0]);
// a.addTodo(notes[1]);
// console.log(a._notes);
// a.renderNodesList();
