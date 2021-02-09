// Your code goes here
// I only used 6 event listeners but I spent a lot of time on this
// There were very few instructions given so I decided to make terrible ui
// I had plans to make it worse but alas I'm out of time

//attention
createPopUp();
stylePopUpOff();

//resets popup on timer
document.addEventListener('mousemove', resetTimer);
let timer = setTimeout(stylePopUpOn, 10000);

function createPopUp(){
    const div = document.createElement('div');
    const flex = document.createElement('div');
    const title = document.createElement('h1');
    const button = document.createElement('button');

    flex.appendChild(title);
    flex.appendChild(button);
    div.appendChild(flex);
    document.body.appendChild(div);

    div.id = 'popUp';
    flex.id = 'flex';
    title.id = 'question';
    button.id = 'answer';

    //disables popup on click
    button.addEventListener('click', stylePopUpOff, false);

    div.style.background = 'black';
    div.style.height = '100vh';
    div.style.margin = 0;
    div.style.position = 'absolute';
    div.style.textAlign = 'center';
    div.style.top = 0;
    div.style.width = '100vw';

    flex.style.display = 'flex';
    flex.style.flexDirection = 'column';
    flex.style.height = '100vh';

    title.style.color = 'white';
    title.style.fontFamily = 'Times New Roman, Times, serif';
    title.style.margin = 'auto auto 1% auto';
    title.textContent = 'Are you still there?';

    button.style.height = '40px';
    button.style.margin = '1% auto auto auto';
    button.style.width = '350px';
    button.textContent = 'Yes';
}

function stylePopUpOn(){
    // console.log(document.body.childNodes); //also contains comments and other stuff
    // console.log(document.body.children); //only elements
    // console.log(Array.from(document.body.children));
    
    const elements = Array.from(document.body.children);
    const notPopUp = elements.filter( element => element.id != 'popUp');
    notPopUp.forEach(element => element.style.display = 'none');

    document.getElementById('popUp').style.display = 'block';
}

function stylePopUpOff(){
    const elements = Array.from(document.body.children);
    const notPopUp = elements.filter( element => element.id != 'popUp');
    notPopUp.forEach(element => element.style.display = 'block');

    document.getElementById('popUp').style.display = 'none';

    clearTimeout(timer);
    timer = setTimeout(stylePopUpOn, 20000);
}

function resetTimer(){
    clearTimeout(timer);
    timer = setTimeout(stylePopUpOn, 10000);
}


//Detects "hacking" (open console)

//stolen from stack overflow
//https://stackoverflow.com/questions/7798748/find-out-whether-chrome-console-is-open/48287643#48287643
//since chrome 79 .defineProperty getter is only accessed when console is open
//technically not an event listener but I still count it because it detects a change in the window
let checkStatus;

let element = new Image();
Object.defineProperty(element, 'id', {
  get:function() {
    checkStatus = true;
    //don't put any alerts or console logs or timouts or really anything crazy in here, it'll not work or break other things
    throw new Error("Dev tools checker");
  }
});

//loops a lot
requestAnimationFrame(function check() {
    checkStatus = false;
    console.dir(element);
    if(checkStatus == true)
    	alert('We have detected your hacking, please close the console');
    requestAnimationFrame(check);
});

//spin
//it is a little glitchy, but if you hover over something it will start to spin
//if you hover over two or more things it will keep spinning until you are no longer hovering over anything
const spinables = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', '.btn'];
makeSpinnable(spinables);
let currentlySpinning;
let spinning;

function makeSpinnable(arr){
    arr.forEach(name => {
        document.querySelectorAll(name).forEach(element => {
            element.addEventListener('mouseenter', playSpin);
            element.addEventListener('mouseleave', stopSpin);
        });
    })
}

function playSpin(){
    console.log(this);
    const element = this; // will work even without const or let, why?
    spinning = true;
    
    const spin = function(){
        currentlySpinning = element.animate([
            //keyframes
            {transform: 'rotateY(0deg)'},
            {transform: 'rotateY(360deg)'}
        ], {
            // timing options
            duration: 1000,
            iterations: 1
        });
        if(spinning)
            spinTimer = setTimeout(spin, 1000); // will *not* work with let. why?
    }

    spin();
    
}

function stopSpin(){
    spinning = false;
}