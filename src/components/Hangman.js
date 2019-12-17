import React from 'react';

import { HangmanSlices } from './HangmanSlices';

const Hangman = (props) => {

   const hangEmAll = () => {
      let slices = [];
      for (let i = 0; i < props.misses.length; i++) {
         slices.push(HangmanSlices[i])
      }
      return slices;
   }

   return (
      <svg viewBox="0 0 370 640" width="100%" height="100%">
         <path id="handle" fill="none" stroke="#53555D" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="30" d="M0 15h270" />
         <path id="rope" fill="none" stroke="#53555D" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="30" d="M227 30v40" />
         {hangEmAll()}
      </svg>
   )
}

// Hangman.defaultProps = {
//    misses: 0
// }

export default Hangman;
