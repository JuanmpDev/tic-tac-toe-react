import { WinnerCombos } from '../constants.js'

export const checkWinnerFrom = (boardtoCheck) => {
    for (const combo of WinnerCombos) {
      const [a,b,c] = combo
      if (boardtoCheck[a] && boardtoCheck[a] === boardtoCheck[b] && boardtoCheck[a] === boardtoCheck[c]) {
        return boardtoCheck[a]
      }
    }
    return null
  }

export const checkendGame = (newBoard) => { 

    return newBoard.every((square) => square !== null)

  }
