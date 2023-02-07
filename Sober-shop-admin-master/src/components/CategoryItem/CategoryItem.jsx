import React from 'react'
import './category-item.scss'

export default function CategoryItem({ item }) {
    
    return (
        <div className='category-item'>
            <img src="https://cdn.dribbble.com/users/59947/screenshots/15026892/media/fe1edccf32e9cd14a86dad9872057559.jpg?compress=1&resize=1600x1200" alt="" />
            <div className="category-item__name">
                {item.name}
            </div>
        </div>
    )
}
