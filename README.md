
# HangmanGame Description

Overview
This script implements a basic Hangman game using vanilla JavaScript. The user has to guess the letters of a randomly chosen word, and the game provides feedback on correct and incorrect guesses. The game ends when the user either guesses the word correctly or makes too many incorrect guesses.


## Elements
The following HTML elements are manipulated by the script:

- `wordElement (word)`: 
    Displays the current state of the guessed word.
- `wrongLettersElement (wrong-letters)`: 
    Displays the letters that have been guessed incorrectly.
- `playAgainButton (play-button)`: 
    Button to restart the game.
- `popup (popup-container)`: 
    Popup that shows the game result.
- `notification (notification-container)`: 
    Notification that appears when a letter has already been guessed.
- `finalMessage (final-message)`: 
    Displays the final message ("Congratulations! You won!" or "Unfortunately you lost").
- `finalMessageRevealWord (final-message-reveal-word)`: 
    Reveals the word when the user loses.
- `figureParts`: 
    Represents parts of the hangman figure that are displayed with each incorrect guess.
## Variables
- `words`: An array of words from which a random word is selected for the game.
- `selectedWord`: The word randomly chosen from the words array for the current game.
- `playable`: A boolean indicating whether the game is currently active.
- `correctLetters`: An array storing the letters correctly guessed by the user.
- `wrongLetters`: An array storing the letters guessed incorrectly.