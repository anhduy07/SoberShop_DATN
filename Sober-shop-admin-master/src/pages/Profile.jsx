import ProfileMain from 'components/ProfileMain/ProfileMain'
import React from 'react'

export default function Profile() {
    return (
        <div className="profile">
            <h2 style={{marginBottom: '30px', textTransform: 'uppercase'}}>profile</h2>
            <ProfileMain/>
        </div>
    )
}
