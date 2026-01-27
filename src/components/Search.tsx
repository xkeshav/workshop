/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import "../assets/styles/search.css"

export const Search: React.FC = () => {
  const [state, setState] = useState<null | {capital: string, zone: string}>(null);
  const [term, setTerm] = useState('');
  const [list, setList] = useState<string[]>([]);

  const stateList = {
    "mp": {
      capital: 'Bhopal',
      zone: "north"
    },
    "up": {
      capital: "Lucknow",
      zone: "north"
    },
    "hp": {
      capital: "Shimla",
      zone: "east"
    },
    "ap": {
      capital: "Hyderabad",
      zone: "south"
    }
  }

  const getStateData = (st: string) => stateList[st];

  const getState = (e: any) =>{
    console.log('getState called')
    setTerm(e.target.value);
    Object.entries(stateList).find(([k,v]) => {
      if(k === term) {
        setState(v);
        setList((l) => l.includes(term) ? l : l.concat(term));
      }
    })
  };
  
  return (
    <div className="search-container">
      <div className="search-row">
        <input
          name="search"
          type="search"
          id="search"
          className="search-input"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          placeholder="search state"
        />
        <button className="search-btn" onClick={getState}>
          Search
        </button>
      </div>

        {state ? (
          <div className="result-card">
            <p>Capital: {state?.capital}</p>
            <p>Zone: {state?.zone}</p>
          </div>
        ) : (
          <p>No result</p>
        )}
      <h3>Previous Search List</h3>
      <ul className='list'>
        {list.map((l, i) => (
          <li key={i} onClick={() => setState(getStateData(l))}>
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
};