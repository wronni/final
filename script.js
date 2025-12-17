// SenseFlow Prototype - Multisensory Accessible Interaction
// Gesture-based navigation with sound, motion, and haptic feedback

// State Management
const state = {
    currentScreen: 1,
    selectedDirection: null,
    feedbackSettings: {
        sound: true,
        motion: true,
        haptic: true
    },
    stats: {
        gestures: 0,
        sounds: 0,
        haptics: 0
    },
    touchStart: null,
    touchEnd: null
};

// Web Audio API Context
let webAudioContext = null;
let audioInitialized = false;

// Initialize Web Audio API
function initAudio() {
    try {
        webAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioInitialized = true;
        console.log('Audio initialized successfully');
    } catch (e) {
        console.error('Web Audio API not supported:', e);
    }
}

// Generate a tone using Web Audio API
function playTone(frequency, duration, type = 'sine') {
    if (!state.feedbackSettings.sound || !audioInitialized) return;

    try {
        const oscillator = webAudioContext.createOscillator();
        const gainNode = webAudioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(webAudioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        // Envelope for smoother sound
        gainNode.gain.setValueAtTime(0, webAudioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, webAudioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, webAudioContext.currentTime + duration);

        oscillator.start(webAudioContext.currentTime);
        oscillator.stop(webAudioContext.currentTime + duration);

        state.stats.sounds++;
        console.log(`Playing ${type} tone at ${frequency}Hz for ${duration}s`);
    } catch (e) {
        console.error('Error playing sound:', e);
    }
}

// Play sound feedback with different tones for different actions
function playSound(type) {
    if (!state.feedbackSettings.sound || !audioInitialized) return;

    switch(type) {
        case 'clickSound':
            playTone(800, 0.1, 'sine');
            break;
        case 'successSound':
            playTone(600, 0.15, 'sine');
            setTimeout(() => playTone(800, 0.15, 'sine'), 100);
            break;
        case 'swipeSound':
            playTone(400, 0.08, 'sine');
            break;
        case 'directionSound':
            playTone(700, 0.12, 'triangle');
            break;
        default:
            playTone(500, 0.1, 'sine');
    }
}

// Haptic feedback using Vibration API
function triggerHaptic(pattern = [50]) {
    if (!state.feedbackSettings.haptic) return;

    if ('vibrate' in navigator) {
        try {
            const success = navigator.vibrate(pattern);
            if (success) {
                state.stats.haptics++;
                console.log(`Haptic triggered: ${pattern}`);
            } else {
                console.log('Haptic feedback failed');
            }
        } catch (e) {
            console.error('Haptic error:', e);
        }
    } else {
        console.log('Vibration API not supported');
    }
}

// Enhanced haptic patterns
const hapticPatterns = {
    light: [20],
    medium: [50],
    strong: [100],
    success: [50, 50, 100],
    direction: [30, 20, 30]
};

// Screen Reader Announcements
function announce(message) {
    const announcer = document.getElementById('announcements');
    announcer.textContent = message;

    setTimeout(() => {
        announcer.textContent = '';
    }, 1000);
}

// Update Progress Bar
function updateProgress(percentage) {
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = `${percentage}%`;
    progressFill.parentElement.setAttribute('aria-valuenow', percentage);
}

// Navigate to Screen
function navigateToScreen(screenNumber, animate = true) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    const targetScreen = document.getElementById(`screen${screenNumber}`);
    if (targetScreen) {
        if (animate && state.feedbackSettings.motion) {
            targetScreen.style.animation = 'fadeIn 0.5s ease-in-out';
        }

        targetScreen.classList.add('active');
        state.currentScreen = screenNumber;

        // Update progress (4 screens = 25% each)
        const progress = ((screenNumber - 1) / 3) * 100;
        updateProgress(progress);

        // Focus on first interactive element
        setTimeout(() => {
            const firstButton = targetScreen.querySelector('button:not([disabled])');
            if (firstButton) {
                firstButton.focus();
            }
        }, 100);
    }
}

// Add click effect animation
function addClickEffect(element) {
    console.log('Adding click effect, motion enabled:', state.feedbackSettings.motion);

    if (!state.feedbackSettings.motion) return;

    element.classList.add('clicked');
    console.log('Click effect added to element');
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 300);
}

// Touch and Swipe Detection
function initGestureDetection() {
    const screens = document.querySelectorAll('.screen');

    screens.forEach(screen => {
        screen.addEventListener('touchstart', handleTouchStart, { passive: true });
        screen.addEventListener('touchend', handleTouchEnd, { passive: true });
    });
}

function handleTouchStart(e) {
    const touch = e.touches[0];
    state.touchStart = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
    };
}

