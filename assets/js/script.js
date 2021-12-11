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
var randomEmojis = [];

// Event Listeners

// Hides the start game button
startGameButtonEl.on('click', function(){
    
    // Hide start game button on document.
    startGameButtonEl.addClass('hide');

    // Displays question to document.
    renderQuestion();
})



// Fetch Requests
// Grab the emoji Data
function emojiData(){

    var url = `https://emoji-api.com/emojis?access_key=071b064c01a03d65b33d0d975453d8573c749c65`;

    // appid = Your custom API key (make an account and then add it here) 071b064c01a03d65b33d0d975453d8573c749c65
    fetch( url )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            
            //consolelogs 5 random  emojis
            for (var i = 0; i<5; i++) {
                
                var randomNum = Math.floor(Math.random()* data.length);
                console.log(randomNum);
                
                console.log(data[randomNum].character);
                
                randomEmojis.push(data[randomNum].character);
                console.log(randomEmojis);
                
                
            }

        })

};


 emojiData();
 
// Display-Render

// Displays question to document
function renderQuestion() {
     questionContainerEl.append(`
     <h2 id= "word-picker" class = "h2">Pick a noun!</h2>

     <a class="waves-effect waves-light btn-large deep-orange accent-3 btn1">Emoji 1</a>

     <a class="waves-effect waves-light btn-large deep-orange accent-3 btn2">Emoji 2</a>

     <a class="waves-effect waves-light btn-large deep-orange accent-3 btn3">Emoji 3</a>

     <a class="waves-effect waves-light btn-large deep-orange accent-3 btn4">Emoji 4</a>

     <a class="waves-effect waves-light btn-large deep-orange accent-3 btn5">Emoji 5 </a>
     `)
}

