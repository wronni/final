# SenseFlow - Multisensory Accessible Interaction Prototype

A low-fidelity interactive digital prototype that guides users through tasks using **visual motion, sound cues, and haptic feedback**. SenseFlow emphasizes non-verbal communication through gesture-based navigation and adaptive sensory feedback.

## Overview

SenseFlow demonstrates how multisensory design can create more accessible and engaging digital experiences. The prototype combines visual animations, directional cues, audio feedback, and haptic vibrations to guide users through an interactive journey.

## Key Features

### Multisensory Feedback
- **Visual Motion**: Animated paths, directional arrows, pulsing elements, and smooth transitions
- **Sound Cues**: Audio feedback for clicks, swipes, direction changes, and completion
- **Haptic Feedback**: Vibration patterns using the Vibration API for tactile confirmation
- **Customizable**: Users can toggle each sensory feedback type on/off

### Gesture-Based Navigation
- **Swipe Gestures**: Navigate through the experience with intuitive swipe motions
  - Swipe Right: Move forward or select
  - Swipe Left: Go back
  - Swipe Up/Down: Choose directions on the path screen
- **Tap Navigation**: All screens support traditional tap/click interactions
- **Keyboard Support**: Arrow keys and keyboard shortcuts for accessibility

### Directional Visual Cues
- **Animated Paths**: SVG paths that draw themselves with flowing animations
- **Directional Arrows**: Large, clear arrow indicators that bounce and pulse
- **Color-Coded Paths**: Different colors represent different directions
  - Blue (↑): Explore
  - Green (→): Continue
  - Orange (↓): Discover

### Accessibility-First Design
- **High Contrast**: WCAG AAA compliant color combinations
- **Large Touch Targets**: All interactive elements meet 44x44px minimum size
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Optimized**: Proper ARIA labels, live regions, and announcements
- **Reduced Motion Support**: Respects `prefers-reduced-motion` user preferences
- **Adaptable**: Sensory feedback can be customized to user needs

## Prototype Flow

### Screen 1: Start Interaction
Introduction screen with gesture guidance:
- Pulsing icon showing interactive nature
- Visual demonstration of swipe gestures
- "Begin" button to start the experience
- Non-verbal cues emphasizing touch and gesture

### Screen 2: Guided Path View
Interactive path selection with directional cues:
- Animated SVG paths showing possible directions
- Three direction buttons: Explore (↑), Continue (→), Discover (↓)
- Swipe gestures work in corresponding directions
- Visual arrows with pulsing animations
- Color-coded borders for each direction

### Screen 3: Sensory Feedback Controls
Customization panel for personalizing the experience:
- **Sound Toggle**: Enable/disable audio feedback
- **Motion Toggle**: Enable/disable visual animations
- **Haptic Toggle**: Enable/disable vibration feedback
- **Test Button**: Try all enabled feedback types at once
- Large, accessible toggle switches with visual indicators

### Screen 4: Task Completion Feedback
Celebratory completion screen with statistics:
- Animated checkmark with ripple effect
- Usage statistics showing:
  - Number of gestures used
  - Sound cues played
  - Haptic pulses triggered
- Option to experience SenseFlow again

## Technical Implementation

### Files
- `index.html` - Semantic HTML with ARIA labels and SVG graphics
- `styles.css` - Responsive styling with CSS animations
- `script.js` - Gesture detection, haptic feedback, and state management

### Technologies Used
- **Touch Events API**: For swipe gesture detection
- **Vibration API**: For haptic feedback (mobile devices)
- **Web Audio API**: For sound playback
- **SVG Animations**: For animated directional paths
- **CSS Animations**: For smooth visual transitions
- **ARIA**: For screen reader accessibility

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers with touch support
- Haptic feedback requires device/browser support for Vibration API
- Graceful degradation for unsupported features

## Usage

### Getting Started
1. Open `index.html` in a web browser
2. Experience works best on touch-enabled devices (phones, tablets)
3. Allow audio permissions when prompted for sound feedback
4. Begin the interactive experience

### Interaction Methods
- **Touch**: Swipe in any direction, tap buttons
- **Mouse**: Click buttons, traditional navigation
- **Keyboard**: Arrow keys on Screen 2, Enter/Space to begin, Escape to go back

### Customizing Feedback
On Screen 3, you can toggle:
- 🔊 Sound - Audio cues for all interactions
- 〰️ Motion - Visual animations and transitions
- 📳 Haptic - Vibration feedback (device dependent)

## Gesture Controls

### Swipe Gestures
- **Screen 1**: Swipe right to begin
- **Screen 2**:
  - Swipe up: Select "Explore"
  - Swipe right: Select "Continue"
  - Swipe down: Select "Discover"
