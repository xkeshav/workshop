import { useState } from 'react';

import '../assets/styles/letter.css';

type LetterProps = unknown;

const Letter = (props: LetterProps) => {
  console.log({ props });
  const [word, setWord] = useState('');

  const convertTo = (letter: string | null) => {
    const lastLetter = word.at(-1);
    const secondLastLetter = word.at(-2);
    //    console.log({lastLetter, secondLastLetter, letter});
    // if last 3 letter are consecutive then replace it with `_`
    if (letter === lastLetter && letter === secondLastLetter) {
      setWord((prev) => prev.slice(0, -2) + '_');
    } else {
      setWord((prev) => prev + letter);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).children?.length == 0) {
      const { textContent } = e.target as HTMLElement;
      convertTo(textContent);
    }
  };
  return (
    <article className="card" role="document" aria-label="Letter Div" tabIndex={0}>
      <h1>Letter Problem</h1>
      <p>
        Print the letter which is being click on below Letter boxes and if a letter pressed 3 times consecutively then it will turn into
        underscore `_`{' '}
      </p>
      <section className="section">
        <div onClick={handleClick} className="container__letter" role="listbox">
          <p role="button">A</p>
          <p>B</p>
          <p>C</p>
          <p>D</p>
          <p>E</p>
          <p role="listitem">F</p>
        </div>
        <div className="output">
          String is <span aria-live="polite">{word}</span>
        </div>
      </section>
    </article>
  );
};

export { Letter };
