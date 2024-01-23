//pobranie wszysktich potrzebnych elementów

const timer = document.querySelector('.timer');
const start = document.querySelector('.start-btn');
const pomodoro = document.querySelector('#pom');
const shortbreak = document.querySelector('#short-break');
const longbreak = document.querySelector('#long-break');
const container = document.querySelector('.timer-container');
const tasks = document.querySelector('#task-container')
const settings = document.querySelector('.settings')
const modal = document.querySelector('#modal')
const addtaskbtn = document.querySelector('.addtask')
const savetaskbtn = document.querySelector('#save-task')
const settingssection = document.querySelector('#settings-section')
const addtasksection = document.querySelector('#task-section')
let currentmode;

//ustawienie domyślniego stylu
currentmode = 'pomodoro'

//ustawienie odrazu po załodowaniu
window.addEventListener('DOMContentLoaded', () => {
  let statuse = 'start';
  let newtime;
  let countdowntimer;
  pomodoro.classList.add('active');

  //wydarzenie przycisku start
  start.addEventListener('click', () => {
    //warunek sprawdzający status timera
    if (statuse === 'start') {

      //warunek sprawdzajacy tryb
      if (currentmode === 'pomodoro') {
        countdown(setting[0].time, 'cont');
      } else if (currentmode === 'short') {
        countdown(setting[1].time, 'cont');
      } else if (currentmode === 'long') {
        countdown(setting[2].time, 'cont');
      }

    } else if (statuse === 'cont') {
      clearInterval(countdowntimer);
      statuse = 'paused';
      start.textContent = 'unpause';
      
    }
    else if(statuse==='paused'){
      countdown(newtime,'cont')
    }
  });

  //odliczanie
  const countdown = (secs, status) => {
    let time = secs;
    start.textContent = 'pause';
    countdowntimer = setInterval(() => {
      let minutes = Math.floor(time / 60);
      let seconds = (time % 60).toString().padStart(2, '0');
      timer.textContent = `${minutes}:${seconds}`;
      
      if (status === 'cont') {
        //aktualizacja nowego czasu , potrzebna po odpauzowaniu
        time--;
        newtime = time;
        statuse = status;
      }

      if (time < 0) {
        clearInterval(countdowntimer);
      }
    }, 1000);
  };

//aktualizacja trybów

const toggleactiveMode = (mode, duration , bgcolor) => {
  clearInterval(countdowntimer);
  let minutes = Math.floor(duration / 60);
  let seconds = (duration % 60).toString().padStart(2, '0');
  timer.textContent = `${minutes}:${seconds}`;
  currentmode = mode;
  pomodoro.classList.toggle('active', currentmode === 'pomodoro');
  shortbreak.classList.toggle('active', currentmode === 'short');
  longbreak.classList.toggle('active', currentmode === 'long');
  container.style.backgroundColor = bgcolor;
  tasks.style.backgroundColor = bgcolor;
};
//tryb dlugiej przerwy
longbreak.addEventListener('click', () => {
  toggleactiveMode(setting[2].mode,setting[2].time, setting[2].bgcolor);
});
//tryb krotkiej przerwy
shortbreak.addEventListener('click', () => {
  toggleactiveMode(setting[1].mode,setting[1].time, setting[1].bgcolor);
});
//tryb pomodoro
pomodoro.addEventListener('click', () => {
  toggleactiveMode(setting[0].mode,setting[0].time, setting[0].bgcolor);
});


//pobranie czasu w celu utworzenia prostego identyfikatora 
const d = new Date();
let time = d.getTime();

//tworzenie zadań

const addingTasks = (content) => { 
  const task = document.createElement('div');
  const btncontainer = document.createElement('div');
  btncontainer.classList.add('btn-container')
  task.classList.add('task')
  const taskcontent = document.createElement('span');
  taskcontent.classList.add('task-text')
  tasks.appendChild(task)
  task.appendChild(taskcontent)
  const deletebtn = document.createElement('i')
  deletebtn.classList.add('fa-solid')
  deletebtn.classList.add('fa-trash')
  const donebtn = document.createElement('i')
  donebtn.classList.add('fa-solid')
  donebtn.classList.add('fa-check')
  task.appendChild(btncontainer)
  btncontainer.appendChild(donebtn)
  btncontainer.appendChild(deletebtn)
  //dodawanie unikalnego identyfikatora
  task.setAttribute('data-id',time)
  taskcontent.textContent = content;
  //usuwanie zadania
  deletebtn.addEventListener('click',function(e){
    const sekcja = document.querySelector('#task-container')
    const element = e.currentTarget.parentElement.parentElement;
    console.log(element)
   sekcja.removeChild(element);
  })
  //zaznaczanie i odznaczanie jako skończonego
    donebtn.addEventListener('click', function () {
      if(taskcontent.style.textDecoration){
        taskcontent.style.textDecoration = '';
        taskcontent.style.textDecorationColor = 'white';
      }else{
        taskcontent.style.textDecoration = 'line-through';
        taskcontent.style.textDecorationColor = 'green';
      }
    });

  
} 

//zapisywanie zadań
savetaskbtn.addEventListener('click', function(){
  const task = document.querySelector('#task').value
  addingTasks(task)
  modal.style.display="none"
})
//pokazywanie modala z dodawaniem zadania
addtaskbtn.addEventListener('click',function(){
  document.querySelector('#task').value =''
  modal.style.display = 'inherit';
  addtasksection.style.display ='inherit';
  settingssection.style.display='none'
})
//pokazywanie modala z ustawieniami
settings.addEventListener('click', () => { 
  modal.style.display = 'inherit'
  addtasksection.style.display ='none';
  settingssection.style.display='flex'
  const savebtn = document.querySelector('#save-btn')
  //zapisywanie zmienionych ustawień
  savebtn.addEventListener('click', () => { 
    const min = document.querySelector('#min')
    const sec = document.querySelector('#sec')
    const bgcolor = document.querySelector('#bg-color')
    let duration = Number(min.value) * 60 + Number(sec.value);
    let color = bgcolor.value
    tasks.style.backgroundColor = color;
    toggleactiveMode(currentmode, duration, color)
    for(let i = 0 ; i<setting.length ; i++){
      if(setting[i].mode === currentmode){
        setting[i].bgcolor = color;
        setting[i].time = duration;
      }
    }
    
  })
})
//zamykanie modala poprzez kliknięcie poza jego obszar
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//ustawienia domyślne poszczególnych trybów

const setting = [{
mode:'pomodoro',
bgcolor:'rgba(22, 48, 70, 0.9)',
time:900
},

{
mode:'short',
bgcolor:'purple',
time:300
},

{
mode:'long',
bgcolor:'gray',
time:600
}]


});

