import React from 'react'
import styles from './Header.module.css'
import pic from '../../assets/profile.jpg'
const Header = () => {
  return (
    <div className={styles.Header}>
      
        <div className={styles.account}>
          <p className={styles.text}>Account</p>
          <img className={styles.profile} src={pic}/>
        </div>
    </div>
  )
}

export default Header