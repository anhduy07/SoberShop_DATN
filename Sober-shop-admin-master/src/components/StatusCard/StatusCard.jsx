import React from 'react'
import './statusCard.scss'

export default function StatusCard({ title, count, icon, color }) {
    return (
        <div className={`status-card bg-${color}`}>
            <div className={`status-card__icon color-${color}`}>
                {icon}
            </div>
            <div className="status-card__info">
                <h4>{count}</h4>
                <p>{title}</p>
            </div>
        </div>
    )
}
