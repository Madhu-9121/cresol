import React, { useState, useEffect } from "react";
import styles from "./projects.module.css";
import Menu from "./menu";
import Rightslide from "./Rightslide";
import Chart from "./chart.jsx"; // Import Chart component
import { Bar } from "react-chartjs-2"; // Import Bar from Chart.js
// projects array ==> Category
// tasks ==> itmes of spendings
const Projects = () => {
  const [projectsArray, setProjectsArray] = useState(["Groceries", "Health care", "Clothing", "Utilities"]);
  const [btnClick, setBtnClick] = useState(false);
  const [showModal, setShowModel] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [project, setProject] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showSlide, setShowSlide] = useState(false);
  const [projectDetails, setProjectDetails] = useState({});
  const [addedName, setAddedName] = useState("");
  const [selectedTool, setSelectedTool] = useState(""); // amount spent
  const [showChart,setShowChart]=useState(false)

  const calculateTotalAmountSpent = (projectTasks) => {
    return projectTasks.reduce((total, task) => total + parseFloat(task.selectedTool), 0);
  };
  const updateProjectDetails = () => {
    const updatedProjectDetails = {};
    projectsArray.forEach((p) => {
      const projectTasks = JSON.parse(localStorage.getItem(p)) || [];
      updatedProjectDetails[p] = calculateTotalAmountSpent(projectTasks);
    });
    setProjectDetails(updatedProjectDetails);
    console.log(projectDetails)
  };
  useEffect(()=>{
    updateProjectDetails()
  },[tasks])
  //  saving and getting

  
  const getTotalAmountSpent = () => {
        let totalAmount = 0;
        tasks.forEach((task) => {
          totalAmount += parseFloat(task.selectedTool); // selectedTool contains the amount spent
        });
        return totalAmount;
      };
  const handleSaveProject = () => {
    if (newProjectName.trim() !== "") {
      setProjectsArray([...projectsArray, newProjectName]);
      setNewProjectName("");
    }
  };

  const projectbtn = (p) => {
    setProject(p);
    setBtnClick(true);
    setShowSlide(false);
    setShowChart(false)

    const storedData = localStorage.getItem(p);
    if (storedData !== null) {
      try {
        const parsedData = JSON.parse(storedData);
        setTasks(parsedData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setTasks([]);
      }
    } else {
      setTasks([]);
      setAddedName("");
      setSelectedTool("");
    }
  };

  const handleDeleteInfo = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem(project, JSON.stringify(updatedTasks));
  };

  const addProject = () => {
    setShowModel(true);
  };

  const handleCloseModal = () => {
    setShowModel(false);
    setNewProjectName("");
  };

  const addTask = () => {
    const newTask = {
      addedName,
      selectedTool,
    };
    console.log("Before adding new task:", tasks);
    setTasks(prevTasks => [...prevTasks, newTask]);
    console.log("After adding new task:", tasks);
    setAddedName("");
    setSelectedTool("");
  };
  

  const savingProject = () => {
    setShowModel(false);
  };

  useEffect(() => {
    localStorage.setItem(project, JSON.stringify(tasks));
  }, [tasks, project]);



  return (
    <div>
      <div className={styles.parent}>
      <div >
            <h1 onClick={()=>{setShowChart(true)}} className={styles.cell}>
              Summery
            </h1>
          </div>
        {projectsArray.map((p, index) => (
          <div key={index}>
            <h1 onClick={() => projectbtn(p)} className={styles.cell}>
              {p}
            </h1>
          </div>
        ))}
      </div>

      <button className={styles.btn} onClick={addProject}>
        Create New Category
      </button>

      {showModal && (
        <div className={styles.model}>
          <div className={styles.modalContent}>
            <div className={styles.flbox}>
              <h2 className={styles.head}>Enter Category Name:</h2>
              <span className={styles.close} onClick={handleCloseModal}>
                &times;
              </span>
            </div>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter Category Name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <br />
            <button className={styles.btnAdd} onClick={handleSaveProject}>
              Create
            </button>
          </div>
        </div>
      )}


      {btnClick && !showChart &&(
        <Menu
          project={project}
          onDelete={handleDeleteInfo}
          tasks={tasks}
          setShowSlide={setShowSlide}
          addButtonFunction={addTask}
          totalAmountSpent={getTotalAmountSpent()}
          

        />
      )}

      {showSlide && (
        <Rightslide
          addedName={addedName}
          selectedTool={selectedTool}
          onNameChange={setAddedName}
          onToolChange={setSelectedTool}
          savingProject={savingProject}
          onAddTask={addTask}
          setShowSlide={setShowSlide}
        />
      )}

     
     {showChart && <Chart data={projectDetails} width={400} height={400}/>}
    </div>
  );
};

export default Projects;