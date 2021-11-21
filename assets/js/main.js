onload = function () {
    CheckUser();
    viewTodo()
}


function CheckUser() {
    if (localStorage.getItem('userId') === null) {
        localStorage.setItem('userId', Unique());
    }
    console.log(localStorage.getItem('userId'))
    if (localStorage.getItem('usercard') === null) {
        var Card = {
            userId: localStorage.getItem('userId'),
            content: ["Complete Online Javascript Course", "Jog around the park 3x", "10 minutes meditation", "Read for 1 hour", "Pick up groceries", "Complete Todo app on FrontEnd Master"],
            status: [1, 1, 1, 1, 1, 1],
            darkmode: true,
        };
        localStorage.setItem('usercard', JSON.stringify(Card));
       
    }

}


function Unique() {
    return '_' + Math.random().toString(35).substr(2, 9);
}


const changeMode = () => {
    let Card = JSON.parse(localStorage.usercard);
    let icon = document.getElementById('mode');
    console.log("++++++++++++++++++")
    console.log(Card.darkmode)
    if (Card.darkmode) {
        icon.src = "images/icon-moon.svg";
        document.getElementsByClassName('hero')[0].style.backgroundImage = "url('../images/bg-desktop-light.jpg')";
        document.getElementsByClassName('content')[0].style.backgroundColor = '#fafafa';
        document.documentElement.style.setProperty("--bg","#fafafa")
        document.documentElement.style.setProperty("--text","#25273c")
        Card.darkmode = false;
        localStorage.usercard = JSON.stringify(Card);
        
    } else {
        icon.src = "images/icon-sun.svg";
        document.getElementsByClassName('hero')[0].style.backgroundImage = "url('../images/bg-desktop-dark.jpg')";
        document.getElementsByClassName('content')[0].style.backgroundColor = '#161722'
        document.documentElement.style.setProperty("--bg","#25273c")
        document.documentElement.style.setProperty("--text","#fafafa")
        Card.darkmode= true;
        localStorage.usercard = JSON.stringify(Card);
    }

}


function checkbox(id) {
    let Card = JSON.parse(localStorage.usercard);
    let check = document.getElementsByClassName('check')[id]
    if (!check.getAttribute('checked')) {
        check.setAttribute('checked', "checked")
        check.style.backgroundImage = "linear-gradient(#57ddff,#c058f3)"
        document.getElementsByClassName('check_img')[id].style.display = "inline-block";
        Card.status[id] = 0;
        document.querySelectorAll('.checked')[id].classList.add('delete')
    } else {
        check.removeAttribute('checked')
        check.style.backgroundImage = "none"
        document.getElementsByClassName('check_img')[id].style.display = "none";
        Card.status[id] = 1;
        document.querySelectorAll('.checked')[id].classList.remove('delete')
    }
    localStorage.usercard = JSON.stringify(Card);
}

function viewTodo() {
    let Card = JSON.parse(localStorage.usercard);
    let content = '';
    for (let i = 0; i < Card.content.length; i++) {

        content += `<div class="todo_item">

        <div class="todo_checkbox change">
            <div onclick="checkbox(${i})" class="check">
                <img class="check_img" src="images/icon-check.svg" alt="check">
            </div>
        </div>
        <div class="todo_content change">
             `
        if (Card.status[i] == 0) {
            content += `  <a href="#modal" onclick="viewEdit(${i})">  <p class="todo_text delete change checked">${Card.content[i]}</p></a>`
            
        } else {
            content += `    <a href="#modal" onclick="viewEdit(${i})"><p class="todo_text change checked">${Card.content[i]}</p> </a>`
        }
        content += ` <img sty src="images/icon-cross.svg" alt="cross" onclick="deleteItem(${i})">
        </div>
    </div>`
    }

    document.getElementById('count').innerText = `${Card.content.length} item`
    document.getElementsByClassName('todo_list')[0].innerHTML = content;
    checkClass()

}

