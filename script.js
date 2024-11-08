

// variables 

let link = document.getElementById("link");
let volumeSlider = document.getElementById("volumeControl");
let progressControl = document.getElementById("progressControl");
let play = document.getElementById("play");
let pause = document.getElementById("pause");
let reset = document.getElementById("reset");
let refresh = document.getElementById("refresh");
let fileInput = document.getElementById("fileInput");
let audioLinkDisplay = document.getElementById("audioLinkDisplay");
let currentTimeDisplay = document.getElementById("currentTime");
let totalTimeDisplay = document.getElementById("totalTime");

let audio;  // Declare audio variable
let isPlaying = false;

// Format seconds into mm:ss format
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;  // Add leading zero if less than 10
    return minutes + ":" + secs;
}



// Play button functionality
play.addEventListener("click", () => {
    let source = link.value ? link.value : null;
    if (fileInput.files.length > 0) {
        source = URL.createObjectURL(fileInput.files[0]); // Get the uploaded file
    }

    if (source) {
        if (!audio) {
            // Create a new audio object if it doesn't exist
            audio = new Audio(source);
            audioLinkDisplay.textContent = "Playing: " + (link.value || fileInput.files[0].name);
            
            // Update the progress bar max value based on the duration once loaded
            audio.addEventListener('loadedmetadata', () => {
                progressControl.max = audio.duration;
                totalTimeDisplay.textContent = formatTime(audio.duration);  // Display total duration
            });

            // Update progress bar and current time as audio plays
            audio.addEventListener('timeupdate', () => {
                progressControl.value = audio.currentTime;
                currentTimeDisplay.textContent = formatTime(audio.currentTime);  // Display current time
            });
        }

        audio.play();  // Play the audio
        isPlaying = true;
        console.log("Audio playing:", source);
    } else {
        alert("Please provide an MP3 link or upload an audio file.");
    }
});



// Pause button functionality
pause.addEventListener("click", () => {
    if (audio && isPlaying) {
        audio.pause();  // Pause the audio
        isPlaying = false;
        console.log("Audio paused");
    }
});



// Reset button functionality
reset.addEventListener("click", () => {
    if (audio) {
        audio.pause(); // Pause the audio
        audio.currentTime = 0; // Reset to the beginning
        progressControl.value = 0; // Reset progress bar
        currentTimeDisplay.textContent = "0:00"; // Reset current time display
        isPlaying = false;
        console.log("Audio reset");
    }
});




// Refresh button functionality
refresh.addEventListener("click", () => {
    location.reload(); // Refresh the page
});




// Volume control functionality
volumeSlider.addEventListener("input", function() {
    if (audio) {
        audio.volume = this.value;  // Set audio volume based on slider value
        console.log("Volume:", audio.volume);
    }
});




// Progress bar control functionality
progressControl.addEventListener("input", function() {
    if (audio) {
        audio.currentTime = this.value;  // Set audio current time based on slider value
        console.log("Current time:", audio.currentTime);
    }
});