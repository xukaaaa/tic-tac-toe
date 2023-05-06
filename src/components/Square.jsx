import React from 'react'

function Square({ value, onClick }) {
   // console.log('render square');
   return (
      <div
         onClick={onClick}
         className="w-12 h-12 flex items-center justify-center border border-slate-300 rounded-none ring-none focus:outline-none hover:border-green-400"
      >
         {value}
      </div>
   )
}

export default Square
