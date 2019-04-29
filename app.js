/*
 * Create a list that holds all of your cards
 */
let cardArray = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-cube', 'fa-diamond', 'fa-diamond', 'fa-plane', 'fa-leaf', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-plane', 'fa-cube'];
 let card = document.getElementsByClassName("card");

const deck =document.getElementById("cards");
const cards= document.querySelectorAll('.card');
console.log(cards);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let lock = false;
let firstClick=null,secondClick=null;
let li1=null, li2=null;//element of firstClick and secondClick
//move(s) variables
let moves =0;
 let finalMoves=document.querySelector(".finMoves")
 let finalTime=document.querySelector(".finTimer")
let counter =document.querySelector(".moves");
let matchedCard=0;
// star icon variable
const allStars =document.querySelectorAll(".fa-star");
console.log(allStars,"STAR");
let currentStars = 3;
let finalStars = document.querySelector(".nump-stars");
// Time variables
let timer= document.querySelector(".timer");
let startGame= 0;
let gameInterval;

let modal = document.querySelector('.theEnd')

const buttonRertart= document.getElementsByClassName('restart')
// <<<<<< End of objects and variables declaration section <<<<<<

// >>>>>> Functions declaration section >>>>>>

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Timer function initialization
 let sec = 0,min =0;

function starTimer(){
    gameInterval= setInterval(function(){
        timer.innerHTML = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
        sec++;
        if (sec==60){
            min++;
            sec=0;
        }
    },1000);
}
//function add the final moves,time,stars
function endOfGame(){
    clearInterval(gameInterval);
    finalMoves.innerHTML= moves;
    finalTime.innerHTML = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
    finalStars.innerHTML = currentStars;

}
function displaySymbol(el){
    el.classList.add("open");
    el.classList.add("show");
}
function closeNotmatchedCa(){
    let els =document.getElementsByClassName('notMatch');
    Array.from(els).forEach(el =>{
        el.classList.remove('notMatch');
        el.classList.remove('show');
        el.classList.remove('open');
    });
}
function restartClick() {
    firstClick = null;
    secondClick = null;
}

function calculateStars() {
    if (moves < 10 ) {
        currentStars = 3;
    }
    else if (moves < 15){
        currentStars = 2;
    }
    else{
        currentStars = 1;        
    }
}
// add the moves and define the stars
function moveCounter(){
    moves++;
    counter.innerHTML =moves;
    calculateStars();
    
    if (currentStars === 2 ) {
        allStars[0].classList.remove("fa-star");
    }
    else if (currentStars === 1 ) {
        allStars[1].classList.remove("fa-star");
    }
}
// restart the game
function restartValue(){
    for (let x=0;x<3;x++){
        allStars[x].classList.remove('hide');
    }
    clearInterval(gameInterval);
    min = 0;
    sec = 0;
    matchedCard=0;
    startGame=0;
    moves=0;
    counter.textContent=0;
    li1=null;
    li2=null;
    modal.classList.remove('showed');
    modal.classList.add('hide');
}
//****The Game Dynamic****



const newCard = cardClass => {
    let li = document.createElement('li');
    li.classList.add("card");
    let icon =document.createElement("i");
    li.appendChild(icon);
    icon.classList.add("fa");
    icon.classList.add(cardClass);
    return li;

};
const pickCard = card => {
    card.addEventListener('click',function(e){
        if (startGame === 0){
            starTimer();
            startGame ++;
        }
        let li = e.currentTarget;
        console.log(li);
        if (lock || li.classList.contains('open')&& li.classList.contains('show')){
            return true;
        }
        let icon =li.getElementsByClassName('fa')[0].className;
        if(firstClick === null && secondClick ===null){
            firstClick =icon;
            li1 =li;
        } else if (firstClick !==null && secondClick === null ){
            secondClick = icon;
            li2 = li;

            if (firstClick === secondClick){
                li1.classList.add('match');
                li1.classList.add('true');
                li2.classList.add('match');
                li2.classList.add('true');
                matchedCard++;
                if (matchedCard === 8){
                    endOfGame()
                    modal.classList.remove('hide')
                    modal.classList.add('showed')
                }
            }else{
                li1.classList.add ('notMatch');
                li2.classList.add('notMatch');
                setTimeout(function(){
                    closeNotmatchedCa()
                }, 750)
            }
            moveCounter();
            restartClick();
        }
        displaySymbol(li);             

    })
};

function gameBegen(){
    restartValue();
    restartClick();
    endOfGame();
    timer.innerHTML='00:00';
    let list = document.getElementsByClassName("deck");

    list[0].innerHTML = '';

    let cardsShuffled = shuffle(cardArray);
    for (let card of cardsShuffled){
        let li = newCard(card);
        list[0].appendChild(li);

    }
    let cards = list[0].getElementsByClassName("card")
    for (let card of cards){
        pickCard(card);
    }
}

gameBegen();

Array.from(buttonRertart).forEach(el =>{
    el.addEventListener('click',function(){
        gameBegen()
    })
});