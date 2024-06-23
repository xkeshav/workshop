import { Children, useState } from "react";

import "../assets/styles/letter.css";

type LetterPrintProps = unknown;

export const LetterPrint: React.FC<LetterPrintProps> = () => {
    const [word, setWord] = useState('');

    const convertTo = (letter: string | null) => {
       const lastLetter = word.at(-1);
       const secondLastLetter = word.at(-2);
    //    console.log({lastLetter, secondLastLetter, letter});
    // if last 3 letter are consecutive then replace it with `_`
       if(letter === lastLetter && letter === secondLastLetter) {
        setWord(prev => prev.slice(0, -2) + '_')
       } else {
        setWord(prev => prev + letter );
       }
    }

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if((e.target as HTMLElement).children?.length == 0) {
            const { textContent } = e.target as HTMLElement;
            convertTo(textContent);
        }
    }
    return (
        <div className="card">
            <h1>Letter Problem</h1>
            <div onClick={handleClick} className="container__letter">
                <p>A</p>
                <p>B</p>
                <p>C</p>
                <p>D</p>
                <p>E</p>
                <p>F</p>
            </div>
            <div className="output">
                string is {word}
            </div>
        </div>
    );
}