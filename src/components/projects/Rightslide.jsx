import React from 'react';
import styles from './Rightslide.module.css';

const Rightslide = ({ addedName, onNameChange, onToolChange, savingProject, onAddTask, setShowSlide }) => {
  const crossbtn = () => {
    setShowSlide(false);
  };

  const handleChange = (e) => {
    onNameChange(e.target.value);
  };

  const handleToolChange = (e) => {
    onToolChange(e.target.value);
  };

  const handleClick = () => {
    onAddTask();
    savingProject();
  };

  return (
    <div className={styles.parent} style={{ position: 'fixed' }}>
      <div style={{ width: '40px', height: '40px', border: '0.5px solid grey', textAlign: 'center', borderRadius: '50%', marginLeft: '-18px', position: 'fixed', top: '90px', backgroundColor: 'white' }}>
        <span onClick={crossbtn} style={{ fontSize: '32px', cursor: 'pointer' }}>&times;</span>
      </div>
      <p className={styles.header}>Add New Entry</p>
      <input
        style={{ width: '180px', height: '47px', marginLeft: '20px', marginTop: '20px', borderRadius: '6px', border: '1px solid #605C5C', paddingLeft: '10px' }}
        value={addedName}
        placeholder="Enter Name"
        onChange={handleChange}
      />
      <div>
        <p className={styles.header} style={{ marginTop: '-50px' }}>Enter Amount Spent</p>
        <input
          id="toolSelect"
          style={{ width: '180px', height: '47px', marginLeft: '20px', borderRadius: '6px', border: '1px solid #605C5C', paddingLeft: '10px' }}
          placeholder='Enter amount'
          onChange={handleToolChange}
        />
      </div>
      <button className={styles.btnAdd} onClick={handleClick}>Add</button>
    </div>
  );
};

export default Rightslide;
