import React from 'react'
import { useState } from 'react'

export default function Square({ value, onClick }) {
   return (
      <button onClick={onClick} className="w-12 h-12 border border-slate-300 rounded-none ring-none focus:outline-none hover:border-green-400">
         {value}
      </button>
   )
}
