import { Block } from "./blocks/Block";
import { Player } from "./blocks/Player";
import { Blank } from "./blocks/Blank";
import { Obstacle } from "./blocks/Obstacle";

export class Board {
    private readonly _rows: number;
    private readonly _cols: number;
    private _playerPosition: [number, number];
    private readonly _board: Block[][];

    constructor(rows: number, cols: number, playerPosition: [number, number]) {
        console.assert(
            rows > 0,
            'Number of rows must be a positive integer.'
        );

        console.assert(
            cols > 0, 
            'Number of columns must be a positive integer.'
        );

        this._rows = rows;
        this._cols = cols;
        this.playerPosition = playerPosition;

        this._board = [];
        for (let row: number = 0; row < rows; row++) {
            this._board[row] = [];
            for (let col: number = 0; col < cols; col++) {
                if (row === playerPosition[0] && col === playerPosition[1]) {
                    this._board[row][col] = new Player();
                } else {
                    this._board[row][col] = new Blank();
                }
            }
        }
    }

    public vectorize(): number[] {
        let toReturn: number[] = [];
        let idx: number = 0;
        for (let row: number = 0; row < this.rows; row++) {
            for (let col: number = 0; col < this.cols; col++) {
                toReturn[idx++] = this.board[row][col].number;
            }
        }
        return toReturn;
    }

    get rows(): number { return this._rows; }

    get cols(): number { return this._cols; }

    get playerPosition(): [number, number] { return this._playerPosition; }

    get board(): Block[][] { return this._board; }

    set playerPosition(position: [number, number]) {
        if (position === null) {
            this._playerPosition = position;
            return;
        }

        console.assert(
            0 <= position[0] && position[0] < this.rows,
            'Player row position must be a non-negative integer less than the number of rows on the board.'
        );

        console.assert(
            0 <= position[1] && position[1] < this.cols,
            'Player column position must be a non-negative integer less than the number of columns on the board.'
        );

        this._playerPosition = position;
    }
}