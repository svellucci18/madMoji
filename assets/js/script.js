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
var selectedEmojis = [];
var madLibTicker = 0;
var madLibBlanks;

// Event Listeners

// Hides the start game button
startGameButtonEl.on('click', function(){
    
    // Hide start game button on document.
    startGameButtonEl.addClass('hide');

    // Displays question to document.
    madlibData();
    emojiData();
})


// Generates next question after emoji is selected

questionContainerEl.on('click', nextQuestion);

// // Saves selected emoji by pushing it via event target into the selectedEmojis array
function nextQuestion (event) {
    selectedEmojis.push(event.target.innerText);
    console.log(selectedEmojis);
    questionContainerEl.empty();
    madlibData();
    emojiData();
}


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

            // Added id's to buttons
            questionContainerEl.append(`
                
                <a id="btn-1" class="waves-effect waves-light btn-large deep-orange accent-3 btn1">${randomEmojis[0]}</a>
           
                <a id="btn-2" class="waves-effect waves-light btn-large deep-orange accent-3 btn2">${randomEmojis[1]}</a>
           
                <a id="btn-3" class="waves-effect waves-light btn-large deep-orange accent-3 btn3">${randomEmojis[2]}</a>
           
                <a id="btn-4" class="waves-effect waves-light btn-large deep-orange accent-3 btn4">${randomEmojis[3]}</a>
           
                <a id="btn-5" class="waves-effect waves-light btn-large deep-orange accent-3 btn5">${randomEmojis[4]}</a>
                `)        
        })

};


 
 
// Display-Render

function madlibData(){

    var url = `http://madlibz.herokuapp.com/api/random?minlength=5&maxlength=10`;

    

    fetch( url )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            
            madLibBlanks = data;

            console.log(madLibBlanks);

            //     // Presents the blank category of the madlib
            //     questionContainerEl.append(`
            //     <h2 id= "word-picker" class = "h2">Pick a ${data.blanks[madLibTicker]}!</h2>
           
                
            //     `)
            // // Increments after first blank has been called
            // madLibTicker++;
                
        })

};
    