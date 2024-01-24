import React from 'react';
import styles from '../styles/loader.module.css';

function Loader() {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
      <div className={styles.loader}></div>
    </div>
  )
}

export default Loader;