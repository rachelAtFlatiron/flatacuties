// Your code here
const url = 'http://localhost:3000/characters';
const characterBar = document.querySelector('#character-bar');
const nameDetail = document.querySelector('#name');
const imageDetail = document.querySelector('#image');
const voteDetail = document.querySelector('#vote-count');
const voteForm = document.querySelector('#votes-form');
const resetBtn = document.querySelector('#reset-btn');

const getCharacters = async function(){
    let res = await fetch(url)
    let characters = await res.json();
    populateBar(characters);
}
const populateBar = function(characters){
    characters.forEach((el, i) => {
        let newSpan = document.createElement('span');
        newSpan.innerText = el.name;
        newSpan.addEventListener('click', function(e){
            showCharacter(el);
        })
        characterBar.append(newSpan);
    })
}

const showCharacter = function(character){
    nameDetail.innerText = character.name;
    imageDetail.src = character.image;
    voteDetail.innerText = character.votes;
}

const onFormSubmit = function(e){
    let newVotes = parseInt(e.target.votes.value);
    let curVotes = parseInt(voteDetail.innerText);
    voteDetail.innerText = newVotes + curVotes;
    e.target.reset();
}



// fetch(url)
// .then(res => res.json())
// .then(data => {
//     console.log(data);
//     populateBar(data);
// })
getCharacters();

voteForm.addEventListener('submit', function(e){
    e.preventDefault();
    onFormSubmit(e); 
})