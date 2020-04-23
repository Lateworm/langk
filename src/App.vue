<template>
  <section id="app">
    <link href="https://fonts.googleapis.com/css?family=Inconsolata&display=swap" rel="stylesheet">

    <div class='control-panel'>
      <HelloWorld msg="LYNGK Replay Tool"/>

      <button>
        <span v-if='showInput' v-on:click='showInput = !showInput'>Go To Playback Mode</span>
        <span v-if='!showInput' v-on:click='showInput = !showInput'>Go To Record/Edit Mode</span>
      </button>
      <br><br>

      <!-- Record/Edit Mode -->
      <div v-if='showInput'>
        <label>Initial board state</label><br>
        <input type='text' size='52' v-model='input.boardInput' v-on:change='updateInputs'><br>

        <button v-on:click='generateRandomBoard'>
          Generate Random Board
        </button><br>

        <label>First Mover</label><br>
        <input type='text' size='16' maxlength='16' v-model='input.p1' v-on:change='updateInputs'><br>

        <label>Second Mover</label><br>
        <input type='text' size='16' maxlength='16' v-model='input.p2' v-on:change='updateInputs'><br>

        <label>Move History</label><br>
        <textarea cols='8' rows='16' v-model='input.moveInput' v-on:change='updateInputs' @keyup.enter.prevent='updateInputs'></textarea><br>
      </div>

      <!-- Playback Mode -->
      <div v-if='!showInput'>
        <h2>Players</h2>

        <h3>{{ input.p1 }}</h3>
        <span>picks:</span>
        <div class='picks'>
          <span>picks:</span>
          <div v-for='pick in gameState.p1Picks' class='pick-container' :key='pick'>
            <div class='pick' :class='pick'>{{ pick }}</div>
          </div>
        </div><br>
        <span>stacks: {{ gameState.p1Stacks.length }}</span>

        <h3>{{ input.p2 }}</h3>
        <span>picks:</span>
        <div class='picks'>
          <span>picks:</span>
          <div v-for='pick in gameState.p2Picks' class='pick-container' :key='pick'>
            <div class='pick' :class='pick'>{{ pick }}</div>
          </div>
        </div><br>
        <span>stacks: {{ gameState.p2Stacks.length }}</span>

        <h2>Moves</h2>
        <ul>
          <li v-for='(move, i) in moveHistory' :key='move'>
            <span v-if='i % 2 === 0'>{{ input.p1 }}</span>
            <span v-if='i % 2 === 1'>{{ input.p2 }}</span>
            <span>{{ move }}</span>
          </li>
          <li>👀</li>
          <li v-for='(move, i) in moveFuture' class='future' :key='move'>
            <span v-if='(i + moveHistory.length) % 2 === 0'>{{ input.p1 }}</span>
            <span v-if='(i + moveHistory.length) % 2 === 1'>{{ input.p2 }}</span>
            <span>{{ move }}</span>
          </li>
        </ul>

        <button v-on:click='stepBack' :disabled='moveHistory.length < 1'>Step Back</button>
        <button v-on:click='goToStart' :disabled='moveHistory.length < 1'>Start</button><br>

        <button v-on:click='stepForward' :disabled='moveFuture.length < 1'>Step Forward</button>
        <button v-on:click='goToEnd' :disabled='moveFuture.length < 1'>End</button><br>
      </div>
    </div>

    <svg viewBox='0 0 800 893' xmlns='http://www.w3.org/2000/svg'>
      <!-- y values are sin(60) * 100 * n -->

      <text x='1' y='086.6'>A1</text><text x='777' y='086.6'>A1</text>
      <text x='1' y='173.2'>B1</text><text x='777' y='173.2'>B4</text>
      <text x='1' y='259.8'>C1</text><text x='777' y='259.8'>C7</text>
      <text x='1' y='346.4'>D1</text><text x='777' y='346.4'>D6</text>
      <text x='1' y='433.0'>E1</text><text x='777' y='433.0'>E7</text>
      <text x='1' y='519.6'>F1</text><text x='777' y='519.6'>F6</text>
      <text x='1' y='606.2'>G1</text><text x='777' y='606.2'>G7</text>
      <text x='1' y='692.8'>H1</text><text x='777' y='692.8'>H4</text>
      <text x='1' y='779.4'>I1</text><text x='777' y='779.4'>I1</text>

      <polygon
        points='400,86.6 450,173.2 550,173.2 600,259.8 700,259.8 650,346.4 700,433.0, 650,519.6 700,606.2 600,606.2 550,692.8 450,692.8
              400,779.4 350,692.8 250,692.8 200,606.2 100,606.2 150,519.6, 100,433.0 150,346.4 100,259.8 200,259.8 250,173.2 350,173.2'
      />

      <line x1='250' y1='173.2' x2='550' y2='173.2'/><!-- b -->
      <line x1='100' y1='259.8' x2='700' y2='259.8'/><!-- c -->
      <line x1='150' y1='346.4' x2='650' y2='346.4'/><!-- d -->
      <line x1='100' y1='433.0' x2='700' y2='433.0'/><!-- e -->
      <line x1='150' y1='519.6' x2='650' y2='519.6'/><!-- f -->
      <line x1='100' y1='606.2' x2='700' y2='606.2'/><!-- g -->
      <line x1='250' y1='692.8' x2='550' y2='692.8'/><!-- h -->
      
      <line x1='400' y1='086.6' x2='700' y2='606.2'/><!-- a1 \ g7 -->
      <line x1='250' y1='173.2' x2='550' y2='692.8'/><!-- b1 \ h4 -->
      <line x1='350' y1='173.2' x2='600' y2='606.2'/><!-- b2 \ g6 -->
      <line x1='550' y1='173.2' x2='700' y2='433.0'/><!-- b4 \ e7 -->
      <line x1='100' y1='259.8' x2='400' y2='779.4'/><!-- c1 \ i1 -->
      <line x1='200' y1='259.8' x2='450' y2='692.8'/><!-- c2 \ h3 -->
      <line x1='100' y1='433.0' x2='250' y2='692.8'/><!-- e1 \ h1 -->

      <line x1='400' y1='086.6' x2='100' y2='606.2'/><!-- a1 / g1 -->
      <line x1='250' y1='173.2' x2='100' y2='433.0'/><!-- b1 / e1 -->
      <line x1='450' y1='173.2' x2='200' y2='606.2'/><!-- b3 / g2 -->
      <line x1='550' y1='173.2' x2='250' y2='692.8'/><!-- b4 / h1 -->
      <line x1='600' y1='259.8' x2='350' y2='692.8'/><!-- c6 / h2 -->
      <line x1='700' y1='259.8' x2='400' y2='779.4'/><!-- c7 / i1 -->
      <line x1='700' y1='433.0' x2='550' y2='692.8'/><!-- e7 / h4 -->

      <template v-for='(stack, i) in gameState.boardPlayState'>
        <circle 
          v-for='piece in stack'
          :key='`${piece.x}${piece.y}`'
          :cx='piece.x'
          :cy='piece.y'
          r='35'
          :class='piece.colour'
          v-on:click='clickPiece(i)'/>
      </template>

      <text x='780' y='883'>{{ lastClickedPosition }}</text>
    </svg>

  </section>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

