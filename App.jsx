import {use, useState} from 'react';
import { clsx } from 'clsx';
import {useEffect } from 'react';
import Confetti from "react-confetti"
import { words } from './words';

export default function App() {
    //const [correctWord, setCorrectWord] = useState(words[Math.floor(Math.random() * words.length)]);
    const [correctWord, setCorrectWord] = useState("apple");

    const [word, setWord] = useState(Array(6).fill(""));
    const [guessedword, setGuessedWord] = useState([]);
    const [row, setRow] = useState(0);
    const[letterstatus, setLetterStatus] = useState({});
    const gameOver = guessedword.join("") != correctWord && row === 6;

    const [gameWon, setGameWon] = useState(false);
    
useEffect(() => {
    /**
     * Handles keydown events.
     * If the user presses the enter key, it tries to enter the current guessed word.
     * If the user presses the backspace key, it deletes the last letter from the guessed word.
     * If the user presses a letter key, it adds the letter to the current guessed word.
     * @param {KeyboardEvent} event The keydown event.
     */
    const handleKeyDown=(event) => {
        const key = event.key.toLowerCase();
        if (key === "enter") {
            Enterword(row, guessedword);
        } else if (key === "backspace") {
            deleteGuessedWord();
        } else if (/^[a-z]$/.test(key)) {
            addGuessedWord(key);
        }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
        window.removeEventListener("keydown", handleKeyDown);
    };
}, [guessedword, row]);


/**
 * Checks if the provided guessed word is valid by querying a dictionary API.
 * Updates the game state accordingly based on the validity of the word.
 * Sets the guessed word in the game grid and updates the letter status.
 * If the guessed word matches the correct word, sets the game as won.
 * Increments the row to move to the next attempt.
 * 
 * @param {number} index - The index of the current row in the grid.
 * @param {Array<string>} newvalue - The array of letters representing the guessed word.
 */

  async function Enterword(index,newvalue) {
    // check if the guessed word is valid
    const wordToCheck = newvalue.join("").toLowerCase();
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`);

    if (!response.ok) {
        alert("Please enter a valid word");
        return;
    }
    else{
        setWord(prev => {
            const updated = [...prev];
            updated[index] = newvalue.join("");
            return updated;
        });
        setLetterStatus((prev) => {
            const updatedstatus = { ...prev };
            newvalue.map((letter, i) => {
                if(letter === correctWord[i]) {
                    updatedstatus[letter] = "correct";
                }
                else if(correctWord.includes(letter)) {
                    updatedstatus[letter] = "available";
                }
                else {
                    updatedstatus[letter] = "notavailable";
                }
            });
            return updatedstatus;
        });
  
        setGameWon(guessedword.join("") === correctWord);

      

        setGuessedWord([]);
        setRow(prev => prev + 1); // move to next row
    }

   
    
}
    useEffect(() => {
        if (gameOver) {
            const timeoutId = setTimeout(() => {
                alert("Game Over! The correct word was: " + correctWord);
            }, 1000); // 2 seconds delay
            return () => clearTimeout(timeoutId); // Cleanup the timeout on unmount
        }
        if (gameWon) {
            const timeoutId = setTimeout(() => {
                alert("You won! The correct word was: " + correctWord);
            }, 5000); // 2 seconds delay
            return () => clearTimeout(timeoutId); // Cleanup the timeout on unmount
        }
    }, [gameOver, gameWon]);

    /**
     * Adds a letter to the current guessed word.
     * If the guessed word already has the same number of letters as the correct word, it does nothing.
     * @param {string} letter The letter to add to the guessed word.
     */
    function addGuessedWord(letter) {
        if (guessedword.length >= correctWord.length) {
            return;
        }
        setGuessedWord((prev) => {
            const newGuessedWord = [...prev, letter];
            
            return newGuessedWord;
        });
    }
    /**
     * Deletes the last letter from the current guessed word.
     * If the guessed word is empty, it does nothing.
     */
    function deleteGuessedWord() {
        if (guessedword.length === 0) {
            return;
        }
        setGuessedWord((prev) => {
            const newGuessedWord = prev.slice(0, -1);
            return newGuessedWord;
        });
    }
   


    const wordle_word = word.map((letter, index) => {
      
        const rowContent = index === row ? guessedword : word[index].split("");
        const isSubmittedRow = word[index] !== "";
        // First pass: build array with correct matches
        const result = Array(correctWord.length).fill(null);
        if (isSubmittedRow) {
            for (let i = 0; i < correctWord.length; i++) {
            if (rowContent[i] === correctWord[i]) {
                result[i] = "correct";
            }
            }

            // Second pass: handle available (yellow) and notavailable (gray)
            for (let i = 0; i < correctWord.length; i++) {
            if (result[i]) continue; // already marked correct
            const char = rowContent[i];
            if (correctWord.includes(char)) {
                result[i] = "available";
            } else {
                result[i] = "notavailable";
            }
            }
        }

     

            
        
        return (
        <div key={index} className="word-row">
           { 
           Array(correctWord.length).fill("").map((_, i) => {
           
            if(isSubmittedRow){

            return <span key={i} className={result[i]}>{rowContent[i]}</span>
             
            }
            return <span key={i} className="letter">{rowContent[i]}</span>;

           
           })}
        </div>
           );
    });
      
   
    const alphabet = "qwertyuiop,asdfghjkl,zxcvbnm";
    const enter= "Enter";
    const dlt= "Delete";

    const alphabetArray = alphabet.split(",");
   

    const alphabetButtonA = alphabetArray[0].split("").map((letter, index) => {
        // check if the letter is already guessed
        const classname=clsx({letter: true, 
            correct: letterstatus[letter] === "correct", 
            available: letterstatus[letter] === "available", 
            notavailable: letterstatus[letter] === "notavailable"});

        return <button onClick={() => addGuessedWord(letter)}  key={index} className={classname}>{letter}</button>;
        
        
        
      
    });
    const alphabetButtonB = alphabetArray[1].split("").map((letter, index) => {
        const classname=clsx({letter: true, 
            correct: letterstatus[letter] === "correct", 
            available: letterstatus[letter] === "available", 
            notavailable: letterstatus[letter] === "notavailable"});
        return (
            <button onClick={() => addGuessedWord(letter)} key={index} className={classname}>{letter}</button>
        )
    });
    const alphabetButtonC = [
        <button onClick={() => Enterword(row, guessedword) } key="enter" className="enter">{enter}</button>,
        ...alphabetArray[2].split("").map((letter, index) => {
            const classname=clsx({letter: "letter", 
                correct: letterstatus[letter] === "correct", 
                available: letterstatus[letter] === "available", 
                notavailable: letterstatus[letter] === "notavailable"});  
            return <button onClick={() => addGuessedWord(letter)} key={`C-${index}`} className={classname}>{letter}</button>
        }),
        <button onClick={() => deleteGuessedWord()} key="delete" className="delete">{dlt}</button>
    ];
   



    return(
        <main>
            {gameWon && <Confetti
            numberOfPieces={2000}
            recycle={false}
             />}
            <h1>Wordle</h1>
            <section className="word">
                {wordle_word}
            </section>
           
            <section className="keyboard">
            <div className="keyboard-row">{alphabetButtonA}</div>
                <div className="keyboard-row">{alphabetButtonB}</div>
                <div className="keyboard-row">{alphabetButtonC}</div>
            </section>
        </main>

    )
}