function handleTouchEnd(e) {
    if (!state.touchStart) return;

    const touch = e.changedTouches[0];
    state.touchEnd = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
    };

    handleSwipe();
}

function handleSwipe() {
    if (!state.touchStart || !state.touchEnd) return;

    const deltaX = state.touchEnd.x - state.touchStart.x;
    const deltaY = state.touchEnd.y - state.touchStart.y;
    const deltaTime = state.touchEnd.time - state.touchStart.time;

    // Minimum swipe distance and maximum time
    const minSwipeDistance = 50;
    const maxSwipeTime = 500;

    if (deltaTime > maxSwipeTime) return;

    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        // Horizontal swipe
        if (deltaX > 0) {
            handleSwipeRight();
        } else {
            handleSwipeLeft();
        }
    } else if (Math.abs(deltaY) > minSwipeDistance) {
        // Vertical swipe
        if (deltaY > 0) {
            handleSwipeDown();
        } else {
            handleSwipeUp();
        }
    }

    // Reset touch state
    state.touchStart = null;
    state.touchEnd = null;
}

function handleSwipeRight() {
    state.stats.gestures++;
    playSound('swipeSound');
    triggerHaptic(hapticPatterns.light);

    // Swipe right could mean "next" or contextual action
    if (state.currentScreen === 1) {
        handleBegin();
    } else if (state.currentScreen === 2) {
        // Select forward direction
        handleDirectionChoice('forward');
    }
}

function handleSwipeLeft() {
    state.stats.gestures++;
    playSound('swipeSound');
    triggerHaptic(hapticPatterns.light);

    // Swipe left could mean "back"
    if (state.currentScreen > 1 && state.currentScreen < 4) {
        navigateToScreen(state.currentScreen - 1);
        announce('Going back');
    }
}

function handleSwipeUp() {
    state.stats.gestures++;
    playSound('swipeSound');
    triggerHaptic(hapticPatterns.light);

    if (state.currentScreen === 2) {
        handleDirectionChoice('up');
    }
}

function handleSwipeDown() {
    state.stats.gestures++;
    playSound('swipeSound');
    triggerHaptic(hapticPatterns.light);

    if (state.currentScreen === 2) {
        handleDirectionChoice('down');
    }
}

// Handle Begin Button (Screen 1 -> Screen 2)
function handleBegin() {
    playSound('clickSound');
    triggerHaptic(hapticPatterns.medium);
    announce('Starting SenseFlow experience');

    setTimeout(() => {
        navigateToScreen(2);
        announce('Follow the path. Swipe or tap a direction.');
    }, 300);
}

// Handle Direction Choice (Screen 2 -> Screen 3)
function handleDirectionChoice(direction) {
    state.selectedDirection = direction;
    state.stats.gestures++;

    playSound('directionSound');
    triggerHaptic(hapticPatterns.direction);

    const directionLabels = {
        up: 'Explore',
        forward: 'Continue',
        down: 'Discover'
    };

    announce(`Selected: ${directionLabels[direction]}`);

    setTimeout(() => {
        navigateToScreen(3);
        announce('Customize your sensory feedback');
    }, 400);
}

// Toggle Sensory Feedback
function toggleFeedback(type) {
    state.feedbackSettings[type] = !state.feedbackSettings[type];

    const toggleBtn = document.getElementById(`${type}Toggle`);
    const isActive = state.feedbackSettings[type];

    if (isActive) {
        toggleBtn.classList.add('active');
        toggleBtn.setAttribute('aria-pressed', 'true');
    } else {
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-pressed', 'false');
    }

    // Provide feedback about the toggle
    if (state.feedbackSettings[type]) {
        playSound('clickSound');
        triggerHaptic(hapticPatterns.light);
    }

    announce(`${type} feedback ${isActive ? 'enabled' : 'disabled'}`);
}

// Test Feedback
function testFeedback() {
    announce('Testing feedback');

    // Test all enabled feedback types
    if (state.feedbackSettings.sound) {
        playSound('successSound');
    }

    if (state.feedbackSettings.motion) {
        const testBtn = document.getElementById('testFeedback');
        addClickEffect(testBtn);
    }

    if (state.feedbackSettings.haptic) {
        triggerHaptic(hapticPatterns.success);
    }
}

// Continue to Completion (Screen 3 -> Screen 4)
function handleContinue() {
    playSound('successSound');
    triggerHaptic(hapticPatterns.success);
    announce('Completing SenseFlow experience');

    // Update completion stats
    document.getElementById('gestureCount').textContent = state.stats.gestures;
    document.getElementById('soundCount').textContent = state.stats.sounds;
    document.getElementById('hapticCount').textContent = state.stats.haptics;

    setTimeout(() => {
        navigateToScreen(4);
        announce('Experience complete! Your multisensory journey is finished.');
    }, 300);
}

