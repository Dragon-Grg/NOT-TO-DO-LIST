// let addBtn = document.getElementById("addBtn");

// addBtn.addEventListener("click", () => {
//   alert("CLICKED");
// });


const toastLiveExample = document.getElementById("liveToast");
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
const toastContentElm = document.getElementById("toast-msg");
const chimeAudioElm = document.getElementById("chime-audio");

const generateUniqueId = () => {
  let stringGenerator =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let stringLength = 6;
  let stringValue = "";

  for (let i = 0; i < stringLength; i++) {
    let randomIndex = Math.floor(Math.random() * stringGenerator.length);
    stringValue += stringGenerator[randomIndex];
  }

  return stringValue;
};

let taskList = [
    {id:generateUniqueId(), task: "Good Task", hour: 10, type: "good"},
    {id:generateUniqueId(),task: "Bad Task", hour: 20, type: "bad"},
    {id:generateUniqueId(), task: "Good Task", hour: 10, type: "good"},
    {id:generateUniqueId(),task: "Bad Task", hour: 20, type: "bad"},


];

const businessRule = (taskObj) => {
  const MAX_WEEKLY_HOUR = 168;

  if(taskObj.task == "")
  {
    alert("Task Should Not Be Empty");
    return false;
  }

   if(taskObj.task <= 0 )
  {
    alert("Hour Should Be Positive");
    return false;
  }

    if(taskObj.task == "" )
  {
    alert("Task Type Should Not Be Empty!!! ");
    return false;
  }

  let tHour = calculateTotalHour();

  if (tHour + taskObj.hour > MAX_WEEKLY_HOUR) {
    alert("WEEKLY MAXIMUM HOUR EXCEEDED");
    return false;
  }

  return true;
};
const addTask = () => {
  let taskElement = document.getElementById("task");
  let hourElement = document.getElementById("hour");
  let typeElement = document.getElementById("type");

  //   alert(taskElement.value);
  //   alert(hourElement.value);
  //   alert(typeElement.value);

  //   create the task object

    const taskObject ={
      id: generateUniqueId(),
      task: taskElement.value,
      hour: parseInt(hourElement.value),
      type: typeElement.value,
  };

  

  console.log(taskObject);

  //   push the new task to task list
  taskList.push(taskObject);

  console.log(taskList);

  //   displaying the updated task list in the ui
  displayTaskList();
};

//Good Hours

const updateGoodHours = () => {
  let goodHour = taskList.reduce((acc, item) => {
    if(item.type==="good")
    return acc + parseInt(item.hour);

    else
    return acc + 0;
  }, 0);

  let goodHourElm = document.getElementById("goodHour");
  goodHourElm.innerText = goodHour;
  console.log("TOTAL:", goodHour);
}


//Bad hours
const updateBadHours = () => {
  let badHour = taskList.reduce((acc, item) => {
    if(item.type==="bad")
    return acc + parseInt(item.hour);

    else
    return acc + 0;
  }, 0);

  let badHourElm = document.getElementById("badHour");
  badHourElm.innerText = badHour;
  console.log("TOTAL:", badHour);
}

const updateTotalHours = () => {
  let totalHour = taskList.reduce((acc, item) => {
    return acc + parseInt(item.hour);
  }, 0);

  let totalHourElm = document.getElementById("totalHour");
  totalHourElm.innerText = totalHour;
  console.log("TOTAL:", totalHour);
};


const displayTaskList = () => {
  let goodListElm = document.getElementById("goodList");
  let trList = "";
  let goodcounter = 0;
  let badcounter = 0;
  //   loop through taskList
  for (item of taskList) {
    console.log("ITEM", item);
    if (item.type === "good") {
      goodcounter += 1;
      trList =
        trList +
        `<tr>
            <th scope="row">${goodcounter}</th>
            <td>${item.task}</td>
            <td>${item.hour}Hr</td>
            <td>
                <button type="button" class="btn btn-danger" onclick="deleteTask('${item.id}')">
                    <i class="fa-solid fa-eraser"></i>
                </button> <button type="button" class="btn btn-success" onclick="swapTask('${item.id}')">
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </td>
        </tr>`;
    }
  }

  goodListElm.innerHTML = trList;

  // for bad list
  let badListElm = document.getElementById("badList");
  let badtrList = "";
  //   loop through taskList
  for (item of taskList) {
    console.log("ITEM", item);
    if (item.type === "bad") {
      badcounter += 1;
      badtrList =
        badtrList +
        `<tr>
            <th scope="row" >${badcounter}</th>
            <td>${item.task}</td>
            <td>${item.hour}Hr</td>
            <td>
                </button> <button type="button" class="btn btn-warning" onclick="swapTask('${item.id}')">
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
                <button type="button" class="btn btn-danger" onclick="deleteTask('${item.id}')">
                    <i class="fa-solid fa-eraser"></i>
               
            </td>
        </tr>`;
    }
  }

  badListElm.innerHTML = badtrList;

  //   update total hours
  updateTotalHours();

  // update bad hours
  updateBadHours();
};

const deleteTask = (id) => {
  alert(id);
 // update the task list without the task with the id
  taskList = taskList.filter((item) => item.id != id);

  //   updat the toast message
  toastContentElm.innerText = "TASK DELETED";

  // show the toast
  toastBootstrap.show();

  // re render the tasklist
  displayTaskList();
};

const swapTask = (id)=>{

  alert(id);

  //get the task with the id
  let task = taskList.find(item=> item.id == id);

  // if(task.type == "good"){
  //   task.type = "bad"
  // }
  // else{
  //   task.type = "good"
  // }

  // change the task type
  task.type = task.type == "good" ? "bad" : "good";

  displayTaskList();
}

displayTaskList();