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

// Audio Context
const audioContext = {
    clickSound: null,
    successSound: null,
    swipeSound: null,
    directionSound: null
};

// Initialize audio elements
function initAudio() {
    audioContext.clickSound = document.getElementById('clickSound');
    audioContext.successSound = document.getElementById('successSound');
    audioContext.swipeSound = document.getElementById('swipeSound');
    audioContext.directionSound = document.getElementById('directionSound');

    // Set audio volumes
    Object.keys(audioContext).forEach(key => {
        if (audioContext[key]) {
            audioContext[key].volume = 0.4;
        }
    });
}

// Play sound feedback
function playSound(type) {
    if (!state.feedbackSettings.sound) return;

    try {
        const sound = audioContext[type];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => {
                console.log('Audio play prevented:', e);
            });
            state.stats.sounds++;
        }
    } catch (e) {
        console.log('Audio not available:', e);
    }
}

// Haptic feedback using Vibration API
function triggerHaptic(pattern = [50]) {
    if (!state.feedbackSettings.haptic) return;

    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
        state.stats.haptics++;
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
    if (!state.feedbackSettings.motion) return;

    element.classList.add('clicked');
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
    initAudio();
    initEventListeners();
    initGestureDetection();
    checkHapticSupport();
    navigateToScreen(1, false);
    announce('Welcome to SenseFlow. A multisensory interaction experience.');

    // Prime audio context on first user interaction
    document.body.addEventListener('click', () => {
        Object.keys(audioContext).forEach(key => {
            if (audioContext[key]) {
                audioContext[key].play().then(() => {
                    audioContext[key].pause();
                    audioContext[key].currentTime = 0;
                }).catch(() => {});
            }
        });
    }, { once: true });

    // Also prime on first touch
    document.body.addEventListener('touchstart', () => {
        Object.keys(audioContext).forEach(key => {
            if (audioContext[key]) {
                audioContext[key].play().then(() => {
                    audioContext[key].pause();
                    audioContext[key].currentTime = 0;
                }).catch(() => {});
            }
        });
    }, { once: true });
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