// Start Over (Screen 4 -> Screen 1)
function handleStartOver() {
    playSound('clickSound');
    triggerHaptic(hapticPatterns.medium);
    announce('Starting over');

    // Reset stats but keep feedback settings
    state.stats = {
        gestures: 0,
        sounds: 0,
        haptics: 0
    };
    state.selectedDirection = null;

    setTimeout(() => {
        navigateToScreen(1);
        announce('Welcome back to SenseFlow');
    }, 300);
}

// Initialize Event Listeners
function initEventListeners() {
    // Screen 1: Begin button
    const beginBtn = document.getElementById('beginBtn');
    if (beginBtn) {
        beginBtn.addEventListener('click', (e) => {
            addClickEffect(e.currentTarget);
            handleBegin();
        });
    }

    // Screen 2: Direction buttons
    document.querySelectorAll('[data-direction]').forEach(button => {
        button.addEventListener('click', (e) => {
            addClickEffect(e.currentTarget);
            const direction = e.currentTarget.dataset.direction;
            handleDirectionChoice(direction);
        });
    });

    // Screen 3: Toggle buttons
    const soundToggle = document.getElementById('soundToggle');
    const motionToggle = document.getElementById('motionToggle');
    const hapticToggle = document.getElementById('hapticToggle');

    if (soundToggle) {
        soundToggle.addEventListener('click', (e) => {
            addClickEffect(e.currentTarget);
            toggleFeedback('sound');
        });
    }

    if (motionToggle) {
        motionToggle.addEventListener('click', (e) => {
            addClickEffect(e.currentTarget);
            toggleFeedback('motion');
        });
    }

    if (hapticToggle) {
        hapticToggle.addEventListener('click', (e) => {
            addClickEffect(e.currentTarget);
            toggleFeedback('haptic');
        });
    }

    // Test feedback button
    const testFeedbackBtn = document.getElementById('testFeedback');
    if (testFeedbackBtn) {
        testFeedbackBtn.addEventListener('click', (e) => {
            addClickEffect(e.currentTarget);
            testFeedback();
        });
    }

    // Continue button (Screen 3 -> Screen 4)
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', (e) => {
            addClickEffect(e.currentTarget);
            handleContinue();
        });
    }

    // Start over button (Screen 4 -> Screen 1)
    const startOverBtn = document.getElementById('startOver');
    if (startOverBtn) {
        startOverBtn.addEventListener('click', (e) => {
            addClickEffect(e.currentTarget);
            handleStartOver();
        });
    }

    // Keyboard navigation enhancements
    document.addEventListener('keydown', (e) => {
        // Arrow keys for navigation on screen 2
        if (state.currentScreen === 2) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                handleDirectionChoice('up');
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleDirectionChoice('forward');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                handleDirectionChoice('down');
            }
        }

        // Escape key to go back
        if (e.key === 'Escape' && state.currentScreen > 1 && state.currentScreen < 4) {
            navigateToScreen(state.currentScreen - 1);
            announce('Going back');
        }

        // Enter/Space for primary action
        if ((e.key === 'Enter' || e.key === ' ') && document.activeElement.tagName !== 'BUTTON') {
            if (state.currentScreen === 1) {
                e.preventDefault();
                handleBegin();
            }
        }
    });
}

// Check for Vibration API support
function checkHapticSupport() {
    if (!('vibrate' in navigator)) {
        console.log('Haptic feedback not supported on this device');
        const hapticToggle = document.getElementById('hapticToggle');
        if (hapticToggle) {
            hapticToggle.disabled = true;
            hapticToggle.style.opacity = '0.5';
            const label = hapticToggle.querySelector('.control-label');
            if (label) {
                label.textContent += ' (Not Supported)';
            }
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('SenseFlow initializing...');

    initEventListeners();
    initGestureDetection();
    checkHapticSupport();
    navigateToScreen(1, false);
    announce('Welcome to SenseFlow. A multisensory interaction experience.');

    console.log('Initial state:', state);

    // Initialize audio on first user interaction (required by browsers)
    const enableAudio = () => {
        if (!audioInitialized) {
            initAudio();
            console.log('Audio enabled by user interaction');
        }
    };

    document.body.addEventListener('click', enableAudio, { once: true });
    document.body.addEventListener('touchstart', enableAudio, { once: true });
    document.body.addEventListener('keydown', enableAudio, { once: true });

    console.log('SenseFlow initialization complete');
});

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        state,
        navigateToScreen,
        handleBegin,
        handleDirectionChoice,
        toggleFeedback,
        testFeedback,
        handleContinue,
        handleStartOver
    };
}
