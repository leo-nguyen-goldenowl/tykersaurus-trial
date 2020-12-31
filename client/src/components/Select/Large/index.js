import React from 'react'

import './style.scss'

const SelectLarge = ({ label, name, listItem, value, onChange }) => {
  return (
    <div className='select-large'>
      <p>{label}</p>
      <div>
        <select name={name} value={value} onChange={onChange}>
          {listItem.map((item, idx) => (
            <option key={idx} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>

        <svg
          width='11px'
          height='6px'
          viewBox='0 0 11 6'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>Group 3</title>
          <desc>Created with Sketch.</desc>
          <defs>
            <polygon
              id='path-1'
              points='0 8.82352941e-06 10.9963131 8.82352941e-06 10.9963131 5.99338235 0 5.99338235'
            ></polygon>
          </defs>
          <g
            id='Page-1'
            stroke='none'
            strokeWidth='1'
            fill='none'
            fillRule='evenodd'
          >
            <g
              id='Listing-Copy-2'
              transform='translate(-1289.000000, -169.000000)'
            >
              <g id='Group-2' transform='translate(95.000000, 105.000000)'>
                <g
                  id='Group-Copy-7'
                  transform='translate(883.000000, 29.000000)'
                >
                  <g id='Group-3' transform='translate(311.000000, 35.000000)'>
                    <mask id='mask-2' fill='white'>
                      <use xlinkHref='#path-1'></use>
                    </mask>
                    <g id='Clip-2'></g>
                    <path
                      d='M10.4658524,8.82352941e-06 L0.530368548,8.82352941e-06 C0.0602959677,8.82352941e-06 -0.179308871,0.564714706 0.157787903,0.900008824 L5.12552984,5.84118529 C5.32965081,6.04412647 5.66665887,6.04412647 5.87077984,5.84118529 L10.8385218,0.900008824 C11.1755298,0.564714706 10.9361024,8.82352941e-06 10.4658524,8.82352941e-06'
                      id='Fill-1'
                      fill='#2A2C2B'
                      mask='url(#mask-2)'
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default SelectLarge
