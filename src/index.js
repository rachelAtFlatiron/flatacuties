/*
TODO: trigger PATCH on reset votes button
TODO: clear middle info section on character delete
TODO: populate middle info section on new character
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
const deleteBtn = document.querySelector('#delete-btn');

//extra special global variable: keeps track of id of character being displayed in info section
let currentCharacter;

/*
*
*
    FUNCTION DEFINITIONS
*
*
*/


//1. fetch get all characters as array
const getAllCharacters = async function(){
    characterBar.innerHTML = '';
    let response = await fetch(url);

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
const renderCharacter = function(character) {
    //store values from database
    let curName = character.name;
    let curImage = character.image;
    let curVotes = character.votes;
    let curId = character.id;
    
    //1. render their name to span at top of page
    let newSpan = document.createElement('span');
    newSpan.setAttribute('character-id', curId);
    newSpan.innerText = curName;
    characterBar.append(newSpan);  

    //2. add on click to span so information shows in the middle
    newSpan.addEventListener('click', (e) => {
        currentCharacter = curId;
        console.log(`add event listner ${curId}`)
        imageDetail.src = curImage;
        nameDetail.innerText = curName;
        voteDetail.innerText = curVotes;
    })
}

//4. get new character info and add to database (localhost)
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
        console.log(data);
        //pass object to previous function to render on page 
        renderCharacter(data)
    //on error, catch
    } catch(e) {
        console.log(e);
    }
}

//5. get new votes and update in database (localhost)
const updateVotes = async function(e) {
    e.preventDefault();
    //MAKE SURE TO PARSEINT
    let formVotes = Number(e.target.votes.value);
    let curVotes = Number(voteDetail.innerText);
    //add votes together
    let newVotes = formVotes + curVotes;
    voteDetail.innerText = newVotes;

    //update votes div
    try {
        let res = await fetch(`${url}/${currentCharacter}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({votes: newVotes})
        })
        let data = await res.json(); //looks like { votes: x }
        voteDetail.innerText = data.votes; //just updating DOM
    } catch(err) {
        console.log(err)
    }  
}

//6. delete currently displayed character from database (localhost)
const deleteCharacter = async function(){
    //1. use current character, currentCharacter that gets update on span click
    //2. fetch delete to remove from database
    let res = await fetch(`${url}/${currentCharacter}`, {
        method: 'DELETE'
    })
    //3. reupdate DOM by getting everything again
    getAllCharacters();
}

/*
*
*
    CODE TO RUN ON PAGE LOAD
*
*
*/

//invoke getCharacters to start fetching
getAllCharacters();
newCharacterForm.addEventListener('submit', (e) => {
    addNewCharacter(e);
})
//on submit form update votes div
voteForm.addEventListener('submit', (e) => {
    updateVotes(e)
})
deleteBtn.addEventListener('click', (e) => {
    deleteCharacter();
})


/*
GENERAL GUIDLINES FOR PATCH/POST
1. get stuff from form
2. build new object to update database with 
3. make fetch request
4. update whatever DOM elements need to be updated
*/

/*
GENERAL GUIDLINES FOR UPDATING DOM ELEMENTS
1. get new info
2. get the DOM element to update
3. update DOMs innerText, attr, src, etc. with new info
*/