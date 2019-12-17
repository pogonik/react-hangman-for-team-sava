import React, { Component } from 'react';

import Content from './components/Content';
import Spinner from './components/Spinner';
import { wordAPIbaseURL, wordAPIKey, getIndexes } from './lib/utils';

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
         const res = await fetch(`${wordAPIbaseURL}?key=${wordAPIKey}`);
         let word = await res.json();
         word = word[0];

         let hits = [];
         // 0 for every letter. no zero's means all letters nailed - game over
         for (var i = 0; i < word.length; i++) {
            hits[i] = 0;
         }

         this.setState({ word, hits, misses: [], gameOver: false, loading: false })
         // this.setState( state => {
         //    state.word = word;
         //    state.hits = hits;
         //    state.misses = [];
         //    state.gameOver = false;
         //    state.loading = false;
         //
         //    return state;
         // })

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
