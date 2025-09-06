/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Brand Primary
        'brand-primary-900': '#2E158A', // Dark Theme
        'brand-primary-700': '#4F2FC5', // Hover States
        'brand-primary-500': '#6F48FF', // Primary
        'brand-primary-300': '#A991FF', // Focus States
        'brand-primary-100':  '#F1DDFF', // Secondary Background
        'brand-primary-50':  '#F1EDFF', // Secondary Background

        // Neutral
        'pri-neutral-900': '#292D35', // Primary Copy
        'pri-neutral-700': '#5C6474', // Secondary Copy
        'pri-neutral-500': '#8F9BB3', // Disabled States
        'pri-neutral-300': '#C4CAD8', // Borders
        'pri-neutral-100': '#F2F4FA', // Primary Background

        // Status
        'success-500': '#5AAF02',   // Success Notifications
        'success-700': '#2BCD60',
        'error-500':   '#FB3D3D',   // Error Notifications
        'warning-500': '#FFC530',   // Warning Notifications
        'info-500':    '#3088F0',   // Info Notifications
      },
    },
  },
  plugins: [],
}
