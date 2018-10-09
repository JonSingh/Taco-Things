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

class Board {
    constructor(numberOfRows,numberOfColumns,numberOfBombs){
        this._numberOfBombs = numberOfBombs
        this._numberOfTiles = numberOfRows * numberOfColumns
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns)
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs)
    }

    get playerBoard(){return this._playerBoard}
    get bombBoard(){return this._bombBoard}
    get numberOfTiles(){return this._numberOfTiles}
    get numberOfBombs(){return this._numberOfBombs}

    flipTile(rowIndex, columnIndex){
        if(this.playerBoard[rowIndex][columnIndex] !== ' '){console.log('This tile has already been flipped!')}
        else if(this.bombBoard[rowIndex][columnIndex] == 'B'){this.playerBoard[rowIndex][columnIndex] = 'B'}
        else {this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex)}
    }

    getNumberOfNeighborBombs(rowIndex, columnIndex){
        let neighborOffsets = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1]
        ]
        let numberOfRows = this.bombBoard.length
        let numberOfColumns = this.bombBoard[0].length
        let numberOfBombs = 0
        neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0]
            const neighborColumnIndex = columnIndex + offset[1]
            if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
                if(this.bombBoard[neighborRowIndex][neighborColumnIndex] == 'B'){numberOfBombs++}
            }
        })
        return numberOfBombs
    }

    hasSafeTiles(){return this.numberOfTiles != this.numberOfBombs}
    
    printBoard(){console.log(this.playerBoard.map(row => row.join(' | ')).join('\n'))}
    
    static generatePlayerBoard(numberOfRows, numberOfColumns){
        let board = [];
        for(let i = 0;i < numberOfRows; i++){
            let row = [];
            for(let j = 0; j < numberOfColumns; j++){
                row.push(' ')
            }
            board.push(row)
        }
        return board;
    }

    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
        let board = [];
        for(let i = 0;i < numberOfRows; i++){
            let row = [];
            for(let j = 0; j < numberOfColumns; j++){
                row.push(null)
            }
            board.push(row)
        }
        let numberOfBombsPlaced = 0
        while(numberOfBombsPlaced < numberOfBombs){
            let randomRowIndex = Math.floor(Math.random() * numberOfRows)
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns)
            if(board[randomRowIndex][randomColumnIndex] != 'B'){
                board[randomRowIndex][randomColumnIndex] = 'B'
                numberOfBombsPlaced++;
            }
        }
        return board;
    }
    
}

const g = new Game(3,3,3)
g.playMove(0,0)