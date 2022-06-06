import React from 'react'

const MenuItem = ({item, activeMenuItem, handleActive}) => (
    <li key={item}>
        <a href="#" className={activeMenuItem === item ? 'menu-filter-item active' : 'menu-filter-item'}
            onClick={() => handleActive(item)}
            data-filter={item}>{item}
        </a>
    </li>
)

export default MenuItem