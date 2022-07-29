/*
*
*
    CONSTANT DEFINITIONS
*
*
*/

//url 
const url = 'http://localhost:3000/characters';

//character bar at top of page
const characterBar = document.querySelector('#character-bar');

//elements to show details
const nameDetail = document.querySelector('#name');
const imageDetail = document.querySelector('#image');
const voteDetail = document.querySelector('#vote-count');

//vote form and reset button
const voteForm = document.querySelector('#votes-form');
const newForm = document.querySelector('#character-form')
const resetBtn = document.querySelector('#reset-btn');

//global current character - safer in javascript - HTML is easily tampered with
//but still I hate global variables
//used for PATCH and DELETE and POST 
let curChar;

/*
*
*
    FUNCTION DEFINITIONS
*
*
*/

/*
    getCharacters fetches from database > 
    passes all data to populateBar which >
    passes each piece of data to showInfo >
*/

//async await gets info from database
const getCharacters = async function(){
    //pause until we get data from server
    const res = await fetch(url);
    //pause until we translated response to json
    const data = await res.json();
    //pass data into populateBar
    populateBar(data);
}

//takes characters and creates span at top of page
const populateBar = function(characters){
    characters.forEach((el, i) => {
        addCharacter(el);
    })
}

//adds a character to the span menu bar
const addCharacter = function(character) {
    let newSpan = document.createElement('span');
    newSpan.innerText = character.name;
    //on span click invoke showCharacter to populate info in middle of page
    newSpan.addEventListener('click', function(e){
        showCharacter(el);
    })
    characterBar.append(newSpan);
}

//takes one character and shows info in middle of page
const showCharacter = function(character){
    curChar = character; //I hate global variables, set global curChar
    nameDetail.innerText = character.name;
    imageDetail.src = character.image;
    voteDetail.innerText = character.votes;
}



//updates votes for global curChar
const updateVotes = async function(e) {
    let newVotes = parseInt(e.target.votes.value);
    let curVotes = curChar.votes;
    
    try {
        let res = await fetch(`${url}/${curChar.id}`, {
            method: 'PATCH',
            body: JSON.stringify({votes: curVotes + newVotes}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let data = await res.json();
        voteDetail.innerText = data.votes;

    } catch(err) {
        console.log(err);
    }
}

//resets votes for global curChar
const resetVotes = async function() {
    try {
        //patch request
        let res = await fetch(`${url}/${curChar.id}`, {
            method: 'PATCH',
            body: JSON.stringify({votes: 0}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let data = await res.json();
        //on success update votes with 0
        voteDetail.innerText = data.votes;

    } catch(err) {
        console.log(err);
    }

}

//when votes form is submitted add new vote count to current vote
//takes in event e
const onFormSubmit = function(e){
    //change strings into numbers
    let newVotes = parseInt(e.target.votes.value);
    let curVotes = parseInt(voteDetail.innerText);
    //update value
    voteDetail.innerText = newVotes + curVotes;
    //reset form
    e.target.reset();
}

const onNewCharacter = async function(e){
    try {
        let res = await fetch(`${url}`, {
            method: 'POST',
            body: JSON.stringify({
                name: e.target.value.name,
                votes: 0,
                image: e.target['image-url'].value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let data = await res.json();
        addCharacter(data);
        showCharacter(data);
    } catch (err) {
        console.log(err);
    }
}


/*
*
*
    CODE TO RUN ON PAGE LOAD
*
*
*/

//invoke getCharacters to start fetching
getCharacters();

console.log(`outside of async/await function getCharacters is ${getCharacters()}`)

//add submit event to form
voteForm.addEventListener('submit', function(e){
    e.preventDefault();
    //invoke onFormSubmit function
    updatesVotes(e); 
})

resetBtn.addEventListener('click', function(){
    resetVotes();
})

newForm.addEventListener('submit', function(e){
    onNewCharacter(e);
})