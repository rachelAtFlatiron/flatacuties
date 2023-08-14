const url = "http://localhost:3000/characters"
const characterBar = document.getElementById('character-bar')
const detailName = document.getElementById('name')
const detailImage = document.getElementById('image')
const detailVote = document.getElementById('vote-count')
const resetBtn = document.getElementById('reset-btn')
const voteForm = document.getElementById('votes-form')
const characterForm = document.getElementById('character-form')
//1. get all characters name's on nav bar
fetch(url)
.then(res => res.json())
.then(data => {
    //a. iterate over data
    data.forEach(char => {
        //2. on character name click, show details in details section
        addToNav(char)
    })
})

//3. on form submit add votes to total votes
voteForm.addEventListener('submit', (e) => {
    e.preventDefault() //DON'T FORGET THIS
    let formVotes = parseInt(e.target.votes.value) 
    let curVotes = parseInt(detailVote.textContent)
    detailVote.textContent = formVotes + curVotes
})

//add submit event listener
//prevent default
//get number from form
//get current votes from page
//add form and current votes
//update votes on page

//4. on reset button click, reset votes
resetBtn.addEventListener('click', () => {
    //get the votes element
    //set votes element to 0  
    detailVote.textContent = 0  
})

//5. add new character 
//get character form
//when the character form is submitted...
characterForm.addEventListener('submit', (e) => {
    //e.preventDefault()
    e.preventDefault()
    //get all the info
    let newName = e.target.name.value 
    let newImage = e.target["image-url"].value 
    let newVotes = 0
    let newObj = {
        name: newName,
        image: newImage,
        votes: newVotes
    }
    //add span to character bar
    addToNav(newObj)
    //immediately show new character on form submit
    detailImage.src = newObj.image
    detailName.textContent = newObj.name
    detailVote.textContent = newObj.votes
})


function addToNav(char) {
    let span = document.createElement('span')
    span.textContent = char.name
    characterBar.append(span)
    span.addEventListener('click', (e) => {
        detailImage.src = char.image
        detailName.textContent = char.name
        detailVote.textContent = char.votes
    })
}