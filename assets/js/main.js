onload = function(){
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
            content:["Complete Online Javascript Course","Jog around the park 3x","10 minutes meditation","Read for 1 hour","Pick up groceries","Complete Todo app on FrontEnd Master"],
            status:[0,1,1,1,1,1]
        };
        localStorage.setItem('usercard', JSON.stringify(Card));
    }
  
}


function Unique() {
    return '_' + Math.random().toString(35).substr(2, 9);
}

let count=0;
const changeMode = () =>{
    let Card = JSON.parse(localStorage.usercard);
    let icon = document.getElementById('mode');
   
    if(count%2==0){
       icon.src="images/icon-moon.svg";
       document.getElementsByClassName('hero')[0].style.backgroundImage ="url('../images/bg-desktop-light.jpg')";
        document.getElementsByClassName('content')[0].style.backgroundColor='#fafafa';

        for(let i = 0;i<=Card.content.length*3+3;i++){
            document.getElementsByClassName('change')[i].classList.remove('dark');
            document.getElementsByClassName('change')[i].classList.add('light')
        }
       count++
        console.log('gunduz')
    }else{
        icon.src="images/icon-sun.svg";
        document.getElementsByClassName('hero')[0].style.backgroundImage ="url('../images/bg-desktop-dark.jpg')";
        document.getElementsByClassName('content')[0].style.backgroundColor='#161722'
        for(let i = 0;i<=Card.content.length*3+3;i++){
            document.getElementsByClassName('change')[i].classList.remove('light');
            document.getElementsByClassName('change')[i].classList.add('dark')
        }
        count++
        console.log('gece')
    }
      
}

function checkbox(id){
    let check = document.getElementsByClassName('check')[id]
    if(!check.getAttribute('checked')){
        check.setAttribute('checked',"checked")
        check.style.backgroundImage = "linear-gradient(#57ddff,#c058f3)"
        document.getElementsByClassName('check_img')[id].style.display = "inline-block"
    }else{
        check.removeAttribute('checked')
        check.style.backgroundImage = "none"
        document.getElementsByClassName('check_img')[id].style.display = "none"
    }
   
}

function viewTodo(){
    console.log(document.querySelectorAll('.change')[2].classList)
    
    let Card = JSON.parse(localStorage.usercard);
    let content = '';
    for(let i =0;i<Card.content.length;i++){
      
        content+=`<div class="todo_item">

        <div class="todo_checkbox dark change">
            <div onclick="checkbox(${i})" class="check">
                <img class="check_img" src="images/icon-check.svg" alt="check">
            </div>
        </div>
        <div class="todo_content dark change">
             `
            if(Card.status[i]==0){
                content+=`  <a href="#modal" onclick="viewEdit(${i})">  <p class="todo_text delete dark change">${Card.content[i]}</p></a>`
            }else{
                content+=`    <a href="#modal" onclick="viewEdit(${i})"><p class="todo_text dark change ">${Card.content[i]}</p> </a>`
            }
             content+=` <img sty src="images/icon-cross.svg" alt="cross" onclick="deleteItem(${i})">
        </div>

    </div>`
           
    }
    document.getElementById('count').innerText = `${Card.content.length} item`
    document.getElementsByClassName('todo_list')[0].innerHTML = content;
    
}

function deleteItem(id){
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
        Card.content.splice(id,1);
        Card.status.splice(id,1);
        localStorage.usercard = JSON.stringify(Card);
        viewTodo();
        } else {
          swal("Your file is safe!");
        }
      });
   
}

function additem(){
    let input =  document.getElementsByClassName('write')[0].value;
    let Card = JSON.parse(localStorage.usercard);
   
    Card.content.push(input);
   
    Card.status.push(1);
    swal("Good job!", "Added file!", "success");
    input="";
   localStorage.usercard = JSON.stringify(Card);
   viewTodo()
   
}
function clearinput(){
    document.getElementsByClassName('write')[0].value = "";
}

function clearitem(){
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
          for(let i =0;i<Card.content.length;i++){
            if(document.getElementsByClassName('check')[i].getAttribute('checked')) {
              Card.content.splice(i,1);
              Card.status.splice(i,1);
            } 
          }
         
          localStorage.usercard = JSON.stringify(Card);
          viewTodo();
        } else {
          swal("Your file is safe!");
        }
      });
    
}

function active(){
    let number = 0;
    let Card = JSON.parse(localStorage.usercard);
    let content = '';
    for(let i =0;i<Card.content.length;i++){
        if(Card.status[i]==1){
            number++;
            content+=`<div class="todo_item">

            <div class="todo_checkbox dark change">
                <div onclick="checkbox(${i})" class="check">
                    <img class="check_img" src="images/icon-check.svg" alt="check">
                </div>
            </div>
            <div class="todo_content dark change">
                  <a href="#modal" onclick="viewEdit(${i})"><p  class="todo_text dark change">${Card.content[i]}</p></a>
            <img sty src="images/icon-cross.svg" alt="cross" onclick="deleteItem(${i})">
            </div>
        </div>`
        }
        
           
    }
    document.getElementById('count').innerText = `${number} item`
    document.getElementsByClassName('todo_list')[0].innerHTML = content;
}
function completed(){
    let number = 0;
    let Card = JSON.parse(localStorage.usercard);
    let completed = []

    let content = '';
    for(let i =0;i<Card.content.length;i++){
        if(Card.status[i]==0){
            number++;
            content+=`<div class="todo_item">

            <div class="todo_checkbox dark change">
                <div onclick="checkbox(${i})" class="check">
                    <img class="check_img" src="images/icon-check.svg" alt="check">
                </div>
            </div>
            <div class="todo_content dark change">
            <a href="#modal" onclick="viewEdit(${i})"> <p class="todo_text delete dark change">${Card.content[i]}</p></a>
            <img sty src="images/icon-cross.svg" alt="cross" onclick="deleteItem(${i})">
            </div>
        </div>`
        }
        
           
    }
    document.getElementById('count').innerText = `${number} item`
    document.getElementsByClassName('todo_list')[0].innerHTML = content;
}

function viewEdit(id){
    document.getElementsByClassName('hidden')[0].id = id
    let Card = JSON.parse(localStorage.usercard);
    let option= ''
    document.getElementsByClassName('write')[1].value=Card.content[id];
    if(Card.status[id]==1){
      
        option = `
        <option value="1" selected="selected">Active</option>
        <option value="0" >Completed</option>`
       
    }else{
        option = `
        <option value="1" >Active</option>
        <option value="0" selected="selected">Completed</option>`
    }
    document.getElementById('select').innerHTML = option;
    
}

function updateitem(){

    
    let id = document.getElementsByClassName('hidden')[0].id;
    let Card = JSON.parse(localStorage.usercard);
        Card.content[id] = document.getElementsByClassName('write')[1].value
        Card.status[id] = document.getElementById('select').value
        console.log(document.getElementById('select').value)
    localStorage.usercard = JSON.stringify(Card);
    swal("Good job!", "Change Success!", "success");
    viewTodo();
    
}