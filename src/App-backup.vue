<template>
    <div id="app" class="container">

        <!--        Header-->
        <header>
            <nav>
                <li><a href="#"><h1>Header</h1></a></li>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
            </nav>
            <button>Button</button>
        </header>

        <!--        Main and Sidebar-->
        <div class="main-and-sidebar-wrapper">

            <!--            Main-->
            <section class="main">
                <h2>Default Layout</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.Blanditiis
                    totam tempora, nulla ex reprehenderit quam.Aut repellat dolor et vero
                    aliquam ducimus praesentium incidunt quibusdam sequi ? Aliquid rerum
                    assumenda accusantium.
                </p>
                <img src="./assets/images/earth-blue-marble.jpg" height="2048" width="2048" alt=""/>

                <div>
                    <p class="timer">{{ isLoading ? 'Loading...' : `Elapsed Time: ${timer} seconds` }}</p>
                    <div class="board">
                        <template v-for="(v, i) in board">
                            <div v-for="(vv, j) in v" :key="`cel-${i}-${j}`" :class="`cell ${isIntialList[i][j] ? 'initial' : ''}`"
                                 @click="clickCelled(i, j)">
                                {{ vv }}
                            </div>
                        </template>
                    </div>
                    <button type="button" class="restart-button" @click="restartBoard">Restart</button>
                    <button type="button" @click="submit">Submit</button>
                    <p>{{ statusText }}</p>
                </div>
            </section>

            <!--            Sidebar-->
            <aside class="sidebar">
                <h3> Sidebar </h3>
            </aside>
        </div>

        <!--        Footer-->
        <footer>
            <h3> Footer </h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.Blanditiis totam
                tempora, nulla ex reprehenderit quam.Aut repellat dolor et vero aliquam
                ducimus praesentium incidunt quibusdam sequi ? Aliquid rerum assumenda
                accusantium.
            </p>
        </footer>
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
        isIntialList: [],
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
          this.isIntialList = board.board.map(v => v.map(vv => vv !== 0))
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
        if (!this.isIntialList[i][j]) {
          let b = this.board
          b[i][j] = (this.board[i][j] + 1) % 5
          this.board = []
          this.board = b
        }
      }
    }
  }
</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    body {
        background-color: #eee;
        color: #4e4544;
        font-family: Arial, Helvetica, sans-serif;
    }

    .container {
        max-width: 900px;
        background-color: #fff;
        margin: 0 auto;
        padding: 0 60px;
        display: flex;
        flex-direction: column;

        header {
            color: #ef5350;
            padding: 20px 0;
            margin-bottom: 60px;
            display: flex;
            justify-content: space-between;

            nav {
                list-style: none;
                display: flex;
                align-items: baseline;

                li {
                    margin-right: 15px;
                }
            }

            button {
                background-color: #ef5350;
                border: none;
                padding: 8px 25px;
                color: #fff;
                cursor: pointer;
                text-transform: uppercase;
            }
        }

        .main-and-sidebar-wrapper {
            display: flex;
        }

        .main {
            text-align: center;
            margin-right: 60px;
            flex: 3;

            h2 {
                font-size: 32px;
                margin-bottom: 55px;
            }

            p {
                margin-bottom: 50px;
            }

            img {
                height: auto;
                width: 100%
            }
        }

        .sidebar {
            border: 1px solid #a2a2a2;
            padding: 20px;
            flex: 1;
        }

        footer {
            color: #ef5350;
            text-align: center;
            padding: 20px 0;
            margin-top: 60px;

            p {
                color: #777;
                font-size: 12px;
                padding: 10px;
            }
        }
    }

    @media (max-width: 600px) {
        .container {
            .main-and-sidebar-wrapper {
                flex-direction: column;
            }

            .main {
                margin-right: 0;
                margin-bottom: 60px;
            }
        }
    }

    .cell {
        width: 25%;
        height: 150px;
        float: left;
        line-height: 125px;
        text-align: center;
        background: #fff;
        font-size: 50px;
        font-weight: 700;
        color: #444;
        box-sizing: border-box;
        border: 1px solid #ddd;
        user-select: none;
        cursor: pointer;
    }

    .cell.initial {
        background: #eee;
        color: #666;
        cursor: initial;
    }

    .cell:nth-child(-n + 4) {
        border-top: 3px black solid;
    }

    .cell:nth-child(n + 13) {
        border-bottom: 3px black solid;
    }

    .cell:nth-child(4n + 1) {
        border-left: 3px black solid;
    }

    .cell:nth-child(4n) {
        border-right: 3px black solid;
    }

    .cell:nth-child(4n + 2) {
        border-right: 3px black solid;
    }

    .cell:nth-child(5) {
        border-bottom: 3px black solid;
    }

    .cell:nth-child(6) {
        border-bottom: 3px black solid;
    }

    .cell:nth-child(7) {
        border-bottom: 3px black solid;
    }

    .cell:nth-child(8) {
        border-bottom: 3px black solid;
    }

    p {
        text-align: center;
        font-size: 30px;
        margin-top: 20px;
        display: inline-block;
        width: 100%;
    }

    button {
        padding: 15px;
        border: 0;
        background: #444;
        color: #fff;
        font-size: 25px;
        border-radius: 5px;
        margin-top: 10px;
    }

    .timer {
        font-size: 20px;
    }

    .restart-button {
        background-color: #fff;
        border: 1px solid #444;
        color: #444;
        margin-right: 20px;
    }
</style>
