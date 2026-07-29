# Education Loan EMI Calculator

A modern, responsive Education Loan EMI Calculator web application built with React, TypeScript, and Vite. Designed for "DegreeBaba", this application helps users seamlessly calculate their monthly EMI, total interest payable, and overall repayment amount for education loans.

## Features

- **Interactive EMI Calculator**: Input loan amount, interest rate, and tenure (in months or years) to get real-time EMI calculations.
- **Detailed Repayment Summary**: View monthly EMI, total interest, and total amount payable.
- **Bank Rates Comparison**: A comprehensive table showing current indicative interest rates across top Indian banks (SBI, HDFC, ICICI, etc.).
- **Educational Content**: Includes information on how EMI is calculated, the moratorium period, and tips for managing education loans.
- **Responsive Design**: Built with Tailwind CSS to ensure a seamless experience across desktop and mobile devices.

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Linting**: Oxlint

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the local development server:

```bash
npm run dev
```

Open `http://localhost:5173` to view the application in your browser.

### Building for Production

To create a production build:

```bash
npm run build
```

The built assets will be available in the `dist` directory.

## Project Structure

- `src/App.tsx`: Main application component containing the calculator logic and UI.
- `src/index.css`: Global styles and Tailwind configuration.
- `vite.config.ts`: Vite configuration file.
- `package.json`: Project dependencies and scripts.

## License

This project is licensed under the MIT License.
