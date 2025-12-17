// ClearChoice Prototype - Interactive Decision Making
// Accessibility-focused with progressive disclosure

// State Management
const state = {
    currentScreen: 1,
    mainChoice: null,
    subChoice: null,
    mainChoiceLabel: null,
    subChoiceLabel: null
};

// Screen content configuration
const contentMap = {
    'plan-activity': {
        title: 'Plan Your Activity',
        subtitle: 'What kind of activity would you like to plan?',
        options: [
            {
                id: 'outdoor',
                text: 'Outdoor Activity',
                description: 'Parks, hiking, walks, outdoor sports'
            },
            {
                id: 'indoor',
                text: 'Indoor Activity',
                description: 'Museums, movies, shopping, dining'
            },
            {
                id: 'social',
                text: 'Social Gathering',
                description: 'Meeting friends, parties, group events'
            }
        ]
    },
    'make-purchase': {
        title: 'Make a Purchase',
        subtitle: 'What are you looking to buy?',
        options: [
            {
                id: 'essential',
                text: 'Essential Item',
                description: 'Daily necessities, groceries, utilities'
            },
            {
                id: 'personal',
                text: 'Personal Item',
                description: 'Clothing, accessories, personal care'
            },
            {
                id: 'gift',
                text: 'Gift for Someone',
                description: 'Birthday, holiday, or special occasion'
            }
        ]
    },
    'organize-task': {
        title: 'Organize Your Task',
        subtitle: 'What type of task do you need to organize?',
        options: [
            {
                id: 'home',
                text: 'Home Task',
                description: 'Cleaning, organizing, home maintenance'
            },
            {
                id: 'work',
                text: 'Work Task',
                description: 'Projects, meetings, deadlines'
            },
            {
                id: 'personal',
                text: 'Personal Task',
                description: 'Appointments, errands, self-care'
            }
        ]
    }
};

// Audio Feedback
const audioContext = {
    clickSound: null,
    successSound: null
};

// Initialize audio elements
function initAudio() {
    audioContext.clickSound = document.getElementById('clickSound');
    audioContext.successSound = document.getElementById('successSound');
}

// Play audio feedback
function playSound(type) {
    try {
        const sound = audioContext[type];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => {
                console.log('Audio play prevented:', e);
            });
        }
    } catch (e) {
        console.log('Audio not available:', e);
    }
}

