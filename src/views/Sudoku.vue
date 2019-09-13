<template>
    <div>
        <p class="timer">{{ isLoading ? 'Loading...' : `Elapsed Time: ${timer} seconds` }}</p>
        <div class="board">
            <template v-for="(v, i) in newBoard">
                <div v-for="(vv, j) in v" :key="`cel-${i}-${j}`" :class="`cell ${initialList.length && initialList[i][j] ? 'initial' : ''}`"
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

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        statusText: '',
        interval: '',
        timer: 0,
        newBoard: []
      }
    },
    computed: {
      ...mapGetters({
        isLoading: 'global/getIsLoading',
        board: 'global/getBoard',
        initialList: 'global/getInitialList'
      })
    },
    watch: {
      board(v) {
        this.newBoard = v
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
        this.timer = 0
        this.$store.dispatch('global/fetch')
      },
      submit() {
        const isValid = this.validate(this.board)
        this.statusText = isValid ? 'Board is complete !!' : 'Board is invalid :)'
        if (isValid) {
          clearInterval(this.interval)
        }
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
        if (!this.initialList[i][j]) {
          let b = this.newBoard
          b[i][j] = (this.newBoard[i][j] + 1) % 5
          this.newBoard = []
          this.newBoard = b
        }
      }
    }
  }
</script>
