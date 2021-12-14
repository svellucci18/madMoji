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
var emojiTicker = 0;
var madMojiTicker = 0;

// Page load
madlibData();
emojiData();

// Hides the start game button
startGameButtonEl.on('click', function(){
    
    // Hide start game button on document.
    startGameButtonEl.addClass('hide');

    // Render Questions
    chooseMadLibBlanks();
    renderEmojiButtons();

})


// Generates next question after emoji is selected
questionContainerEl.on('click', playMadMoji);

// Saves selected emoji by pushing it via event target into the selectedEmojis array
function playMadMoji (event) {
    if (madMojiTicker < madLibBlanks.blanks.length - 1) {
        
        selectedEmojis.push(event.target.innerText);
        console.log(selectedEmojis);
        questionContainerEl.empty();
        chooseMadLibBlanks();
        renderEmojiButtons();
        madMojiTicker++;

    } else {
        selectedEmojis.push(event.target.innerText);
        console.log(selectedEmojis);
        questionContainerEl.empty();
        printMadMoji();
    } 
}

// End game function
function printMadMoji () {
    console.log("ya' done.");
    // Prints title of the current Madlib
    questionContainerEl.append(`
        <h2>${madLibBlanks.title}</h2>
        <p id="madMoji"></p>
        `)
    
    // Loops through the madlib and chosen emojis to generate a madMoji bitches
    for ( var i=0; i < madLibBlanks.value.length -2; i++) {
        $('#madMoji').append(madLibBlanks.value[i] + selectedEmojis[i] + " ");
    }
    $('#madMoji').append(madLibBlanks.value[madLibBlanks.value.length -2]);
    
    

};


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
            
            // Collect 100 emojis
            for (var i = 0; i<100; i++) {
                // Generate a random number
                var randomNum = Math.floor(Math.random()* data.length);
                
                // Push 100 random emojis into randomEmojis array
                randomEmojis.push(data[randomNum].character);
               
            }
            console.log(randomEmojis);

        })

};

// Grab madlib data
function madlibData(){

    var url = `http://madlibz.herokuapp.com/api/random?minlength=5&maxlength=10`;

    fetch( url )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            
            madLibBlanks = data;

        })

};


// Render question headers
function chooseMadLibBlanks() {
                
    // Presents the blank category of the madlib
        console.log(madLibBlanks);
        questionContainerEl.append(`
        <h2 id= "word-picker" class = "h2">Pick an Emoji!</h2>
        `)

        // Increments after first blank has been called
        madLibTicker++;

};

// Render Emoji Buttons
function renderEmojiButtons() {
    // Added id's to buttons
        questionContainerEl.append(`
        <a id="btn-1" class="waves-effect waves-light btn-large deep-orange accent-3 btn1">${randomEmojis[emojiTicker]}</a>
        <a id="btn-2" class="waves-effect waves-light btn-large deep-orange accent-3 btn2">${randomEmojis[emojiTicker + 1]}</a>
        <a id="btn-3" class="waves-effect waves-light btn-large deep-orange accent-3 btn3">${randomEmojis[emojiTicker + 2]}</a>
        <a id="btn-4" class="waves-effect waves-light btn-large deep-orange accent-3 btn4">${randomEmojis[emojiTicker + 3]}</a>
        <a id="btn-5" class="waves-effect waves-light btn-large deep-orange accent-3 btn5">${randomEmojis[emojiTicker + 4]}</a>
        `)

        // Increments after first blank has been called
        emojiTicker += 5;

}