// Screen Reader Announcements
function announce(message) {
    const announcer = document.getElementById('announcements');
    announcer.textContent = message;

    // Clear after announcement
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
function navigateToScreen(screenNumber) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    const targetScreen = document.getElementById(`screen${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        state.currentScreen = screenNumber;

        // Update progress
        const progress = (screenNumber - 1) * 25; // 4 screens = 25% each
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
function addClickEffect(button) {
    button.classList.add('clicked');
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 300);
}

// Handle Main Choice (Screen 1 -> Screen 2)
function handleMainChoice(choice, label) {
    state.mainChoice = choice;
    state.mainChoiceLabel = label;

    playSound('clickSound');
    announce(`Selected: ${label}`);

    // Populate Screen 2 with relevant content
    const content = contentMap[choice];
    if (content) {
        document.getElementById('screen2Title').textContent = content.title;
        document.getElementById('screen2Subtitle').textContent = content.subtitle;

        // Update option buttons
        content.options.forEach((option, index) => {
            const optionNumber = index + 1;
            document.getElementById(`option${optionNumber}Text`).textContent = option.text;
            document.getElementById(`option${optionNumber}Desc`).textContent = option.description;

            const button = document.querySelector(`[data-suboption="option${optionNumber}"]`);
            button.dataset.suboptionId = option.id;
            button.dataset.suboptionLabel = option.text;
        });
    }

    // Navigate after brief delay for feedback
    setTimeout(() => {
        navigateToScreen(2);
        announce(`Now on screen: ${content.title}`);
    }, 300);
}

// Handle Sub Choice (Screen 2 -> Screen 3)
function handleSubChoice(subChoiceId, label) {
    state.subChoice = subChoiceId;
    state.subChoiceLabel = label;

    playSound('clickSound');
    announce(`Selected: ${label}`);

    // Update confirmation screen
    document.getElementById('confirmationMain').textContent = state.mainChoiceLabel;
    document.getElementById('confirmationSub').textContent = state.subChoiceLabel;

    // Navigate after brief delay
    setTimeout(() => {
        navigateToScreen(3);
        announce('Confirm your selection');
    }, 300);
}

// Handle Confirmation (Screen 3 -> Screen 4)
function handleConfirmation() {
    playSound('successSound');
    announce('Choice confirmed!');

    // Update summary screen
    document.getElementById('summaryMain').textContent = state.mainChoiceLabel;
    document.getElementById('summarySub').textContent = state.subChoiceLabel;

    // Navigate after brief delay
    setTimeout(() => {
        navigateToScreen(4);
        announce('All set! Your choice has been saved.');
    }, 300);
}

// Reset State and Start Over
function handleStartOver() {
    playSound('clickSound');
    announce('Starting over');

    // Reset state
    state.mainChoice = null;
    state.subChoice = null;
    state.mainChoiceLabel = null;
    state.subChoiceLabel = null;

    // Navigate back to screen 1
    setTimeout(() => {
        navigateToScreen(1);
        announce('Welcome back to ClearChoice');
    }, 300);
}

// Initialize Event Listeners
function initEventListeners() {
    // Screen 1: Main choices
    document.querySelectorAll('[data-choice]').forEach(button => {
        button.addEventListener('click', (e) => {
            addClickEffect(button);
            const choice = e.currentTarget.dataset.choice;
            const label = e.currentTarget.querySelector('.choice-text').textContent;
            handleMainChoice(choice, label);
        });
    });

    // Screen 2: Sub choices
    document.querySelectorAll('[data-suboption]').forEach(button => {
        button.addEventListener('click', (e) => {
            addClickEffect(button);
            const subChoiceId = e.currentTarget.dataset.suboptionId;
            const label = e.currentTarget.dataset.suboptionLabel;
            handleSubChoice(subChoiceId, label);
        });
    });

    // Back button: Screen 2 -> Screen 1
    document.getElementById('backToScreen1').addEventListener('click', (e) => {
        addClickEffect(e.currentTarget);
        playSound('clickSound');
        announce('Going back');
        setTimeout(() => {
            navigateToScreen(1);
        }, 200);
    });

    // Back button: Screen 3 -> Screen 2
    document.getElementById('backToScreen2').addEventListener('click', (e) => {
        addClickEffect(e.currentTarget);
        playSound('clickSound');
        announce('Going back to change selection');
        setTimeout(() => {
            navigateToScreen(2);
        }, 200);
    });

    // Confirm button: Screen 3 -> Screen 4
    document.getElementById('confirmBtn').addEventListener('click', (e) => {
        addClickEffect(e.currentTarget);
        handleConfirmation();
    });

    // Start over button: Screen 4 -> Screen 1
    document.getElementById('startOver').addEventListener('click', (e) => {
        addClickEffect(e.currentTarget);
        handleStartOver();
    });

    // Keyboard navigation enhancements
    document.addEventListener('keydown', (e) => {
        // Escape key to go back
        if (e.key === 'Escape') {
            if (state.currentScreen === 2) {
                document.getElementById('backToScreen1').click();
            } else if (state.currentScreen === 3) {
                document.getElementById('backToScreen2').click();
            }
        }
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initEventListeners();
    navigateToScreen(1);
    announce('Welcome to ClearChoice. Take your time and choose what feels right.');

    // Allow audio playback on first user interaction
    document.body.addEventListener('click', () => {
        // Prime the audio context
        if (audioContext.clickSound) {
            audioContext.clickSound.volume = 0.3;
        }
        if (audioContext.successSound) {
            audioContext.successSound.volume = 0.5;
        }
    }, { once: true });
});

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        state,
        navigateToScreen,
        handleMainChoice,
        handleSubChoice,
        handleConfirmation,
        handleStartOver
    };
}
