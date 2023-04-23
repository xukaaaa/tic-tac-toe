import React, { useEffect } from 'react'
import { useState } from 'react'
import Square from './Square'

export default function Board() {
   const [currentPlayer, setCurrentPlayer] = useState('X')
   const [board, setBoard] = useState(() => {
      const arr = []
      for (let i = 0; i < 9; i++) {
         arr[i] = new Array(9).fill('')
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
      for (let row = 0; row < 9; row++) {
         for (let col = 0; col < 9; col++) {
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
      for (let col = 0; col < 9; col++) {
         // Duyệt từng cột
         for (let row = 0; row < 9; row++) {
            // Duyệt từng dòng trong cột
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

   const checkWinner = () => {
      return checkWinnerHorizontal() || checkWinnerVertical()
   }

   useEffect(() => {
      if (checkWinner()) {
         console.log('Winner: ', checkWinner())
         setWinner(checkWinner())
      }
   }, [board])

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
      for (let i = 0; i < 9; i++) {
         arr[i] = new Array(9).fill('')
      }
      setBoard(arr)
      setCurrentPlayer('X')
      setWinner('')
   }

   return (
      <>
         {board.map((arr, row) => {
            return (
               <div className="flex justify-center" key={row}>
                  {arr.map((square, col) => {
                     return (
                        <Square
                           value={square}
                           key={row * 9 + col}
                           onClick={() => {
                              clickSquare(row, col)
                           }}
                        />
                     )
                  })}
               </div>
            )
         })}
         {winner && (
            <button
               onClick={() => {
                  resetBoard()
               }}
            >
               Play
            </button>
         )}
      </>
   )
}
