// VARIABLES
//P1
rMore = document.getElementById('read-more')

//P2
questioNaire = document.getElementById('questionaire')
qButton = document.getElementsByClassName('question')
qQuotes = [["Terrible", "I hate you!", "You Suck!"], ["Indifferent", "Eh...", "Who are you?"], ["I love you!", "You're amazing!", "Have my children!"]]

//P3
tBox = document.getElementById('t-box')

//P4
raDios = document.getElementsByClassName('radio-elem')
rCont = document.getElementById('radios');
startDialogue = document.getElementsByClassName('starting');

//P4.5
b4ore = document.getElementById('bThought');
a4ter = document.getElementById('aThought');
ranCont01 = document.getElementById('ranCont1')

//P5
agreeMent = document.getElementsByClassName('agreement');
ranCont = document.getElementById('ranCont');
bFore = document.getElementById('beforeThought');
aFter = document.getElementById('afterThought');

// P6
pPoint = document.getElementById('prove-point');

// P7
sButton = document.getElementById('smaller-button')

// p8
const noButton = document.querySelector('#myButton');
bQuotes = ["Oops", "Sorry!", "A Little Harder!!", "Promise You Can Catch Me!", "Hahah!", "Doesn't Feel So Good, Does It?", "Keep Going!", "I'm feeling SO much better!", "So close!", "Womp Womp", "This never gets old!"];
const diaChange = document.querySelector("#changeDia");
const credits = document.getElementById("creds")
let attCount = 0;

// DIALOGUE AND PROGRESSION
dialogueCont = Array.from(document.getElementsByClassName('dialogue-container'));
storySects = Array.from(document.getElementsByClassName('story-sect'));
storyCount = 0
i = 0;
delay = 2500;
let bCount = 0

const moveNoButton = () => {
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    var x = Math.random() * (window.innerWidth - (noButton.offsetWidth * 3));
    var y =  plusOrMinus * (Math.random() * (window.innerHeight - (noButton.offsetHeight)) / 2);
    var rD = Math.floor(Math.random() * bQuotes.length)
  
    noButton.style.position = 'absolute';
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
    diaChange.innerText = bQuotes[rD]
    if(attCount >= 3) {
        credits.classList.remove('dp-none')
    } else {
        attCount++ 
    }
  }

// Starting Section
rMore.addEventListener('click', (e) => {
    rMore.classList.add('angry')
    runFirstLine()
    diaLoop();
})

// Part Two
for(x = 0; x < qButton.length; x++) {
    qButton[x].addEventListener('mousedown', (e)=>{
        questioNaire.classList.add('dp-none')
        runFirstLine()
        startDialogue[0].classList.add('dp-none');
        diaLoop()
    })
}

// Part Three
tBox.addEventListener("mousedown", (e) =>{
    tBox.classList.add('dp-none');
    runFirstLine()
    startDialogue[1].classList.add('dp-none');
    diaLoop()
})

// Part Four
for(x = 0; x < raDios.length; x++) {
    raDios[x].addEventListener('mousedown', (e) =>{
        rCont.classList.add('dp-none');
        startDialogue[2].classList.add('dp-none');
        runFirstLine()
        diaLoop()
    })
}

// Part 4.5
b4ore.addEventListener("mousedown", (e) =>{
    ranCont01.classList.add('dp-none')
    runFirstLine()
    startDialogue[3].classList.add('dp-none');
    diaLoop()
})

aFter.addEventListener("mousedown", (e) =>{
    ranCont01.classList.add('dp-none')
    runFirstLine()
    startDialogue[3].classList.add('dp-none');
    diaLoop()
})

// Part Five
for(x = 0; x < agreeMent.length; x++) {
    agreeMent[x].addEventListener('mouseover', (e)=> {
        startDialogue[4].classList.add('dp-none');
        ranCont.classList.add('dp-none');
        runFirstLine()
        diaLoop()
    })
}

// Part Six
pPoint.addEventListener('click', (e) => {
    let sCChildren = dialogueCont[storyCount].children;
    dialogueCont[storyCount].children[i].classList.remove('dp-none')
    pPoint.classList.add('pnone')
    setTimeout(function() {
        dialogueCont[storyCount].children[i].classList.add('dp-none')
        pPoint.classList.remove('pnone')
        i++
        setTimeout(() =>{
            if(i == sCChildren.length) {
                storySects[storyCount].classList.add('dp-none')
                storyCount++
                storySects[storyCount].classList.remove('dp-none')
                i = 0;
            }
        }, delay + 1500)
      }, delay);
});

sButton.addEventListener('click', (e) => {
    runFirstLine()
    sButton.classList.add('pnone')
    setTimeout(() =>{
            storySects[storyCount].classList.add('dp-none')
            storyCount++
            storySects[storyCount].classList.remove('dp-none')
            i = 0;
    }, delay + 1000)

})

function diaLoop(){
    let sCChildren = dialogueCont[storyCount].children;
    if(i < sCChildren.length){ 
        setTimeout(function(){
            dialogueCont[storyCount].children[i].classList.add('dp-none');
            i++
        }, delay);
    } 
    setTimeout(() => {
        if(i < sCChildren.length) {
            dialogueCont[storyCount].children[i].classList.remove('dp-none')
            diaLoop()
        } else {
            storySects[storyCount].classList.add('dp-none')
            storyCount++
            runSupps()
            storySects[storyCount].classList.remove('dp-none')
            i = 0;
        }
    }, delay)
}

function runFirstLine(){
    dialogueCont[storyCount].children[0].classList.remove('dp-none')
}

function runSupps(){
    switch(storyCount) {
        case 1: 
            setInterval(cycleStatements, 1000, 0, bCount)
            setInterval(cycleStatements, 750, 1, bCount)
            setInterval(cycleStatements, 500, 2, bCount)
        break; 
        case 5:
            setInterval(runValve, 1000);
        break;
        case 7:
        break;
    }
}

noButton.addEventListener('mouseenter', moveNoButton);
noButton.addEventListener('click', (e) => {
    window.location.href = 'index.html'
    diaChange.innerText = 'Fuck!'    
})


function cycleStatements(x) {
    qButton[x].innerText = qQuotes[x][bCount]
    if(bCount < qQuotes[x].length - 1) {
        bCount++;
    } else {
        bCount = 0
    }
}

function runValve() {
    bFore.value--;
    aFter.value++

    if(bFore.value == 0 || aFter.value == 12) {
        bFore.classList.add('pnone');
        aFter.classList.add('pnone');
        setTimeout(function(){
            for(x = 0; x < agreeMent.length; x++) {
                agreeMent[x].classList.remove('grey');
            }
        }, 1000)
    }
}