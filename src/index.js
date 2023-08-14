const url = "http://localhost:3000/characters"
const characterBar = document.getElementById('character-bar')
const detailName = document.getElementById('name')
const detailImage = document.getElementById('image')
const detailVote = document.getElementById('vote-count')

const voteForm = document.getElementById('votes-form')

//1. get all characters name's on nav bar
fetch(url)
.then(res => res.json())
.then(data => {
    //a. iterate over data
    data.forEach(char => {
        //2. on character name click, show details in details section
        let span = document.createElement('span')
        span.textContent = char.name 
        characterBar.append(span)
        span.addEventListener('click', (e) => {
            detailImage.src = char.image 
            detailName.textContent = char.name 
            detailVote.textContent = char.votes
        })
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