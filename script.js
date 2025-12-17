// Confirm Prototype - Accessible Action Confirmation
// Reducing anxiety through preview, confirmation, and recovery

// State Management
const state = {
    currentScreen: 1,
    selectedAction: null,
    actionLabel: null,
    riskLevel: null,
    actionCompleted: false
};

// Action content configuration
const actionContent = {
    'change-photo': {
        label: 'Change Profile Photo',
        icon: '👤',
        risk: 'low',
        preview: {
            title: 'Change Profile Photo',
            description: 'Your new photo will replace your current profile picture. This is visible to everyone who views your profile.',
            details: [
                'Your old photo will be removed',
                'You can change it again anytime',
                'Takes effect immediately',
                'No one will be notified of the change'
            ],
            confirmButton: 'Yes, Change My Photo'
        },
        completion: {
            subtitle: 'Changed your mind? No problem.',
            statusTitle: 'What just happened:',
            statusDescription: 'Your profile photo has been updated. The new photo is now visible on your profile.',
            undoMessage: 'If you prefer your old photo, you can undo this change right now.',
            finalSummary: 'Your profile photo has been updated successfully.',
            finalDetail: 'The new photo is now showing on your profile.',
            reassurance: 'Everything is saved and working properly. You can change your photo again anytime.'
        }
    },
    'delete-messages': {
        label: 'Delete All Messages',
        icon: '✉️',
        risk: 'high',
        preview: {
            title: 'Delete All Messages',
            description: 'This will permanently remove all your messages. We want to make sure you understand what will happen.',
            details: [
                'All messages will be permanently deleted',
                'This cannot be undone after final confirmation',
                'Messages with others will also be removed',
                'You have 30 seconds to undo after deletion'
            ],
            confirmButton: 'Yes, Delete All Messages'
        },
        completion: {
            subtitle: 'You have 30 seconds to undo if needed.',
            statusTitle: 'What just happened:',
            statusDescription: 'All your messages have been deleted. They are no longer visible in your inbox.',
            undoMessage: 'You can undo this deletion right now. After you confirm or wait 30 seconds, it will be permanent.',
            finalSummary: 'All your messages have been permanently deleted.',
            finalDetail: 'Your inbox is now empty and ready for new messages.',
            reassurance: 'The deletion is complete. Your account is secure and working normally.'
        }
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

        // Update progress based on screen
        const progressMap = { 1: 0, 2: 33, 3: 66, 4: 100 };
        updateProgress(progressMap[screenNumber] || 0);

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

// Handle Action Selection (Screen 1 -> Screen 2)
function handleActionSelection(action, risk, label) {
    state.selectedAction = action;
    state.actionLabel = label;
    state.riskLevel = risk;
    state.actionCompleted = false;

    playSound('clickSound');
    announce(`Selected: ${label}`);

    // Populate Screen 2 with action preview
    const content = actionContent[action];
    if (content) {
        const previewCard = document.getElementById('previewCard');
        const confirmBtn = document.getElementById('confirmActionBtn');

        // Update preview card styling based on risk
        previewCard.className = `preview-card ${risk}-risk-preview`;
        confirmBtn.className = `choice-btn confirm-action ${risk}-risk-confirm`;

        // Update content
        document.getElementById('previewIcon').textContent = content.icon;
        document.getElementById('previewTitle').textContent = content.preview.title;
        document.getElementById('previewDescription').textContent = content.preview.description;
        document.getElementById('confirmBtnText').textContent = content.preview.confirmButton;

        // Update risk badge
        const riskBadge = document.getElementById('riskBadge');
        riskBadge.textContent = risk === 'low' ? 'Easy to change' : 'Needs attention';
        riskBadge.className = `risk-badge ${risk}-risk-badge`;

        // Update details list
        const detailsList = document.getElementById('previewDetails');
        detailsList.innerHTML = '';
        content.preview.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            detailsList.appendChild(li);
        });
    }

    // Navigate after brief delay for feedback
    setTimeout(() => {
        navigateToScreen(2);
        announce(`Review this action carefully: ${label}`);
    }, 300);
}

