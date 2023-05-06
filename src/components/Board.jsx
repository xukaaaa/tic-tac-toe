import React, { useEffect, useState } from 'react'
import { AutoSizer, Grid } from 'react-virtualized'
import Square from './Square'

export default function Board({ boardRow, boardCol }) {
   const [currentPlayer, setCurrentPlayer] = useState('X')
   const [board, setBoard] = useState(() => {
      const arr = []
      for (let i = 0; i < boardRow; i++) {
         arr[i] = new Array(boardCol).fill('')
      }
      return arr
   })
   const [winner, setWinner] = useState('')

   const changePlayer = () => {
      if (currentPlayer === 'X') {
         setCurrentPlayer('O')
      } else {
         setCurrentPlayer('X')
      }
   }

   const checkWinnerHorizontal = () => {
      for (let row = 0; row < boardRow; row++) {
         for (let col = 0; col < boardCol - 4; col++) {
            if (
               board[row][col] != '' && // Nếu ô đó không rỗng
               board[row][col] === board[row][col + 1] &&
               board[row][col] === board[row][col + 2] &&
               board[row][col] === board[row][col + 3] &&
               board[row][col] === board[row][col + 4]
            ) {
               return board[row][col]
            }
         }
      }
   }

   const checkWinnerVertical = () => {
      for (let col = 0; col < boardCol; col++) {
         for (let row = 0; row < boardRow - 4; row++) {
            if (
               board[row][col] != '' && // Nếu ô đó không rỗng
               board[row][col] === board[row + 1][col] &&
               board[row][col] === board[row + 2][col] &&
               board[row][col] === board[row + 3][col] &&
               board[row][col] === board[row + 4][col]
            ) {
               return board[row][col] // Nếu có 5 ô giống nhau thì thắng
            }
         }
      }
   }

   const checkWinnerDiagonal = () => {
      for (let row = 4; row < boardRow; row++) {
         for (let col = 4; col < boardCol; col++) {
            if (
               board[row][col] &&
               board[row][col] === board[row - 1][col - 1] &&
               board[row][col] === board[row - 2][col - 2] &&
               board[row][col] === board[row - 3][col - 3] &&
               board[row][col] === board[row - 4][col - 4]
            ) {
               return board[row][col]
            }
         }
      }

      for (let row = 0; row < boardRow - 4; row++) {
         for (let col = 0; col < boardCol - 4; col++) {
            if (
               board[row][col] &&
               board[row][col] === board[row + 1][col + 1] &&
               board[row][col] === board[row + 2][col + 2] &&
               board[row][col] === board[row + 3][col + 3] &&
               board[row][col] === board[row + 4][col + 4]
            ) {
               return board[row][col]
            }
         }
      }
   }

   const checkWinner = () => {
      return (
         checkWinnerHorizontal() ||
         checkWinnerVertical() ||
         checkWinnerDiagonal()
      )
   }

   const clickSquare = (row, col) => {
      const newBoard = [...board]
      if (!winner && newBoard[row][col] === '') {
         newBoard[row][col] = currentPlayer
         setBoard(newBoard)
         changePlayer()
      }
   }

   const resetBoard = () => {
      const arr = []
      for (let i = 0; i < boardRow; i++) {
         arr[i] = new Array(boardCol).fill('')
      }
      setBoard(arr)
      setCurrentPlayer('X')
      setWinner('')
   }

   const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
      return (
         <div key={key} style={style}>
            <Square
               value={board[rowIndex][columnIndex]}
               onClick={() => clickSquare(rowIndex, columnIndex)}
            />
         </div>
      )
   }

   useEffect(() => {
      if (checkWinner()) {
         console.log('Winner: ', checkWinner())
         setWinner(checkWinner())
      } else if (
         !checkWinner() &&
         board.every((row) => row.every((col) => col !== ''))
      ) {
         setWinner('Draw')
      }
   }, [board])

   return (
      <div className="flex flex-col w-screen h-screen">
         <p>Cờ ca rô</p>
         {winner === 'Draw' && <p>Draw</p>}
         {winner && winner !== 'Draw' && <p>Winner: {winner}</p>}
         {winner && (
            <button
               onClick={() => {
                  resetBoard()
               }}
            >
               Play again
            </button>
         )}
         {/* <div className="border border-black">
            {board.map((arr, row) => {
               return (
                  <div className="flex justify-center" key={row}>
                     {arr.map((square, col) => {
                        return (
                           <Square
                              value={square}
                              key={row * boardRow + col}
                              onClick={() =>
                                 clickSquare(row, col)
                              }
                           />
                        )
                     })}
                  </div>
               )
            })}
         </div> */}

         <div className="flex-1">
            <AutoSizer>
               {({ width, height }) => (
                  <Grid
                     cellRenderer={cellRenderer}
                     height={height}
                     width={width}
                     // overscanColumnCount={overscanColumnCount}
                     // overscanRowCount={overscanRowCount}
                     rowHeight={48}
                     columnWidth={48}
                     columnCount={boardCol}
                     rowCount={boardRow}
                  />
               )}
            </AutoSizer>
         </div>
      </div>
   )
}
