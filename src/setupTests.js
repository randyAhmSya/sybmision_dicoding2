import '@testing-library/jest-dom'

if (typeof window !== 'undefined' && !window.alert) {
  window.alert = () => {}
}