function checkClass() {
    let icon = document.getElementById('mode');
    let Card = JSON.parse(localStorage.usercard);
    if (Card.darkmode) {
        icon.src = "images/icon-sun.svg";
        document.getElementsByClassName('hero')[0].style.backgroundImage = "url('../images/bg-desktop-dark.jpg')";
        document.getElementsByClassName('content')[0].style.backgroundColor = '#161722';
        document.documentElement.style.setProperty("--bg","#25273c");
        document.documentElement.style.setProperty("--text","#fafafa");
        
    } else {
        icon.src = "images/icon-moon.svg";
        document.getElementsByClassName('hero')[0].style.backgroundImage = "url('../images/bg-desktop-light.jpg')";
        document.getElementsByClassName('content')[0].style.backgroundColor = '#fafafa';
        document.documentElement.style.setProperty("--bg","#fafafa");
        document.documentElement.style.setProperty("--text","#25273c");
    }
    
}

function deleteItem(id) {
    let Card = JSON.parse(localStorage.usercard);

    swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your file has been deleted!", {
                    icon: "success",

                });
                Card.content.splice(id, 1);
                Card.status.splice(id, 1);
                localStorage.usercard = JSON.stringify(Card);
                viewTodo();
            } else {
                swal("Your file is safe!");
            }
        });
}

function additem(e) {
    let input = document.getElementsByClassName('write')[0].value;
    let Card = JSON.parse(localStorage.usercard);
    if (input == "") {

    } else {
        Card.content.push(input);
        Card.status.push(1);
    }
    localStorage.usercard = JSON.stringify(Card);
    viewTodo();
    clearinput();
    swal("Good job!", "Added file!", "success");
}

function clearinput() {
    document.getElementsByClassName('write')[0].value = "";
}

function clearitem() {

    let Card = JSON.parse(localStorage.usercard);
    swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your file has been deleted!", {
                    icon: "success",
                }
                );
                // let contentList = [{content:title,status:}]
                for (let i = 0; i < Card.content.length; i++) {
              
                    if (Card.status[i]==0) {
                        Card.content.splice(i, 1);
                        Card.status.splice(i, 1); 
                        i=-1;
                        
                        
                    }
                }
                localStorage.usercard = JSON.stringify(Card);
                viewTodo();
            } else {
                swal("Your file is safe!");
            }
        });

}

function active() {
    let number = 0;
    let Card = JSON.parse(localStorage.usercard);
    let content = '';
    for (let i = 0; i < Card.content.length; i++) {
        if (Card.status[i] == 1) {
            number++;
            content += `<div class="todo_item">

            <div class="todo_checkbox  change">
               
            </div>
            <div class="todo_content  change">
                  <a href="#modal" onclick="viewEdit(${i})"><p  class="todo_text  change">${Card.content[i]}</p></a>
           
            </div>
        </div>`
        }


    }
    document.getElementById('count').innerText = `${number} item`
    document.getElementsByClassName('todo_list')[0].innerHTML = content;
    checkClass()
}

function completed() {
    let number = 0;
    let Card = JSON.parse(localStorage.usercard);

    let content = '';
    for (let i = 0; i < Card.content.length; i++) {
        if (Card.status[i] == 0) {
            number++;
            content += `<div class="todo_item">

            <div class="todo_checkbox  change">
                
            </div>
            <div class="todo_content  change">
            <a href="#modal" onclick="viewEdit(${i})"> <p class="todo_text delete  change">${Card.content[i]}</p></a>
           
            </div>
        </div>`
        }


    }
    document.getElementById('count').innerText = `${number} item`
    document.getElementsByClassName('todo_list')[0].innerHTML = content;
    checkClass()
}

function viewEdit(id) {
    document.getElementsByClassName('hidden')[0].id = id
    let Card = JSON.parse(localStorage.usercard);
    document.getElementsByClassName('write')[1].value = Card.content[id];
  
}

function updateitem() {


    let id = document.getElementsByClassName('hidden')[0].id;
    let Card = JSON.parse(localStorage.usercard);
    Card.content[id] = document.getElementsByClassName('write')[1].value
    Card.status[id] = document.getElementById('select').value
    localStorage.usercard = JSON.stringify(Card);
    viewTodo();
    swal("Good job!", "Change Success!", "success");
}