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

//1. fetch get all characters as array
fetch(url)
.then(res => res.json())
.then(data => loopCharacters(data))
.catch(err => console.log(err));


//2. loop through characters
const loopCharacters = function(data) {
    
    data.forEach((character, i) => {
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