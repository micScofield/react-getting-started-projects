import React, { useEffect, useState } from 'react';
import { wordleWords } from '../../data/wordle';
import './wordle.styles.scss';
import Button from '../common/button/Button';

const WORD_LENGTH = 5;
const NUMBER_OF_LINES = 6;
const GUESS_ARRAY = new Array(WORD_LENGTH).fill(null);
const GUESSES_ARRAY = new Array(NUMBER_OF_LINES).fill(null);
for (let i in GUESSES_ARRAY) {
  GUESSES_ARRAY[i] = GUESS_ARRAY;
}

//utility
function findNullValueIndexInArray(arr) {
  return arr.findIndex((el) => el === null);
}

function Wordle() {
  const [words, setWords] = useState([]);
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(GUESSES_ARRAY);
  const [gameover, setGameover] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  console.log('Wordle rendering');

  useEffect(() => {
    words && setSolution(words[Math.floor(Math.random() * words.length)]);
  }, [words]);

  //   useEffect(() => {
  //     console.log('useEffect invoked');
  //     setWords(wordleWords);

  //     // event logic
  //     document.addEventListener('keydown', handleKeypress);

  //     function handleKeypress(e) {
  //       e.preventDefault();

  //       if (gameover) return;

  //       // enter
  //       if (e.keyCode === 13) {
  //         const activeLine = guesses
  //           .filter((el) => el.every((element) => element !== null))
  //           .pop();

  //         const activeLineIndex = guesses.findIndex((el) => el === activeLine);
  //         console.log({activeLineIndex, currentLineIndex})

  //         if (!activeLine) return;

  //         const guess = activeLine.map((char) => char.toUpperCase()).join('');

  //         // check if word is valid
  //         if (!words.includes(guess)) {
  //           alert('Please try a different word.');
  //           const lastIndex = guesses.findIndex(
  //             (guess) => guess[WORD_LENGTH - 1] === null
  //           );
  //           const newGuesses = [...guesses];
  //           newGuesses[lastIndex - 1] = GUESS_ARRAY;
  //           setGuesses(newGuesses);
  //           return;
  //         }

  //         // check partial matching
  //         for (let i in activeLine) {
  //           const elements = document.querySelectorAll(
  //             `[data-id2='${activeLineIndex}-${activeLine[i]}']`
  //           );
  //           if (activeLine[i] === solution[i]) {
  //             elements.forEach((el) => el.classList.add('correct'));
  //           } else if (solution.includes(activeLine[i])) {
  //             elements.forEach((el) => el.classList.add('close'));
  //           } else {
  //             elements.forEach((el) => el.classList.add('incorrect'));
  //           }
  //         }

  //         // feed the guess to the GUESS_ARRAY
  //         const index = guesses.findIndex((el) => el === null);
  //         const newGuesses = [...guesses];
  //         newGuesses[index] = activeLine;
  //         setGuesses(newGuesses);
  //         setCurrentLineIndex(currentLineIndex => currentLineIndex + 1)

  //         // check if word matches solution
  //         if (guess === solution.toUpperCase()) {
  //           setGameover(true);
  //           return;
  //         }
  //       }

  //       if (e.keyCode > 64 && e.keyCode < 91) {
  //         const activeLineIndex = guesses.findIndex(
  //           (el) => el[WORD_LENGTH - 1] === null
  //         );
  //         console.log({activeLineIndex, currentLineIndex})

  //         const activeLine = guesses[activeLineIndex];

  //         // console.log({activeLine, activeLineIndex})

  //         const index = activeLine.findIndex((el) => el === null);
  //         const newGuess = [...activeLine];
  //         newGuess[index] = e.key.toUpperCase();

  //         // set new guesses array
  //         const newGuesses = [...guesses];
  //         newGuesses[activeLineIndex] = newGuess;
  //         setGuesses(newGuesses);
  //       }

  //       // backspace
  //       if (e.keyCode === 8) {
  //         let activeLineIndex = guesses.findIndex((el) =>
  //           el.every((element) => element === null)
  //         );
  //         console.log({activeLineIndex, currentLineIndex})

  //         let activeLine;
  //         if (activeLineIndex === -1) activeLineIndex = NUMBER_OF_LINES;
  //         activeLine = guesses[activeLineIndex - 1];
  //         if (activeLine) {
  //           const newGuess = [...activeLine];

  //           const index = newGuess.findIndex((el) => el === null);
  //           if (index === -1) {
  //             // need to clear the last char
  //             newGuess[WORD_LENGTH - 1] = null;
  //           } else {
  //             newGuess[index - 1] = null;
  //           }
  //           // new guesses
  //           const newGuesses = [...guesses];
  //           newGuesses[activeLineIndex - 1] = newGuess;
  //           setGuesses(newGuesses);
  //         }
  //       }
  //     }

  //     return () => document.removeEventListener('keydown', handleKeypress);
  //   }, [guesses, currentLineIndex]);

  useEffect(() => {
    console.log('useEffect invoked');
    setWords(wordleWords);

    // event logic
    document.addEventListener('keydown', handleKeypress);

    function handleKeypress(e) {
      e.preventDefault();

      if (gameover) return;

      // enter
      if (e.keyCode === 13) {
        const activeLine = guesses[currentLineIndex];

        if (!activeLine) return;

        const guess = activeLine.map((char) => char.toUpperCase()).join('');

        // check if word is valid
        if (!words.includes(guess)) {
          alert('Please try a different word.');
          const lastIndex = guesses.findIndex(
            (guess) => guess[guess.length - 1] === null
          );
          const newGuesses = [...guesses];
          newGuesses[lastIndex - 1] = GUESS_ARRAY;
          setGuesses(newGuesses);
          return;
        }

        // check partial matching
        for (let i in activeLine) {
          const elements = document.querySelectorAll(
            `[data-id2='${currentLineIndex}-${activeLine[i]}']`
          );
          if (activeLine[i] === solution[i]) {
            elements.forEach((el) => el.classList.add('correct'));
          } else if (solution.includes(activeLine[i])) {
            elements.forEach((el) => el.classList.add('close'));
          } else {
            elements.forEach((el) => el.classList.add('incorrect'));
          }
        }

        // feed the guess to the GUESS_ARRAY
        const index = findNullValueIndexInArray(guesses);
        const newGuesses = [...guesses];
        newGuesses[index] = activeLine;
        setGuesses(newGuesses);
        setCurrentLineIndex((currentLineIndex) => currentLineIndex + 1);

        // check if word matches solution
        if (guess === solution.toUpperCase()) {
          setGameover(true);
          return;
        }
      }

      if (e.keyCode > 64 && e.keyCode < 91) {
        const activeLine = guesses[currentLineIndex];

        // console.log({activeLine, currentLineIndex})

        const index = findNullValueIndexInArray(activeLine);
        if (index !== -1) {
          const newGuess = [...activeLine];
          newGuess[index] = e.key.toUpperCase();

          console.log({ index, newGuess });

          // set new guesses array
          const newGuesses = [...guesses];
          newGuesses[currentLineIndex] = newGuess;
          setGuesses(newGuesses);
        }
      }

      // backspace
      if (e.keyCode === 8) {
        let activeLine;
        activeLine = guesses[currentLineIndex];
        if (activeLine) {
          const newGuess = [...activeLine];

          const index = findNullValueIndexInArray(newGuess);
          if (index === -1) {
            // need to clear the last char
            newGuess[WORD_LENGTH - 1] = null;
          } else {
            newGuess[index - 1] = null;
          }
          // new guesses
          const newGuesses = [...guesses];
          newGuesses[currentLineIndex] = newGuess;
          setGuesses(newGuesses);
        }
      }
    }

    return () => document.removeEventListener('keydown', handleKeypress);
  }, [guesses, currentLineIndex]);

  // restart game
  const restartGameHandler = () => {
    // reload screen
    window.location.reload();

    // Else set states to their default values and reset css classes.
    /*
    setSolution(words[Math.floor(Math.random() * words.length)]);
    setGuesses(GUESSES_ARRAY);
    setGameover(false);
    setCurrentLineIndex(0);
    */
    // reset css here...
  };

  return (
    <div className='board'>
      {guesses.map((line, index) => (
        <Line key={index} guess={line} lineIndex={index} />
      ))}
      <div className='mb-20'></div>
      <h3>{solution}</h3>
      <div className='mb-20'></div>
      {gameover && (
        <div>
          <h3 style={{ textAlign: 'center' }}>You WIN !!!</h3>
          <Button text='Play Again' onClick={() => restartGameHandler()} />
        </div>
      )}
    </div>
  );
}

function Line({ guess, lineIndex }) {
  return (
    <div className='line'>
      {guess &&
        guess.map((char, index) => (
          <div
            key={index}
            className='char-container'
            data-id={char}
            data-id2={`${lineIndex}-${char}`}
          >
            <span className='char'>{char}</span>
          </div>
        ))}
    </div>
  );
}

export default Wordle;
