function changeText(){
    document.getElementById("title").innerHTML = "Dom changing";
}
function showname(){
    var name = document.getElementById("nameinput").value;
    document.getElementById("output").innerHTML = "Hello " + name;

}
function incrementNumber(){ 
    var number = document.getElementById("nameinput").value;
    document.getElementById("output").innerHTML = "Incremented number is: " + (parseInt(number) + 1);
}
function decrementNumber(){
    var number = document.getElementById("nameinput").value;
    document.getElementById("output").innerHTML= "Decremented number is: " + (parseInt(number) - 1);
}

function addTask(){
    let task=document.getElementById("taskinput").value;
    let taskList=document.getElementById("tasklist");
    let listItem=document.createElement("li");
    listItem.textContent=task;
    taskList.appendChild(listItem);
}
function changeColor(){

    var name = document.getElementById("nameinput").value;

    var colors = ["red", "blue", "green", "purple", "orange", "pink"];

    var randomIndex = Math.floor(Math.random() * colors.length);

    document.getElementById("output").innerHTML = "Hello " + name;

    document.getElementById("output").style.color =
        colors[randomIndex];
}