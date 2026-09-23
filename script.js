// Page Navigation
function loadPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    selectedPage.classList.add('active');

    // Trigger random glitch effect
    if (Math.random() < 0.3) {
        triggerGlitch();
    }

    // Check if user is exploring diary
    if (pageId === 'diary') {
        setTimeout(() => {
            const finalEntry = document.getElementById('final-entry');
            finalEntry.style.display = 'block';
            triggerScareEvent();
        }, 2000);
    }

    // Check if user reached the hidden evidence page
    if (pageId === 'evidence') {
        triggerFinalScareEvent();
    }
}

// Reveal hidden text
function revealText(element) {
    element.textContent = element.getAttribute('data-text') || 
        "sounds like me.";
    element.classList.add('revealed');

    // Show final diary entry
    document.getElementById('final-entry').style.display = 'block';
    
    // Trigger scare
    triggerScareEvent();
}

// Set data attributes for hidden text
window.addEventListener('load', function() {
    const hiddenTexts = document.querySelectorAll('.hidden-text');
    hiddenTexts.forEach((el, index) => {
        if (index === 0) {
            el.setAttribute('data-text', 'sounds like me.');
        }
    });
});

// Glitch Effect
function triggerGlitch() {
    const overlay = document.getElementById('glitch-overlay');
    overlay.classList.add('active');
    
    // Create glitch sound effect
    playGlitchSound();

    setTimeout(() => {
        overlay.classList.remove('active');
    }, 200);
}

// Scare Event (with final message reveal)
function triggerScareEvent() {
    triggerGlitch();

    // Randomly show unsettling message
    const messages = [
        "She's still here...",
        "It's watching you read this...",
        "Why did you open this website?",
        "Turn off your camera."
    ];

    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    const glitchMsg = document.getElementById('glitch-msg');
    glitchMsg.textContent = randomMsg;
    glitchMsg.style.opacity = '1';

    setTimeout(() => {
        glitchMsg.style.opacity = '0';
    }, 3000);
}

// Final Scare Event
function triggerFinalScareEvent() {
    // Show the creepy final message
    document.getElementById('last-message').style.display = 'block';
    
    triggerGlitch();
    triggerGlitch(); // Double glitch for effect

    // Make page red briefly
    document.body.style.backgroundColor = '#1a0a0a';
    setTimeout(() => {
        document.body.style.backgroundColor = '#0a0a0a';
    }, 500);

    // Play scary sound
    playScareSound();
}

// Photo Click Handler
function clickPhoto(photoElement) {
    // Randomly glitch the photo
    if (Math.random() < 0.5) {
        photoElement.classList.add('glitched');
        setTimeout(() => {
            photoElement.classList.remove('glitched');
        }, 500);
        triggerGlitch();
    }
}

// Sound Effects (using Web Audio API)
function playGlitchSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.1);

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function playScareSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;

    // Create a more intense scare sound
    for (let i = 0; i < 3; i++) {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(200 + (i * 50), now + (i * 0.05));
        oscillator.frequency.exponentialRampToValueAtTime(100, now + (i * 0.05) + 0.15);

        gain.gain.setValueAtTime(0.4, now + (i * 0.05));
        gain.gain.exponentialRampToValueAtTime(0.01, now + (i * 0.05) + 0.15);

        oscillator.start(now + (i * 0.05));
        oscillator.stop(now + (i * 0.05) + 0.15);
    }
}

// Random glitch messages during gameplay
setInterval(() => {
    if (Math.random() < 0.02) { // 2% chance every check
        triggerGlitch();
    }
}, 3000);

// Easter egg: change cursor behavior
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.001) {
        document.body.style.filter = 'invert(1)';
        setTimeout(() => {
            document.body.style.filter = 'invert(0)';
        }, 100);
    }
});