import {
  buildStartState,
  hydrateBoard
} from './scripts/deps.js';

import {
  boardGenerator,
 } from './scripts/random_board.js';

export default {
  name: 'App',

  components: { HelloWorld },

  data: function() {
    return {
      // User inputs backed by localStorage
      input: {
        boardInput: '', // will be populated from random generator
        moveInput:
`e3d3
^k c4d3
^g f2d3
^w g2d3`,
        p1: 'Alf',
        p2: 'Betty',
      },

      // Game state created by hydrateBoard()
      gameState: {
        boardPlayState: {},
        p1Picks: [],
        p2Picks: [],
        p1Stacks: [],
        p2Stacks: [],
      },

      // stragglers
      showInput: false,
      boardStartState: {},
      moveHistory: [],
      moveFuture: [],

      // WIP - experimenting with clickable board
      lastClickedPosition: '',
    }
  },

  created() {
    // Restore previous work from localStorage, if any 
    const localInput = JSON.parse(localStorage.getItem('input'))
    if (localInput) {
      this.input = localInput
    } else {
      this.input.boardInput = boardGenerator();
    }


    this.boardStartState = buildStartState(this.input.boardInput)
    this.buildHistory();

    this.gameState = hydrateBoard(this.boardStartState, this.moveHistory);
  },

  methods: {
    buildHistory: function () {
      // parse the input string into a usable structure
      this.moveHistory = this.input.moveInput.match(/([^\r\n]+)/g) || [];
      this.moveFuture = [];
    },

    buildFuture: function () {
      // parse the input string into a usable structure
      this.moveFuture = this.input.moveInput.match(/([^\r\n]+)/g) || [];
      this.moveHistory = [];
    },

    updateInputs: function () {
      // save work into localStorage and update state to reflect the new input
      localStorage.setItem('input', JSON.stringify(this.input));

      this.boardStartState = buildStartState(this.input.boardInput)
      this.buildHistory();
      this.gameState = hydrateBoard(this.boardStartState, this.moveHistory);
    },

    stepBack: function () {
      this.moveFuture.unshift(this.moveHistory.pop());
      this.gameState = hydrateBoard(this.boardStartState, this.moveHistory); 
    },

    stepForward: function () {
      this.moveHistory.push(this.moveFuture.shift());
      this.gameState = hydrateBoard(this.boardStartState, this.moveHistory);
    },

    goToStart: function () {
      this.buildFuture()
      this.gameState = hydrateBoard(this.boardStartState, this.moveHistory);
    },

    goToEnd: function () {
      this.buildHistory();     
      this.gameState = hydrateBoard(this.boardStartState, this.moveHistory);
    },

    generateRandomBoard: function () {
      this.input.boardInput = boardGenerator();
      this.input.moveInput = '';
      this.updateInputs();
    },

    clickPiece: function (position) {
      this.lastClickedPosition = position
    }
  },
}
</script>

