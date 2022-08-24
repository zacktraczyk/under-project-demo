import React from 'react'
import SpecialHints from '../components/special hints/SpecialHints';

import '../styles/ProfilePage.scss';

function ProfilePage() {
  return (
    <div className="profile-container">
      <h1>Overview</h1>
      <SpecialHints />
    </div>
  )
}

export default ProfilePage;