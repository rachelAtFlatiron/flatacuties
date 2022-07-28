/*
    CONSTANT DEFINITIONS
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
const resetBtn = document.querySelector('#reset-btn');

/*
    FUNCTION DEFINITIONS
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
        let newSpan = document.createElement('span');
        newSpan.innerText = el.name;
        //on span click invoke showCharacter to populate info in middle of page
        newSpan.addEventListener('click', function(e){
            showCharacter(el);
        })
        characterBar.append(newSpan);
    })
}

//takes one character and shows info in middle of page
const showCharacter = function(character){
    nameDetail.innerText = character.name;
    imageDetail.src = character.image;
    voteDetail.innerText = character.votes;
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

/*
    CODE TO RUN ON PAGE LOAD
*/
//invoke getCharacters 
/*
    getCharacters fetches from database > 
    passes all data to populateBar >
    passes each piece of data to showInfo >
    
*/
getCharacters();
//add submit event to form
voteForm.addEventListener('submit', function(e){
    e.preventDefault();
    //invoke onFormSubmit function
    onFormSubmit(e); 
})