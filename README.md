# Confirm - Accessible Action Confirmation Prototype

A low-fidelity interactive digital prototype designed to reduce anxiety around irreversible actions by emphasizing preview, confirmation, and recovery options.

## Overview

Confirm guides users through a calm, reassuring process when taking actions that might feel permanent or risky. The prototype uses clear previews, plain language, undo options, and visual distinction between low-risk and high-risk actions to build confidence and trust.

## Key Features

### Emotional Accessibility
- **Calm Tone**: Reassuring language that reduces anxiety
- **Clear Previews**: See exactly what will happen before it happens
- **Recovery Options**: Always provide a way back or undo option
- **Confidence Building**: Gradual confirmation reduces fear of mistakes

### Visual Risk Distinction
- **Low-Risk Actions**: Gentle blue colors, lighter emphasis
- **High-Risk Actions**: Warm amber/orange colors, stronger visual weight
- **Clear Labeling**: Plain language explaining the impact of each action
- **No Alarm Colors**: Avoided red to prevent panic; using warm tones instead

### Accessibility-First Design
- **High Contrast**: WCAG AAA compliant color combinations
- **Large Touch Targets**: All buttons meet 44x44px minimum size
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Optimized**: Proper ARIA labels, live regions, semantic HTML
- **Reduced Motion Support**: Respects `prefers-reduced-motion` preferences

### Plain Language
- **No Technical Jargon**: Simple, clear descriptions
- **Active Voice**: Direct, easy-to-understand instructions
- **Outcome Focus**: Explains what will happen, not how
- **Reassurance Built-In**: Every step includes calming language

## Prototype Flow

### Screen 1: Action Preview
The first screen shows:
- A clear description of the action you're about to take
- Visual indication of risk level (low-risk or high-risk)
- Plain language explanation of what will happen
- Option to proceed or cancel without pressure

### Screen 2: Confirmation Prompt
Before the action is taken:
- Review exactly what will change
- See a summary of the impact
- Clear "Confirm" or "Go Back" options
- Reassurance that you can undo this later (if applicable)

### Screen 3: Undo or Recovery State
After action is taken:
- Confirmation that the action happened
- Immediate undo option if you change your mind
- Clear explanation of the current state
- Option to keep the change or revert

### Screen 4: Final Confirmation
The completion screen:
- Success message with calm, positive tone
- Summary of what changed
- Option to take another action
- Reassurance that everything is safe

## Example Actions

The prototype demonstrates two action types:

### Low-Risk Action: "Change Profile Photo"
- Gentle blue visual treatment
- Simple preview of the change
- Easy undo option
- Minimal anxiety-inducing language

### High-Risk Action: "Delete All Messages"
- Warm amber visual treatment (not red - less alarming)
- Detailed preview of consequences
- Multiple confirmation steps
- Clear recovery information

## Technical Implementation

### Files
- `index.html` - Semantic HTML structure with ARIA labels
- `styles.css` - Accessible styling with risk-level distinctions
- `script.js` - Progressive confirmation and undo logic

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile and desktop
- Graceful degradation for older browsers

### Accessibility Features
- Semantic HTML5 elements
- ARIA roles, labels, and live regions
- Focus management on screen transitions
- Keyboard navigation (Tab, Shift+Tab, Escape, Enter/Space)
- Screen reader announcements for state changes
- High contrast mode support
- Respects user motion preferences

## Usage

1. Open `index.html` in a web browser
2. Choose an action (low-risk or high-risk)
3. Review the action preview carefully
4. Confirm if you're ready, or go back
5. After the action, use the undo option if needed
6. Complete the flow or try another action

## Design Principles

### Calm & Reassuring
- Gentle animations that don't startle
- Encouraging language ("You're in control", "Take your time")
- No time pressure or countdown timers
- Soft color palette avoiding alarm colors

### Trust-Building
- Transparency about what will happen
- Always offer an escape route
- Never penalize going back
- Clear recovery options

### Plain Language
- No technical terms or jargon
- Active, direct sentences
- Focus on outcomes users care about
- Avoid legal or corporate language

### Progressive Confidence
- Start with a preview (lowest commitment)
- Ask for confirmation (medium commitment)
- Provide undo (safety net)
- Final confirmation (reinforcement)

## Color Psychology

### Low-Risk Actions (Blue)
- **Primary**: `#0066CC` (Trustworthy blue)
- **Accent**: `#E3F2FD` (Light, calm blue background)
- **Message**: "This is safe and easy to change"

### High-Risk Actions (Amber/Orange)
- **Primary**: `#F57C00` (Warm, attention-getting orange)
- **Accent**: `#FFF3E0` (Soft amber background)
- **Message**: "Pay attention, but don't panic"

### Success States (Green)
- **Primary**: `#2E7D32` (Reassuring green)
- **Message**: "Everything went well"

## Keyboard Shortcuts

- **Tab**: Navigate forward through interactive elements
- **Shift + Tab**: Navigate backward
- **Enter/Space**: Activate focused button
- **Escape**: Go back to previous screen (works on all screens)

## Emotional Design Considerations

### Reducing Anxiety
- Multiple confirmation steps for high-risk actions
- Clear "undo" options visible immediately
- Progress indicators show you're not stuck
- Language focuses on empowerment, not consequences

### Building Confidence
- Preview before action reduces fear
- Undo option provides psychological safety
- Success messages reinforce positive feelings
- No shame or blame language

### Preventing Regret
- Clear impact descriptions
- Time to think (no forced quick decisions)
- Easy reversal options
- Clear state throughout process

## Testing Recommendations

1. **Keyboard Navigation**: Tab through all elements, use Escape to go back
2. **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
3. **Color Blindness**: Verify distinction without relying solely on color
4. **High Contrast Mode**: Enable system high contrast
5. **Zoom**: Test at 200% browser zoom
6. **Touch Targets**: Verify 44x44px minimum on mobile

## Future Enhancements

- Customizable risk thresholds
- Action history log
- Email confirmation options
- Multi-language support
- Voice confirmation
- Biometric confirmation for very high-risk actions

## Accessibility Compliance

This prototype follows:
- WCAG 2.1 Level AA guidelines (targeting AAA where possible)
- ARIA Authoring Practices Guide (APG)
- Inclusive Design Principles
- Plain Language guidelines
- Emotional accessibility best practices

## Research Foundation

This prototype is informed by:
- Cognitive load theory (progressive disclosure)
- Emotional design principles (trust, calm, confidence)
- Error prevention and recovery patterns
- Accessibility research and inclusive design
- User anxiety and decision-making psychology

## License

This is a prototype for demonstration and educational purposes.

---

**Created with emotional accessibility, trust, and confidence-building as top priorities.**