// Handle Confirmation (Screen 2 -> Screen 3)
function handleConfirmation() {
    playSound('clickSound');
    announce('Action is being completed');

    const content = actionContent[state.selectedAction];
    if (content) {
        // Update Screen 3 content
        document.getElementById('screen3Subtitle').textContent = content.completion.subtitle;
        document.getElementById('statusTitle').textContent = content.completion.statusTitle;
        document.getElementById('statusDescription').textContent = content.completion.statusDescription;
        document.getElementById('undoMessage').textContent = content.completion.undoMessage;
    }

    state.actionCompleted = true;

    // Navigate after brief delay
    setTimeout(() => {
        navigateToScreen(3);
        announce('Action complete. You can undo if needed.');
    }, 300);
}

// Handle Undo (Screen 3 -> Screen 1)
function handleUndo() {
    playSound('clickSound');
    announce('Action undone. Returning to start.');

    state.actionCompleted = false;

    // Navigate after brief delay
    setTimeout(() => {
        navigateToScreen(1);
        announce('Action has been undone. Choose another action when ready.');
    }, 300);
}

// Handle Keep Change (Screen 3 -> Screen 4)
function handleKeepChange() {
    playSound('successSound');
    announce('Change confirmed and saved');

    const content = actionContent[state.selectedAction];
    if (content) {
        // Update Screen 4 content
        document.getElementById('finalSummary').textContent = content.completion.finalSummary;
        document.getElementById('finalDetail').textContent = content.completion.finalDetail;
        document.getElementById('reassuranceText').textContent = content.completion.reassurance;
    }

    // Navigate after brief delay
    setTimeout(() => {
        navigateToScreen(4);
        announce('All set! Your action is complete.');
    }, 300);
}

// Handle Start Over (Screen 4 -> Screen 1)
function handleStartOver() {
    playSound('clickSound');
    announce('Starting over');

    // Reset state
    state.selectedAction = null;
    state.actionLabel = null;
    state.riskLevel = null;
    state.actionCompleted = false;

    // Navigate after brief delay
    setTimeout(() => {
        navigateToScreen(1);
        announce('Ready for a new action. Take your time.');
    }, 300);
}

// Initialize Event Listeners
function initEventListeners() {
    // Screen 1: Action selection buttons
    document.querySelectorAll('[data-action]').forEach(button => {
        button.addEventListener('click', (e) => {
            addClickEffect(button);
            const action = e.currentTarget.dataset.action;
            const risk = e.currentTarget.dataset.risk;
            const label = e.currentTarget.querySelector('.choice-text').textContent;
            handleActionSelection(action, risk, label);
        });
    });

    // Screen 2: Confirm action button
    document.getElementById('confirmActionBtn').addEventListener('click', (e) => {
        addClickEffect(e.currentTarget);
        handleConfirmation();
    });

    // Screen 2: Back button
    document.getElementById('backToScreen1').addEventListener('click', (e) => {
        addClickEffect(e.currentTarget);
        playSound('clickSound');
        announce('Going back');
        setTimeout(() => {
            navigateToScreen(1);
        }, 200);
    });

    // Screen 3: Undo button
    document.getElementById('undoBtn').addEventListener('click', (e) => {
        addClickEffect(e.currentTarget);
        handleUndo();
    });

    // Screen 3: Keep change button
    document.getElementById('keepBtn').addEventListener('click', (e) => {
        addClickEffect(e.currentTarget);
        handleKeepChange();
    });

    // Screen 4: Start over button
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
                // On screen 3, escape triggers undo
                document.getElementById('undoBtn').click();
            } else if (state.currentScreen === 4) {
                document.getElementById('startOver').click();
            }
        }
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initEventListeners();
    navigateToScreen(1);
    announce('Welcome to Confirm. Choose an action when you\'re ready. Take your time.');

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
        handleActionSelection,
        handleConfirmation,
        handleUndo,
        handleKeepChange,
        handleStartOver
    };
}
