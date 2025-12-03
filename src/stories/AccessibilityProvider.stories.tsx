import type { Meta, StoryObj } from '@storybook/react';
import { AccessibilityProvider, useAccessibility } from '../components/AccessibilityProvider';
import React from 'react';

// Demo component that uses accessibility features
const AccessibilityDemo = () => {
 const {
 highContrast,
 reducedMotion,
 largeText,
 isKeyboardUser,
 issues,
 setHighContrast,
 setReducedMotion,
 setLargeText,
 announcePolite,
 announceAssertive,
 runAudit,
 clearIssues
 } = useAccessibility();

 const [message, setMessage] = React.useState('');

 return (
 <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
 <h2>Accessibility Provider Demo</h2>
 
 {/* System Status */}
 <div style={{ 
 marginBottom: '2rem', 
 padding: '1rem', 
 background: '#f5f5f5', 
 borderRadius: '8px' 
 }}>
 <h3>System Status</h3>
 <ul style={{ listStyle: 'none', padding: 0 }}>
 <li> High Contrast: {highContrast ? '✅ Enabled' : '❌ Disabled'}</li>
 <li> Reduced Motion: {reducedMotion ? '✅ Enabled' : '❌ Disabled'}</li>
 <li>🔤 Large Text: {largeText ? '✅ Enabled' : '❌ Disabled'}</li>
 <li>⌨ Keyboard User: {isKeyboardUser ? '✅ Yes' : '❌ No'}</li>
 <li>🚨 Issues Found: {issues.length}</li>
 </ul>
 </div>

 {/* Controls */}
 <div style={{ marginBottom: '2rem' }}>
 <h3>Accessibility Controls</h3>
 <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
 <button
 onClick={() => setHighContrast(!highContrast)}
 style={{ 
 padding: '0.5rem 1rem',
 background: highContrast ? '#000' : '#007cba',
 color: 'white',
 border: 'none',
 borderRadius: '4px'
 }}
 >
 Toggle High Contrast
 </button>
 
 <button
 onClick={() => setReducedMotion(!reducedMotion)}
 style={{ 
 padding: '0.5rem 1rem',
 background: reducedMotion ? '#666' : '#007cba',
 color: 'white',
 border: 'none',
 borderRadius: '4px'
 }}
 >
 Toggle Reduced Motion
 </button>
 
 <button
 onClick={() => setLargeText(!largeText)}
 style={{ 
 padding: '0.5rem 1rem',
 background: largeText ? '#0073aa' : '#007cba',
 color: 'white',
 border: 'none',
 borderRadius: '4px',
 fontSize: largeText ? '1.2em' : '1em'
 }}
 >
 Toggle Large Text
 </button>
 </div>
 </div>

 {/* Announcements */}
 <div style={{ marginBottom: '2rem' }}>
 <h3>Screen Reader Announcements</h3>
 <div style={{ marginBottom: '1rem' }}>
 <input
 type="text"
 value={message}
 onChange={(e) => setMessage(e.target.value)}
 placeholder="Type a message to announce..."
 style={{ 
 padding: '0.5rem', 
 marginRight: '0.5rem', 
 width: '300px',
 border: '1px solid #ccc',
 borderRadius: '4px'
 }}
 />
 </div>
 <div style={{ display: 'flex', gap: '0.5rem' }}>
 <button
 onClick={() => announcePolite(message || 'Polite announcement test')}
 style={{ 
 padding: '0.5rem 1rem',
 background: '#28a745',
 color: 'white',
 border: 'none',
 borderRadius: '4px'
 }}
 >
 Announce Polite
 </button>
 
 <button
 onClick={() => announceAssertive(message || 'Assertive announcement test')}
 style={{ 
 padding: '0.5rem 1rem',
 background: '#dc3545',
 color: 'white',
 border: 'none',
 borderRadius: '4px'
 }}
 >
 Announce Assertive
 </button>
 </div>
 </div>

 {/* Audit Controls */}
 <div style={{ marginBottom: '2rem' }}>
 <h3>Accessibility Audit</h3>
 <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
 <button
 onClick={runAudit}
 style={{ 
 padding: '0.5rem 1rem',
 background: '#6f42c1',
 color: 'white',
 border: 'none',
 borderRadius: '4px'
 }}
 >
 Run Audit
 </button>
 
 <button
 onClick={clearIssues}
 style={{ 
 padding: '0.5rem 1rem',
 background: '#6c757d',
 color: 'white',
 border: 'none',
 borderRadius: '4px'
 }}
 >
 Clear Issues
 </button>
 </div>
 
 {issues.length > 0 && (
 <div style={{ 
 padding: '1rem', 
 background: '#fff3cd', 
 border: '1px solid #ffeaa7',
 borderRadius: '8px' 
 }}>
 <h4>Accessibility Issues ({issues.length})</h4>
 <ul>
 {issues.map((issue, index) => (
 <li key={index} style={{ color: issue.level === 'error' ? '#dc3545' : '#856404' }}>
 <strong>{issue.type}</strong>: {issue.message}
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>

 {/* Test elements that might have accessibility issues */}
 <div style={{ marginTop: '2rem', padding: '1rem', background: '#e9ecef', borderRadius: '8px' }}>
 <h3>Test Elements for Audit</h3>
 <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='50'%3E%3Crect width='100' height='50' fill='%23ddd'/%3E%3C/svg%3E" />
 <button>Unlabeled Button</button>
 <input type="text" placeholder="Unlabeled Input" />
 </div>
 </div>
 );
};

const meta: Meta<typeof AccessibilityProvider> = {
 title: 'Framework/AccessibilityProvider',
 component: AccessibilityProvider,
 parameters: {
 layout: 'fullscreen',
 docs: {
 description: {
 component: 'Provides comprehensive accessibility context and utilities including system preference detection, keyboard navigation, ARIA announcements, and accessibility auditing.',
 },
 },
 },
 tags: ['autodocs'],
 argTypes: {
 enableAudit: {
 description: 'Whether to enable automatic accessibility auditing (defaults to development mode)',
 control: 'boolean',
 },
 children: {
 description: 'Child components that will have access to accessibility context',
 },
 },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with full demo
export const Default: Story = {
 args: {
 children: <AccessibilityDemo />,
 enableAudit: true,
 },
};

// Story showing basic usage without audit
export const BasicUsage: Story = {
 args: {
 enableAudit: false,
 children: (
 <div style={{ padding: '2rem' }}>
 <h2>Basic AccessibilityProvider Usage</h2>
 <p>This provider automatically detects system preferences and manages keyboard navigation.</p>
 <button>Try tabbing to this button</button>
 <br /><br />
 <input type="text" placeholder="Type here and use Tab key" />
 </div>
 ),
 },
 parameters: {
 docs: {
 description: {
 story: 'Basic usage of AccessibilityProvider without auditing enabled.',
 },
 },
 },
};

// Story demonstrating keyboard navigation
export const KeyboardNavigation: Story = {
 args: {
 children: (
 <div style={{ padding: '2rem' }}>
 <h2>Keyboard Navigation Test</h2>
 <p>Press Tab to navigate between elements. When using keyboard, focus indicators will be enhanced.</p>
 <button>Button 1</button>
 <br /><br />
 <input type="text" placeholder="Input field" />
 <br /><br />
 <select>
 <option>Option 1</option>
 <option>Option 2</option>
 </select>
 <br /><br />
 <a href="#" onClick={(e) => e.preventDefault()}>Link element</a>
 </div>
 ),
 },
 parameters: {
 docs: {
 description: {
 story: 'Test keyboard navigation to see enhanced focus indicators when using Tab key.',
 },
 },
 },
};