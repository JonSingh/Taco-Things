import { Board } from './board';

// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

 

class Game {
    constructor(numberOfRows,numberOfColumns,numberOfBombs){
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs)
    }

    get board(){return this._board}
    playMove(rowIndex,columnIndex){
        this.board.flipTile(rowIndex, columnIndex)
        if(this.board.playerBoard[rowIndex][columnIndex]==='B'){
            console.log("Game Over! You lose!")
            this.board.printBoard()            
        }
        else if(!this.board.hasSafeTiles()){
            console.log("You win! Congratulations")
            this.board.printBoard()
        }
        else {
            console.log('Current Board: ')
            this.board.printBoard()
        }

    }

}