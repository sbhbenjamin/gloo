import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, text, color }) => {
  function starClass(first, second) {
    if (value >= first) {
      return 'fas fa-star'
    } else if (value >= second) {
      return 'fas fa-star-half-alt'
    } else {
      return 'far fa-star'
    }
  }

  return (
    <div className='rating d-flex text-gray-700'>
      <div className='me-1'>
        <span>
          <i
            data-testid='star-1'
            style={{ color }}
            className={starClass(1, 0.5)}
          ></i>
        </span>
        <span>
          <i
            data-testid='star-2'
            style={{ color }}
            className={starClass(2, 1.5)}
          ></i>
        </span>
        <span>
          <i
            data-testid='star-3'
            style={{ color }}
            className={starClass(3, 2.5)}
          ></i>
        </span>
        <span>
          <i
            data-testid='star-4'
            style={{ color }}
            className={starClass(4, 3.5)}
          ></i>
        </span>
        <span>
          <i
            data-testid='star-5'
            style={{ color }}
            className={starClass(5, 4.5)}
          ></i>
        </span>
      </div>
      <span>{text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string,
}

export default Rating
