import React from 'react'
import { useState } from 'react'

export default function Square({ value, onClick }) {
   return (
      <button onClick={onClick} className="w-12 h-12 border border-black rounded-none ring-none">
         {value}
      </button>
   )
}
