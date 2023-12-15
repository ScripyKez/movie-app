import React from 'react'

export default function AppVotesRaiting({ rating }) {
  let borderColor = 'grey'

  switch (true) {
    case rating <= 3:
      borderColor = '#E90000'
      break
    case rating > 3.1 && rating <= 5:
      borderColor = '#E97E00'
      break
    case rating > 5 && rating < 7:
      borderColor = '#E9D100'
      break
    default:
      borderColor = '#66E900'
  }
  return (
    <div
      className="rating"
      style={{
        width: '30px',
        height: '30px',
        position: 'absolute',
        top: '10px',
        right: '10px',
        border: `2px solid ${borderColor}`,
        borderRadius: '50%',
        display: 'flex',
      }}
    >
      <p
        style={{
          margin: 'auto',
        }}
      >
        {rating.toFixed(1)}
      </p>
    </div>
  )
}
