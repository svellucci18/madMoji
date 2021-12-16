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
var displayButtonEl= $("#display");
var playAgainEl = $('#play-again');

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

    //
    displayButtonEl.addClass('hide');

    // Render Questions
    chooseMadLibBlanks();
    renderEmojiButtons();

})


// Generates next question after emoji is selected
// questionContainerEl.on('click', playMadMoji);



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
        <h2 id="madMojiTitle">${madLibBlanks.title}</h2>
        <p id="madMoji"></p>
        `)
    //Save button show
        var saveBtn = $("#recent");
    saveBtn.removeClass("hide");
    // Loops through the madlib and chosen emojis to generate a madMoji bitches
    for ( var i=0; i < madLibBlanks.value.length -2; i++) {
        $('#madMoji').append(madLibBlanks.value[i] + selectedEmojis[i] + " ");
    }
    $('#madMoji').append(madLibBlanks.value[madLibBlanks.value.length -2]);

    function saveMadmoji () {
        var madMoji = $("#madMoji")[0].textContent;
        console.log(madMoji);
        localStorage.setItem("madMoji", madMoji);

        var madMojiTitle = $("#madMojiTitle")[0].textContent;
        console.log(madMojiTitle);
        localStorage.setItem("madMojiTitle", madMojiTitle);        
    }
    
    saveBtn.on("click", saveMadmoji); 

    // Make play again button visible
    playAgainEl.removeClass("hide");

};

// Listens for a click on the play again button
playAgainEl.on("click", playAgain);

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

    var url = `https://madlibz.herokuapp.com/api/random?minlength=5&maxlength=10`;

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
        <a id="btn-1" style="font-size: 30px" class="waves-effect waves-light btn-large #FF9E80 accent-3 btn1">${randomEmojis[emojiTicker]}</a>
        <a id="btn-2" style="font-size: 30px" class="waves-effect waves-light btn-large #FF9E80 accent-3 btn2">${randomEmojis[emojiTicker + 1]}</a>
        <a id="btn-3" style="font-size: 30px" class="waves-effect waves-light btn-large #FF9E80 accent-3 btn3">${randomEmojis[emojiTicker + 2]}</a>
        <a id="btn-4" style="font-size: 30px" class="waves-effect waves-light btn-large #FF9E80 accent-3 btn4">${randomEmojis[emojiTicker + 3]}</a>
        <a id="btn-5" style="font-size: 30px" class="waves-effect waves-light btn-large #FF9E80 accent-3 btn5">${randomEmojis[emojiTicker + 4]}</a>
        `)
        
        // Increments after first blank has been called
        emojiTicker += 5;
        
        // Connector Els to the buttons in the HTML
        var btn1El = $('#btn-1');
        var btn2El = $('#btn-2');
        var btn3El = $('#btn-3');
        var btn4El = $('#btn-4');
        var btn5El = $('#btn-5');

        // Event listeners for the button els
        btn1El.on('click',playMadMoji);
        btn2El.on('click',playMadMoji);
        btn3El.on('click',playMadMoji);
        btn4El.on('click',playMadMoji);
        btn5El.on('click',playMadMoji);
    }
    
    
 function printRecentMoji(){
    displayButtonEl.addClass("hide");
    questionContainerEl.empty();
    questionContainerEl.append(`<h2>${localStorage.getItem('madMojiTitle')}</h2>`);
    questionContainerEl.append(localStorage.getItem('madMoji'));
    startGameButtonEl.addClass("hide");
    playAgainEl.removeClass('hide');
 }   

 
   
   displayButtonEl.on("click", printRecentMoji);




// This function lets the user play another round of madMoji.
function playAgain () {
    location.reload();
}

 


