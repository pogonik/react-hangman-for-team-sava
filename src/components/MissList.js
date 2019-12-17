import React, { useState, useEffect } from 'react';

const MissList = props => {

   let [message, setMessage] = useState('');


   useEffect(() => {
      if(!props.letters.length) {
         setMessage('You have 0 misses!')
      } else {
         setMessage('You missed: ')
      }
   }, [props.letters.length]);

   return (
      <div className="missWrapper">
         <span className="notice">{message}</span>
         <div className="missList">
            {props.letters.join('')}
         </div>
      </div>
   )
}

MissList.defaultProps = {
   letters: []
};

export default MissList;
