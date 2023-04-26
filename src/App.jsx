import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './components/Board'

function App() {

   return <Board boardRow={100} boardCol={100} />
}

export default App
