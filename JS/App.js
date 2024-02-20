try {
  //Variables
  const noteList = document.querySelector("ul");
  let input = document.getElementById("input")
  let flag = false
  // eventlistener
  eventlistener();
  //
  function eventlistener() {
    document.getElementById("add").addEventListener("click", add_value);
    //remove note
    noteList.addEventListener("click", removeNote);
    //get data from localstrage onload
    document.addEventListener("DOMContentLoaded", localstorageOnload);
    //edit Note
    noteList.addEventListener("click", editNote);
  }
  //function
  //adding new note to list
  function add_value() {
    const note = document.getElementById("input").value;
    //create <li>tag
    const li = document.createElement("li");
    //creat <p>tag <buttom>tag <input:type=buttom>tag
    const p = document.createElement("p");
    const removeBtn = document.createElement("button");
    //constom tag
    p.appendChild(document.createTextNode(note));
    removeBtn.textContent = "Delete";
    removeBtn.className = "removebtn";
    //adding buttoms and value to li
    li.appendChild(p);
    li.appendChild(removeBtn);
    //adding li to note-list or (ul)
    noteList.appendChild(li);
    addNoteToLocalStorage(note);
    input.value = ""
  }
  //functio for Delete li
  function removeNote(e) {
    if (e.target.className == "removebtn") {
      e.target.parentElement.remove();
      //also remove the note fro local storage
      removeNoteLocalStorage(e.target.parentElement.textContent);
    }
  }
  //functio for add value to local storage
  function addNoteToLocalStorage(note) {
    //get nots from localstorage
    const notes = getNotesFromLocalStorage();
    //add value to nots array
    notes.push(note);
    //add new nots array to localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  //get notes from localstorage
  function getNotesFromLocalStorage() {
    let notes;
    //get previous notes from ocalstorage
    let getformLS = localStorage.getItem("notes");
    if (getformLS === null) {
      //if not exist creat empty array
      notes = [];
    } else {
      //if exist convert to the array
      notes = JSON.parse(getformLS);
    }
    return notes;
  }
  //get data from local storage on load
  function localstorageOnload() {
    const notes = getNotesFromLocalStorage();
    //print each item of array
    notes.forEach(function (note) {
      //create <li>tag
      const li = document.createElement("li");
      //creat <p>tag <buttom>tag <input:type=buttom>tag
      const p = document.createElement("p");
      const removeBtn = document.createElement("button");
      const editBtn = document.createElement("input");
      //constom tag
      p.appendChild(document.createTextNode(note));
      removeBtn.textContent = "Delete";
      removeBtn.className = "removebtn";
      //adding buttoms and value to li
      li.appendChild(p);
      li.appendChild(removeBtn);
      //adding li to note-list or (ul)
      noteList.appendChild(li);
    });
  }
  function removeNoteLocalStorage(noteContent) {
    //delete (delete) from the content
    const noteDelete = noteContent.substring(0, noteContent.length - 6);
    //get note for local storage
    const notesFromLs = getNotesFromLocalStorage();
    notesFromLs.forEach(function (note, index) {
      if (note === noteDelete) {
        notesFromLs.splice(index, 1);
      }
    });
    localStorage.setItem("notes", JSON.stringify(notesFromLs));
  }
} catch {
  console.log(Error);
}