<style>
  /* The default 'Rio Grande' colour scheme */
  :root {
    --bg-main: hsl(40, 18%, 80%);
    --bg-alt: hsl(40, 18%, 85%);
    --fg-main: hsl(40, 10%, 25%);
    --fg-alt: hsl(40, 10%, 55%);

    --red: hsl(0, 80%, 50%);
    --green: hsl(120, 82%, 35%);
    --blue: hsl(240, 78%, 50%);
    --white: hsl(40, 100%, 92%);
    --black: hsl(0, 90%, 8%);
    --wild: hsl(0, 5%, 65%);
  }

  body {
    background-color: var(--bg-main);
    color: var(--fg-main);
    font-family: 'Inconsolata', monospace;
    margin: 0;
  }

  section {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-evenly;
  }

  /* Styles for UI */
  .control-panel {
    width: 30rem;
  }

  h1, h2, h3 {
    margin-top: 1.75rem;
    margin-bottom: .85rem;
  }
  h1 { font-size: 1.5rem; }
  h2 { font-size: 1.25rem; }
  h3 { font-size: 1.2rem; }

  input,
  textarea,
  button,
  select {
    background-color: var(--bg-alt);
    color: var(--fg-main);
    font-family: 'Inconsolata', monospace;
    font-size: 1rem;
    margin-bottom: .5rem;
    padding: .35rem .5rem;
  }

  input,
  textarea,
  select {
    border: 0;
  }

  button {
    border: 1px solid var(--fg-alt);
    border-radius: 4px;
  }

  button:disabled,
  .future {
    color: var(--fg-main);
  }

  ul {
    width: 16rem;
    margin-bottom: .5rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 4px;
  }

  li:nth-child(even) { 
    background-color: var(--bg-alt);
  }


  /* BOARD */

  svg {
    height: 100%;
    /* transform: perspective(800px) rotateX(10deg); */
  }
  svg line {
    stroke: var(--fg-alt);
    stroke-width: 2;
  }
  svg polygon {
    fill: var(--bg-alt);
  }
  svg text {
    fill: var(--fg-main);
  }

  .r {  fill: var(--red);
        background-color: var(--red); }
  .g {  fill: var(--green);
        background-color: var(--green); }
  .b {  fill: var(--blue);
        background-color: var(--blue); }
  .w {  fill: var(--white);
        background-color: var(--white); }
  .k {  fill: var(--black);
        background-color: var(--black); }
  .z {  fill: var(--wild);
        background-color: var(--wild); }

  .pick-container {
    display: inline-block;
    vertical-align: text-bottom;
  }
  .pick {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--bg-main);
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
  }
  .pick.w {
    color: var(--fg-main);
  }

  .picks {
    display: inline-block;
    height: 2rem;
  }

  /* :root {
    dark
    --bg-main: hsl(0, 0%, 25%);
    --bg-alt: hsl(0, 0%, 22%);
    --fg-main: hsl(0, 0%, 80%);
    --fg-alt: hsl(0, 0%, 40%);

    --red: hsl(10, 80%, 50%);
    --green: hsl(95, 82%, 35%);
    --blue: hsl(225, 78%, 50%);
    --white: hsl(40, 100%, 92%);
    --black: hsl(0, 0%, 8%);
    --wild: hsl(0, 0%, 50%);
  }

  :root {
    neutral
    --bg-main: hsl(0, 0%, 80%);
    --bg-alt: hsl(0, 0%, 85%);
    --fg-main: hsl(0, 0%, 45%);
    --fg-alt: hsl(0, 0%, 55%);

    --red: hsl(0, 80%, 50%);
    --green: hsl(120, 82%, 35%);
    --blue: hsl(240, 78%, 50%);
    --white: hsl(40, 0%, 92%);
    --black: hsl(40, 0%, 8%);
    --wild: hsl(40, 0%, 65%);
  } */
</style>
