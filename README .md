# React Coding Challenge

## Introduction

This project is a bare-bones React/Typescript template. Candidates who are invited to solve the coding challenge are required to clone this repository and implement any components/hooks/modules/tests they deem necessary for a good design. This challenge is confidential and candidates should keep cloned repositories private. Once implemented, candidates are expected to provide private access to their interviewer(s) for code review.

## Challenge Description

The challenge consists in implementing a mini memory game in React and Typescript. These are the game rules:

- The landing page should display a grid (4x4) of cards initially laid face down.
- Each card hides an image that can be revealed by clicking on the card.
- The grid has unique pairs of distinct images (8 pairs for a 4x4 grid).
- Images should display avatars provided by [dicebear http API](https://www.dicebear.com/how-to-use/http-api/).

  Example:

  ```html
  <img src="https://avatars.dicebear.com/api/bottts/seed-9.svg" height="auto" width="{96}" alt="Avatar" />
  ```

- A countdown timer (30 seconds) is displayed on top of the grid and starts when the first card is revealed.
- When a user reveals two cards, two outcomes are possible:
  - If both card images match, they remain revealed for the rest of the game.
  - Otherwise, these two cards are turned face down again 0.5 second after the second card was revealed.
- The game ends when the last pair is revealed or when the time runs out.
- The remaining seconds is considered to be the user score and should be displayed at the end with a “Play again” button.

Optional extras:

- Add a "Restart" button for resetting both the grid and the timer at any time during the game.
- Make the grid size and the timer value configurable from the UI.

Candidates should aim to spend no more than 3 hours on this exercise. Please do
not feel obliged to complete all features or the optional extra requirements. We
emphasize quality over quantity.

## Notes

Remember to include this README.md along with an explanation of your approach and anything else we need to know about your submission.
Try to minimize the use of third party packages, or avoid them completely if possible.


## My Solution Approach

1. Import React and necessary hooks (`useState` and `useEffect`) from the 'react' library.

2. Define the `Grid` functional component, which represents a memory game.

3. Define state variables using the `useState` hook:
   - `shuffledAvatars`: Stores an array of avatar names, which will be shuffled and used for the game.
   - `isHidden`: Stores an array of booleans, where each boolean represents whether a cell (image) is hidden or revealed.
   - `timer`: Stores the countdown timer value in seconds.
   - `isGameStarted`: Indicates whether the game is in progress.
   - `matchedPairs`: Keeps track of the number of matched pairs.
   - `score`: Stores the current game score, which can be a number (time remaining) or a string ("Time's up!").
   - `clickQueue`: Keeps track of clicked cell indices.

4. Define `rows` and `cols` to specify the grid dimensions.

5. Create an array called `avatars` containing avatar names. This array will be used to generate avatar pairs for the game.

6. Define the `handleOnClick` function, which is called when a cell is clicked. It:
   - Checks if the game is started and if the cell is hidden.
   - Updates the `isHidden` state to reveal the clicked cell.
   - Adds the clicked cell index to the `clickQueue`.
   - Checks for matching pairs in the `clickQueue`. If two cells are clicked, it checks if their avatars match.
     - If they match, it increments the `matchedPairs` count and clears the `clickQueue`.
     - If they don't match, it hides the cells after a delay of 500ms and clears the `clickQueue`.

7. Define the `startGame` function, which starts the game by setting `isGameStarted` to `true` and initializing a timer that counts down from 30 seconds. When the timer reaches 1, it clears the timer and sets `isGameStarted` to `false`.

8. Define the `resetGame` function, which resets the game state to its initial values:
   - Sets `isGameStarted` to `false`.
   - Resets the timer to 30 seconds.
   - Sets `matchedPairs` to 0.
   - Sets `score` to `null`.
   - Clears the `clickQueue`.
   - Resets the `isHidden` state to hide all cells.

9. Create the `grid` JSX element, representing the game grid. It maps through the rows and columns and creates individual cell elements for each avatar. Each cell is a clickable `<div>` element that can reveal an avatar image when clicked.

10. Use the `useEffect` hook to shuffle the `avatars` array and initialize `shuffledAvatars` when the component is mounted.

11. Use another `useEffect` hook to monitor changes in `matchedPairs` and `timer`. When all pairs are matched or the timer reaches 0, it sets the `score` accordingly.

12. In the JSX code, render the game interface based on the game state. It displays the current score (time remaining or "Time's up!") and a "Play Again" button if the game is over. If the game is in progress, it shows the timer and a "Start Game" button.

13. Finally, render the game grid below the interface.



