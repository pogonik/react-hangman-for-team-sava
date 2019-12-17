import React from 'react'

import Hangman from './Hangman';
import MissList from './MissList';
import LetterBoxes from './LetterBoxes';

const Content = props => (
   <div className="content">
      <div className="top">
         <button type="button" onClick={() => { props.newGame() }}>New Game</button>
         <div className="gallowsWrapper">
            <Hangman misses={props.misses} />
         </div>
         <MissList letters={props.misses} />
      </div>
      <LetterBoxes hits={props.hits} />
   </div>
)

export default Content;
