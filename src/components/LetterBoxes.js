import React from 'react';

const LetterBoxes = props => {

   const buildBoxes = () => {
      let boxes = [];
      let count = props.hits.length;

      if(count) {
         for (let i = 0; i < count; i++) {
            let l = props.hits[i] ? props.hits[i] : '';
            boxes.push(<div className="box" key={i}>{l}</div>);
         }
         // for (let i = 0; i < 11; i++) {
         //    let l = props.hits[i] ? props.hits[i] : '';
         //    if (i > (11 - props.hits.length))
         //       boxes.push(<div className="box" key={i}>{l}</div>);
         //    else
         //       boxes.push(<div className="box disabled" key={i} disabled>{l}</div>);
         // }
      }
      return boxes;
   }

   return (
      <div className="letterBoxes">{buildBoxes()}</div>
   )
}

export default LetterBoxes;
