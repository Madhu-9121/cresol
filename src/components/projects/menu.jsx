  import React from "react";
  import styles from "./projects.module.css";

  const Menu = ({ project, onDelete, tasks, setShowSlide,addButtonFunction,totalAmountSpent}) => {
  
    const handleProjectbtnClick =()=>{
      addButtonFunction()
    
    }
    const handleDelete = (taskIndex) => {
      // Create array excluding task to be deleted
      const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
      onDelete(updatedTasks);
    };
    const showslide = () => {
      setShowSlide(true);
    };
    return (
      <div className={styles.menu}>
        <h1 className={styles.title} onClick={handleProjectbtnClick}>{project}</h1>
        {tasks && (
          <div className={styles.info}>
            {tasks.map((task, index) => (
              <div key={index} className={styles.mainflx}>
                <p className={styles.name}>{task.addedName}</p>
                <p className={styles.tool}>{task.selectedTool}</p>
                <button
                  className={styles.cross}
                  onClick={() => handleDelete(index)}
                >
                  &times; 
                </button>
              </div>
            ))}
          </div>
        )}
        <div className={styles.btnparent} onClick={showslide}>
          <p className={styles.btnText}>Add New Entry</p>
        </div>
        <div className={styles.total} >
          <p>Total Amount Spent: <span className={styles.price}>RS. {totalAmountSpent}</span> </p>
        </div>
      </div>
    );
  };

  export default Menu;
