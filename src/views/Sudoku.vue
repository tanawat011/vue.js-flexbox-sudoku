<template>
    <div>
        <p class="timer">{{ isLoading ? 'Loading...' : `Elapsed Time: ${timer} seconds` }}</p>
        <div class="board">
            <template v-for="(v, i) in board">
                <div v-for="(vv, j) in v" :key="`cel-${i}-${j}`" :class="`cell ${isInitialList.length && isInitialList[i][j] ? 'initial' : ''}`"
                     @click="clickCelled(i, j)">
                    {{ vv }}
                </div>
            </template>
        </div>
        <button type="button" class="restart-button" @click="restartBoard">Restart</button>
        <button type="button" @click="submit">Submit</button>
        <p>{{ statusText }}</p>
    </div>
</template>

<script lang="js">
  import axios from 'axios'

  export default {
    data() {
      return {
        timer: 0,
        statusText: '',
        model: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        board: [],
        isInitialList: [],
        isLoading: false,
        interval: ''
      }
    },
    mounted() {
      this.restartBoard()
      this.interval = setInterval(() => {
        this.timer += 1
      }, 1000)
    },
    methods: {
      restartBoard() {
        this.isLoading = true
        this.board = this.model
        axios.get('https://us-central1-skooldio-courses.cloudfunctions.net/react_01/random').then(({ data: board }) => {
          this.timer = 0
          this.board = board.board
          this.isInitialList = board.board.map(v => v.map(vv => vv !== 0))
          this.isLoading = false
        })
      },
      submit() {
        const isValid = this.validate(this.board)
        if (isValid) {
          clearInterval(this.interval)
        }
        this.statusText = isValid ? 'Board is complete !!' : 'Board is invalid :)'
      },
      validate(board) {
        let isValid = true
        for (let i = 0; i < 4; i++) {
          const horizontal = new Set()
          const vertical = new Set()
          const square = new Set()
          for (let j = 0; j < 4; j++) {
            horizontal.add(board[i][j])
            vertical.add(board[j][i])
            square.add(
                board[2 * (i % 2) + (j % 2)][2 * Math.floor(i / 2) + Math.floor(j / 2)]
            )
          }
          horizontal.delete(0)
          vertical.delete(0)
          square.delete(0)
          if (horizontal.size !== 4 || vertical.size !== 4 || square.size !== 4) {
            isValid = false
          }
        }
        return isValid
      },
      clickCelled(i, j) {
        if (!this.isInitialList[i][j]) {
          let b = this.board
          b[i][j] = (this.board[i][j] + 1) % 5
          this.board = []
          this.board = b
        }
      }
    }
  }
</script>
