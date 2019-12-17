import React, { Component } from 'react';

import Content from './components/Content';
import Spinner from './components/Spinner';
import { getIndexes } from './lib/utils';

class App extends Component {

   constructor(props) {
      super(props);

      this.state = {
         word: 0,
         hits: [],
         misses: [],
         gameOver: true,
         loading: true
      }

      this.newGame = this.newGame.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
   }

   componentDidMount() {
      this.newGame();
   }

   handleKeyPress = e => {
      if (e.key.match(/[a-z]/g)) {

         let key = e.key;
         let indexes = getIndexes(e.key, this.state.word);

         if (indexes.length) {
            indexes.forEach(i => {
               this.setState(state => {
                  state.hits[i] = key;
                  return state;
               });
            })
         } else {
            this.state.misses.indexOf(key) < 0
               ? this.setState({ misses: this.state.misses.concat(key) })
               : console.log('you have already tried that one');
         }
      }
   }

   newGame = async () => {
      window.removeEventListener('keydown', this.handleKeyPress);
      this.setState({ loading: true })

      try {
         let dbURL = 'https://raw.githubusercontent.com/pogonik/react-hangman-for-team-sava/master/db.json'
         let res = await fetch(dbURL);
         let word = await res.json();
         let wordNo = Math.floor(Math.random()*60);
         word = word[wordNo];

         let hits = [];
         for (var i = 0; i < word.length; i++) {
            hits[i] = 0;
         }

         this.setState({ word, hits, misses: [], gameOver: false, loading: false })

      } catch (e) {

      }
      window.addEventListener('keydown', this.handleKeyPress);

   }

   render() {

      return (
         <div className="wrapper">
            <Content
               hits={this.state.hits}
               word={this.state.word}
               misses={this.state.misses}
               newGame={() => { this.newGame() }} />
            <svg viewBox="0 0 350 350" className="bgTriangle">
               <path d="M 350,0 0,350 350,350 z" />
            </svg>
            {this.state.loading ? <Spinner loading={this.state.loading} /> : null}
         </div>
      )
   }
}

export default App