- **Any Screen**: Swipe left to go back

### Keyboard Shortcuts
- **Arrow Up**: Select upward direction (Screen 2)
- **Arrow Right**: Select forward direction (Screen 2)
- **Arrow Down**: Select downward direction (Screen 2)
- **Escape**: Go back to previous screen
- **Enter/Space**: Activate focused button
- **Tab**: Navigate between interactive elements

## Design Principles

### Supportive & Adaptive
- Users control their sensory experience
- Multiple ways to accomplish the same task
- No time pressure or forced progression
- Clear feedback for every action

### Non-Verbal Communication
- Visual motion conveys direction and progress
- Haptic patterns provide tactile confirmation
- Sound enhances but doesn't replace visual cues
- Icons and animations reduce text dependency

### Inclusive by Design
- Works with screen readers and assistive technology
- Respects user motion preferences
- Provides alternatives for each sensory channel
- High contrast for visual accessibility

## Accessibility Features

### Visual Accessibility
- High contrast color scheme (WCAG AAA)
- Large, clear typography
- Animated visual cues
- Reduced motion mode for users sensitive to animation

### Motor Accessibility
- Large touch targets (minimum 44x44px)
- Gesture alternatives via buttons
- Keyboard navigation support
- No time-limited interactions

### Auditory Accessibility
- Optional audio feedback
- Visual alternatives for all sounds
- Screen reader announcements
- Adjustable through toggle controls

### Cognitive Accessibility
- Simple, clear navigation flow
- Progressive disclosure (one screen at a time)
- Consistent interaction patterns
- Visual and haptic confirmation for actions

## Haptic Feedback Patterns

The prototype uses different vibration patterns for different actions:

- **Light**: Quick tap (20ms) - For swipes
- **Medium**: Standard feedback (50ms) - For button clicks
- **Strong**: Emphasis (100ms) - Not currently used
- **Success**: Triple pulse (50ms-50ms-100ms) - For completion
- **Direction**: Double tap (30ms-20ms-30ms) - For path selection

## Statistics Tracking

The completion screen shows your interaction summary:
- **Gestures Used**: Total swipes and directional inputs
- **Sound Cues**: Number of audio feedback instances
- **Haptic Pulses**: Total vibration feedback delivered

## Browser Compatibility

### Full Support
- Chrome/Edge (Desktop & Mobile)
- Safari (Desktop & Mobile)
- Firefox (Desktop & Mobile)

### Feature Support
- **Touch Gestures**: All touch-enabled devices
- **Haptic Feedback**: Mobile devices with Vibration API support
- **Audio Feedback**: All modern browsers
- **Visual Animations**: All browsers with CSS animation support

### Graceful Degradation
- Haptic toggle disabled if Vibration API unavailable
- Animations simplified for `prefers-reduced-motion`
- Audio continues to work even if playback is blocked initially

## Testing the Prototype

### Recommended Testing
1. **Touch Devices**: Test swipe gestures on phone or tablet
2. **Desktop**: Test keyboard navigation and mouse clicks
3. **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
4. **Motion Settings**: Enable "Reduce motion" in system settings
5. **Different Browsers**: Verify cross-browser compatibility

### Test Scenarios
- Navigate through entire flow using only gestures
- Navigate using only keyboard
- Toggle all feedback off and complete the experience
- Test with screen reader enabled
- Try on both desktop and mobile devices

## Future Enhancements

- **Voice Control**: Add voice commands for navigation
- **Custom Haptic Patterns**: Let users design vibration patterns
- **More Gesture Types**: Pinch, rotate, multi-finger gestures
- **Sound Themes**: Different audio palettes for feedback
- **Haptic Intensity**: Adjustable vibration strength
- **Path Complexity**: More intricate animated pathways
- **Micro-interactions**: Enhanced feedback for hover states
- **Accessibility Presets**: One-click accessibility profiles

## Performance Considerations

- Animations use CSS transforms for 60fps performance
- Touch events use passive listeners for smooth scrolling
- Audio files preloaded for instant feedback
- Haptic patterns optimized for battery life
- Minimal JavaScript for fast load times

## Design Philosophy

SenseFlow demonstrates that accessible design can be:
- **Engaging**: Multisensory feedback creates delight
- **Inclusive**: Multiple interaction methods accommodate diverse needs
- **Intuitive**: Gesture-based navigation feels natural
- **Empowering**: Users control their sensory experience

The prototype proves that accessibility features enhance the experience for **everyone**, not just users with specific needs.

## License

This is a prototype for demonstration and educational purposes.

---

**Created with a focus on multisensory interaction and universal accessibility.**
