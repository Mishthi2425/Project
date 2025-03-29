/**
 * Utility functions for the Habit Tracker application
 */

// Format a date to a readable string
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Get color for progress bar based on completion percentage
export function getProgressColor(progress) {
  if (progress === 0) return 'bg-gray-300';
  if (progress <= 25) return 'bg-orange-400';
  if (progress <= 50) return 'bg-yellow-400';
  if (progress <= 75) return 'bg-blue-400';
  return 'bg-green-400';
}

// Convert progress percentage to a status label
export function getProgressStatus(progress) {
  if (progress === 0) return 'Not Started';
  if (progress <= 25) return 'Just Beginning';
  if (progress <= 50) return 'In Progress';
  if (progress <= 75) return 'Well Underway';
  if (progress < 100) return 'Almost There';
  return 'Completed';
}

// Format a number to have a + sign if it's positive
export function formatChange(value) {
  if (value > 0) return `+${value}`;
  return value.toString();
}

// Generate unique ID (simple implementation)
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Clamp a number between min and max values
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}