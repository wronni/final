# ClearChoice - Accessible Decision Making Prototype

A low-fidelity interactive digital prototype designed to help users make decisions without cognitive overload, with a strong focus on accessibility and user experience.

## Overview

ClearChoice guides users through a simple, step-by-step decision-making process using progressive disclosure, high-contrast design, and immediate feedback mechanisms.

## Key Features

### Accessibility-First Design
- **High Contrast**: All elements use WCAG AAA compliant color combinations
- **Large Interactive Elements**: All buttons meet minimum 44x44px touch target size
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Optimized**: Proper ARIA labels, live regions, and semantic HTML
- **Reduced Motion Support**: Respects `prefers-reduced-motion` user preferences

### Progressive Disclosure
- Only 2-3 choices presented per screen
- Each choice reveals the next set of options
- Clear flow prevents decision paralysis
- Users can review and change their selections

### User Feedback
- **Visual Feedback**: Button animations, progress bar, success checkmark
- **Audio Feedback**: Click sounds and success chime (can be muted)
- **Screen Reader Announcements**: Status updates for assistive technology users
- **Progress Indicator**: Visual progress bar shows completion status

### Navigation
- Clear "Back" buttons on every screen
- "Continue" affordances built into choice buttons
- Escape key support for quick navigation back
- Focused element on screen transition

## Prototype Flow

### Screen 1: Home
Three primary decision categories:
- Plan an Activity 📅
- Make a Purchase 🛒
- Organize a Task ✓

### Screen 2: Expanded Options
Based on the first choice, users see 3 relevant sub-options with descriptions:
- Clear titles and helpful descriptions
- Easy-to-scan layout
- Option to go back

### Screen 3: Confirmation
Review screen showing:
- Selected main category
- Selected sub-option
- Option to confirm or go back to change

### Screen 4: Completion
Success state with:
- Animated checkmark
- Summary of decisions
- Option to start over

## Technical Implementation

### Files
- `index.html` - Semantic HTML structure with ARIA labels
- `styles.css` - High-contrast, responsive styling
- `script.js` - Progressive disclosure and interaction logic

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile and desktop
- Graceful degradation for older browsers

### Accessibility Features
- Semantic HTML5 elements
- ARIA roles and labels
- Focus management
- Keyboard navigation (Tab, Shift+Tab, Escape, Enter/Space)
- Screen reader announcements
- High contrast mode support
- Respects user motion preferences

## Usage

1. Open `index.html` in a web browser
2. Navigate through the screens using mouse, keyboard, or touch
3. Make selections at your own pace
4. Use the Back button at any time to change your mind
5. Complete the flow or start over

## Design Principles

### Calm & Reassuring
- Gentle animations
- Encouraging copy ("Take your time")
- No time pressure or urgency

### Simple Language
- Clear, direct labels
- Helpful descriptions
- No jargon or complex terminology

### Choice-Driven Interaction
- User always in control
- Can go back at any point
- Clear confirmation before completion
- Transparent process

## Keyboard Shortcuts

- **Tab**: Navigate forward through interactive elements
- **Shift + Tab**: Navigate backward through interactive elements
- **Enter/Space**: Activate focused button
- **Escape**: Go back to previous screen (when applicable)

## Future Enhancements

- Save decisions to local storage
- Export decision summary
- Customizable themes
- Multi-language support
- Voice control integration
- Analytics dashboard

## Accessibility Compliance

This prototype follows:
- WCAG 2.1 Level AA guidelines
- ARIA Authoring Practices Guide
- Inclusive design principles
- Progressive enhancement methodology

## Testing Recommendations

1. **Keyboard Navigation**: Tab through all interactive elements
2. **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
3. **High Contrast Mode**: Enable system high contrast mode
4. **Zoom**: Test at 200% browser zoom
5. **Touch Targets**: Verify 44x44px minimum on mobile devices

## License

This is a prototype for demonstration purposes.

---

**Created with accessibility and user experience as top priorities.**
