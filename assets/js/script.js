/*
1. user landing page action (start game button)
2. event listener to start game 
    start game function
    indetify criteria (loop)
3. 2 fetch requests
    madlibs
    openemoji
4. render buttons
    separate arrays (nouns,verbs,adverbs,adjectives)
5. display completed madlib
6. restart game 

*/

// Global Vars

//Listener for start game button
var startGameButtonEl = $('#start-game');
var questionContainerEl = $('#question-container');

// Event Listeners

// Hides the start game button
startGameButtonEl.on('click', function(){
    
    // Hide start game button on document.
    startGameButtonEl.addClass('hide');

    // Displays question to document.
    renderQuestion();
})



// Fetch Requests




// Display-Render

// Displays question to document
function renderQuestion() {
     questionContainerEl.append(`
     <h2 id= "word-picker" class = "h2">Pick a noun!</h2>

     <a class="waves-effect waves-light btn-large deep-orange accent-3">Emoji 1</a>

     <a class="waves-effect waves-light btn-large deep-orange accent-3">Emoji 2</a>

     <a class="waves-effect waves-light btn-large deep-orange accent-3">Emoji 3</a>

     <a class="waves-effect waves-light btn-large deep-orange accent-3">Emoji 4</a>

     <a class="waves-effect waves-light btn-large deep-orange accent-3">Emoji 5 </a>
     `)
}