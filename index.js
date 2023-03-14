
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
    fitLocal(book){
        let myobj;
        let bookstore=localStorage.getItem("bookstore");
        if(bookstore==null){
            myobj=[];
        }
        else {
            myobj=JSON.parse(bookstore);
        }
        myobj.push(book);
        localStorage.setItem("bookstore",JSON.stringify(myobj));
    }
}
class Display {
    validate(book) {
        if(book.name.length>3 && book.author.length>3 && book.name.length<17 && book.author.length<17){
            return true;
        }
        else return false;
    }
    add() {

        let myobj;
        let bookstore=localStorage.getItem("bookstore");
        if(bookstore==null){
            myobj=[];
        }
        else {
            myobj=JSON.parse(bookstore);
        }
        let html="";
        myobj.forEach(function(element,index) {
            html+=`<tr>
                <td>${element.name}</td>
                <td>${element.author}</td>
                <td>${element.type}</td>
                <td><button class="btn btn-primary" id="${index}" onclick="display.deleteBook(this.id)">Delete</button></td>
                    </tr>`
        });
        let tableBody = document.getElementById('tableBody');

        if(myobj.length!=0){
            tableBody.innerHTML=html;
        }
        else{
            tableBody.innerHTML=`<b style="color: cadetblue;">There is no book</b>`
        }

        // let mystring = `<tr>
        //     <td>${book.name}</td>
        //     <td>${book.author}</td>
        //     <td>${book.type}</td>
        //         </tr>`
        // tableBody.innerHTML+=mystring;
    }
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
    show(type,dismess) {
        let message=document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText='Success';
        }
        else boldText="Error!";
        message.innerHTML=`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>${boldText}:</strong> ${dismess}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true"></span>
                </button>
                </div>`;
        setTimeout(function(){
            message.innerHTML="";
        },4000);
    }
    deleteBook(num){
        let bookstore=localStorage.getItem('bookstore');
        let myobj;
        if(bookstore==null){
            myobj=[];
        }
        else{
            myobj=JSON.parse(bookstore);
        }
        myobj.splice(num,1);
        localStorage.setItem('bookstore',JSON.stringify(myobj));
        let display=new Display();
        display.add();
    }
}

let display=new Display();
display.add();



let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryformSubmit);

function libraryformSubmit(e) {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let fiction = document.getElementById('fiction');
    let adventure = document.getElementById('adventure');
    let cooking = document.getElementById('cooking');
    let horror = document.getElementById('horror');
    let type;
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (adventure.checked) {
        type = adventure.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    else if (horror.checked) {
        type = horror.value;
    }

    let book = new Book(name, author, type);
    let display = new Display();

    if (display.validate(book)) {
        let fitlocal=new Book();
        fitlocal.fitLocal(book);
        display.add();
        display.clear();
        display.show('success', 'Your book has been successfully added');
    }
    else {
        display.show('danger', 'Sorry you cannot add this book beacuse of character size');
    }

    e.preventDefault();
}
