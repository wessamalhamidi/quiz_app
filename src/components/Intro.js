import React from 'react'

function Intro({handleClick}) {
  return (
    <section className='intro'>
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button onClick={handleClick}>Start quiz</button>
    </section>
  )
}

export default Intro