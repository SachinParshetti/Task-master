import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import AddTaskModal from "./addTaskModal"
import Swal from 'sweetalert2';


const UserDashboard = () => {
  const [tasks, setTask] = useState([])
  const [Loding, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = async (task) => {
  
    let response = await axios.post("http://localhost:5000/task", task, { withCredentials: true });
    if (response.status === 201 || response.status === 200) {
      setTask([...tasks, response.data]);
      setOpenModal(false);
      toast.success("Task Added successfully");
      navigate("/dashboard")
    }
    else {
      toast.error("Failed to add task");
    }

  };

  const openAddModal = () => {
    setModalMode('add');
    setEditingTask(null);
    setOpenModal(true);
  };

  const openEditModal = (task) => {
    setModalMode('edit');
    setEditingTask(task);
    setOpenModal(true);
  };

  const handleEditTask = async (updatedTask) => {
    let response = await axios.put(`http://localhost:5000/task/${updatedTask._id}`, updatedTask, { withCredentials: true });
    if (response.status === 200) {
      setTask(tasks.map(t => (t._id === response.data._id ? response.data : t)));
      setOpenModal(false);
      toast.success('Task updated successfully');
    } else {
      toast.error('Failed to update task');
    }
  };

  function getTasks() {
    setLoading(true)
    axios.get("http://localhost:5000/task", { withCredentials: true })
      .then((response) => {
        setTask(response.data)
      })
      .catch((error) => {
        toast.error("Failed to get tasks", error);
        console.error("Get Task Error", error);
      })
      .finally(() => {
        setLoading(false)
      })


  }


  async function LogoutClick() {
    try {
      let response = await axios.post("http://localhost:5000/user/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        toast.success("Logged out successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Logout failed!");
    }
  }



const handleDelete = async (taskId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This task will be permanently deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e11d48', 
    cancelButtonColor: '#6b7280',  
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
   
    
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:5000/task/${taskId}`, {
        withCredentials: true,
      });

      Swal.fire('Deleted!', 'The task has been removed.', 'success');
      navigate("/dashboard")
    } catch (error) {
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  }
};


  useEffect(() => {

    axios.get("http://localhost:5000/user/me", { withCredentials: true })
      .then(res => {
        setUsername(res.data.username);
      })
      .catch(err => {
        toast.error("Failed to fetch user info", err);
        setUsername("");
      });
  }, []);

  useEffect(() => {
    getTasks();
  }, [tasks])
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200 p-4">

      <header className=" bg-white/10 backdrop-blur-md shadow-xl py-4 sticky top-0 z-10 rounded-xl mt-2 px-0 mx-0">
        <div>
          <h1 className="text-3xl font-bold px-4"> User Dashboard </h1>
        </div>

        <div className="flex justify-between  items-center m-4 ">
          <div className="flex item-center justify-content-center">
            <i className="bi bi-person-circle text-xl"></i>
            <h2 className="text-xl font-semibold text-gray-800 px-2">

              {username || "User"}
            </h2>
          </div>
          <div className="">
            <button
              onClick={LogoutClick}
              className="text-white font-semibold py-1 px-3 rounded-md bg-gradient-to-r from-blue-500  to-pink-500 hover:from-purple-600 hover:to-pink-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="px-4 mt-15">
          <button className=" right-4 top-1/2 -translate-y-1/2 text-white font-semibold py-1 px-2 rounded-md 
           bg-gradient-to-r from-blue-700 to-cyan-500 hover:from-blue-600 hover:to-cyan-700 transition " onClick={openAddModal} >
            <i className="bi bi-list-check mx-1"></i>
            Add Tasks
          </button>
        </div>
      </header>

      {/* Tasks cards */}
      <div className="mt-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3  max-w-7xl w-full mx-auto">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className="bg-[rgba(250,250,250,0.9)] p-4 rounded-lg shadow hover:shadow-2xl transition"
              >
                <div className="flex justify-between   items-center p-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex flex-wrap overflow-auto w-[70%]" >
                    {task.title}
                  </h3>
                  <div className="text-sm text-gray-500">
                    Created: {new Date(task.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    <br />
                    Time: {new Date(task.updatedAt).toLocaleTimeString("en-IN")}
                  </div>

                </div>
                <hr className="mx-2 text-gray-300" />
                <div className="text-gray-600 mt-4 mb-4 overflow-auto">{task.description}</div>

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => openEditModal(task)}
                    className="px-4 rounded-sm text-white bg-gradient-to-r from-blue-700 to-cyan-500 hover:from-blue-600 hover:to-cyan-700 transition "
                  >
                    <i className="bi bi-pen-fill text-white  "></i>

                  </button>
                  <button
                    className="bg-gradient-to-r from-red-400 to-red-700 text-white px-4 rounded-sm hover:from-red-600 hover:to-red-800 transition"
                    onClick={()=> handleDelete(task._id)}
                  >
                    <i className="bi bi-trash"></i>
                   
                  </button>
                </div>
              </div>

            ))
          ) : (
            <div className="col-span-full text-center text-gray-600" key={1}>
              No tasks available. Add some!
            </div>
          )}
        </div>
      </div>

      {/* add Task modal */}
      <AddTaskModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleAddTask={handleAddTask}
        handleEditTask={handleEditTask}
        mode={modalMode}
        initialTask={editingTask}
      
        
      />
    </div>



  );
};

export default UserDashboard;
