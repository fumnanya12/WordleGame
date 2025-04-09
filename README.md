# Wordle Clone

This is a Wordle clone built using **React** and **Vite**. The game allows users to guess a word within six attempts, providing feedback on each guess to indicate correct letters, misplaced letters, and incorrect letters.

## Features

- **Interactive Gameplay**: Users can guess words using an on-screen keyboard or their physical keyboard.
- **Dynamic Feedback**: Letters are color-coded to indicate correctness:
  - **Green**: Correct letter in the correct position.
  - **Yellow**: Correct letter in the wrong position.
  - **Gray**: Incorrect letter.
- **Confetti Celebration**: A confetti animation is displayed when the user wins.
- **Dictionary Validation**: Guessed words are validated using a dictionary API.
- **Responsive Design**: The game is styled for a seamless experience on different screen sizes.

## Project Structure
```sh
 ├── App.jsx          # Main React component for the game
├── main.jsx         # Entry point for the React app
├── words.js         # List of possible words for the game
├── utils.js         # Utility function to get a random word
├── index.html       # HTML template
├── index.css        # Styling for the game
├── vite.config.js   # Vite configuration
├── eslint.config.js # ESLint configuration
├── launch.json      # VS Code launch configuration
├── public/         # Public assets
 └── src/assets/     # Additional assets
```
## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd wordle

2. Install dependencies:
   ```
   npm install
   ```

3. 
 ```
  npm run dev
```
4. Open the app in your browser at http://localhost:5173.

## Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build.
- `npm run lint`: Runs ESLint to check for code quality issues.
# How to Play

- **Guess the word** by typing letters or clicking the on-screen keyboard.
- **Press Enter** to submit your guess.
- **Use Backspace** to delete a letter.
- **You have six attempts** to guess the correct word.

# Technologies Used

- **React**: For building the user interface.
- **Vite**: For fast development and build tooling.
- **ESLint**: For maintaining code quality.
- **Confetti**: For celebratory animations.

# API Integration

The game uses the **Dictionary API** to validate guessed words. If a word is invalid, the user is prompted to enter a valid word.

# Customization

- **To change the list of possible words**, edit the `words.js` file.
- **To modify the game's appearance**, update the `index.css` file.
