import React from 'react'

function HighlightedText({text}) {
  return (
    <span className='font-bold  text-[#07DADC]'>
        {" "}
        {text}
    </span>
  )
}

export default HighlightedText