showNotes();

// If user adds a note, add it to the local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    if (myObj.title == "" || myObj.text == "") {
        alert("Please enter something into notes.");
    } else {
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
    }
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
});

// Function to show elements from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                <div class="noteCard text-dark bg-light my-2 mx-2 card border-success" style="width: auto;">
                <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button type="button" class="btn btn-secondary" id="${index}" onclick="deleteNote(this.id)" style="float: right; background-color: #007bff">
                    <svg style="color: #fff" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                    </svg>
                </button>
                </div>
                </div>`;
    });
    let notesEle = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    }
    else {
        notesEle.innerHTML = `Nothing to show! Use "Add a note" section above to add notes.`;
        notesEle.style.color = "white";
        notesEle.style.fontSize = "1.2rem";
    }
}

// Function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let conform = confirm("Are you sure for delete a note!");
    if (conform == true) {
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
    else {
        showNotes();
    }
}

// For Searchbar
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTitle = element.getElementsByTagName("h5")[0].innerText;
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTitle.includes(inputVal) || cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})