import React from 'react'
import './dropdown.scss'

export default function Dropdown(props) {
    return (
        <div className="dropdown">
            <div className="dropdown-toggle">
                {
                    props.icon ? <span className="dropdown-toggle__icon">{props.icon}</span> : ''
                }
                {
                    props.badge ? <span className="dropdown-toggle__badge">{props.badge}</span> : ''
                }
                {
                    props.customToggle ? props.customToggle() : ''
                }
            </div>
            <div className="dropdown-content">
                {
                    props.contentData && props.renderItem ? 
                        props.contentData.map((item, index) => {
                            return (
                                props.renderItem(item, index)
                            )
                        }) : ''
                }
                {
                    props.renderFooter ? (
                        <div className="dropdown-content__footer">
                            {props.renderFooter()}
                        </div>
                    ) : ''
                }
            </div>
           
        </div>
    )
}
