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
const resetBtn = document.querySelector('#reset-btn');
const newCharacterForm = document.querySelector('#character-form');

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
*
*
    CODE TO RUN ON PAGE LOAD
*
*
*/

//invoke getCharacters to start fetching
getCharacters();

//1. fetch get all characters as array
const getAllCharacters = async function(){

    let response = await fetch(url, { 
        method: 'GET' //options will still look the same
    });

    let data = await response.json();
    loopCharacters(data); //data is IN SCOPE of invocation of loopCharacters
    return data;
}

//2. loop through characters
const loopCharacters = function(data) {
    data.forEach((character, i) => {
        renderCharacter(character);
    })
    
}    

//3. render span and onclick span for individual character
const renderCharacter = function(obj) {
    //store values from database
    let curName = character.name;
    let curImage = character.image;
    let curVotes = character.votes;

    //1. render their name to span at top of page
    //create span element
    let newSpan = document.createElement('span');
    //populate the span with character.name
    newSpan.innerText = curName;
    //append the span to characterBar
    characterBar.append(newSpan);  

    //2. add on click to span so information shows in the middle
    newSpan.addEventListener('click', (e) => {

        //set src in details section
        imageDetail.src = curImage;
        //set characters name in details section
        nameDetail.innerText = curName;
        //set votes in details section
        voteDetail.innerText = curVotes;
    })
}

//3. on submit form update votes div
voteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //MAKE SURE TO PARSEINT
    let formVotes = Number(e.target.votes.value);
    let curVotes = Number(voteDetail.innerText);
    //add votes together
    let newVotes = formVotes + curVotes;
    //update votes div
    voteDetail.innerText = newVotes;
})
>>>>>>> test


getAllCharacters();

/*

1. use async/await on POST to add new character to database
2. use async/await PATCH to update current characters' vote count

*/

newCharacterForm.addEventListener('submit', (e) => {
    addNewCharacter(e);
})

//get info and add to database (localhost)
const addNewCharacter = async function(e) {
    e.preventDefault();
    //get info - has to follow the structure of all other entries
    try {
        let newObject = {
            'name': e.target.name.value,
            'image': e.target['image-url'].value,
            'votes': 0
        }
        //add to database with fetch POST
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newObject)
        })
    
        let data = await res.json();
    
        //pass object to previous function to render on page 
        renderCharacter(newObject)
    //on error, catch
    } catch(e) {
        console.log(e);
    }
}