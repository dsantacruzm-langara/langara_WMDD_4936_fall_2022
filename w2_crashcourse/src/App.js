import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTaskForm from "./components/AddTaskForm";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  //Prop Func - Fetch all tasks from Db
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5790/tasks");
    const data = await res.json();

    return data;
  };

  //Prop Func - Fetch specific task from Db
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5790/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  //Prop Func - Add task to Db
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5790/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  // Delete task from Db
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5790/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Update reminder status - Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5790/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  return (
    <div className="container">
      {/* Header Component */}
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />

      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              {/* Display add task form */}
              {showAddTask && <AddTaskForm onAdd={addTask} />}

              {/* Display Task List or No task message */}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No tasks to show"
              )}
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
