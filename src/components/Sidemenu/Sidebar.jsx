import React from 'react'
import styles from './Sidebar.module.css'
import Projects from '../projects/projects'


const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
        <h2 className={styles.text} >Expenses Tracker</h2>
        <Projects/>
    </div>
  )
}

export default Sidebar