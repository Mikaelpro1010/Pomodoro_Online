import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './Pomodoro.css';
import axios from 'axios';
import { FaTrash, FaPlus } from "react-icons/fa6";

function Pomodoro() {
    const [time, setTime] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('bg-light', 'text-secondary', 'text-center');
        return () => {
            document.body.classList.remove('bg-light', 'text-secondary', 'text-center');
        };
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://computacao-em-nuvem.onrender.com/tasks', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTasks(response.data);
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error.response?.data || error.message);
            }
        };

        fetchTasks();
    }, []);

    const formatTime = (seconds) => {
        const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
        const remainingSeconds = String(seconds % 60).padStart(2, '0');
        return `${minutes}:${remainingSeconds}`;
    };

    const startTimer = () => {
        if (isRunning) {
            clearInterval(intervalId);
            setIsRunning(false);
            setIntervalId(null);
        } else {
            const id = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        clearInterval(id);
                        alert('Tempo esgotado!');
                        return 0;
                    }
                });
            }, 1000);
            setIntervalId(id);
            setIsRunning(true);
        }
    };

    const resetTimer = (newTime) => {
        if (intervalId) {
            clearInterval(intervalId);
            setIsRunning(false);
            setIntervalId(null);
        }
        setTime(newTime);
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const addTask = async () => {
        if (taskInput.trim() !== "") {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.post(
                    'https://computacao-em-nuvem.onrender.com/tasks',
                    {
                        description: taskInput,
                        completed: false,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setTasks([
                    ...tasks,
                    {
                        _id: response.data.insertedId,
                        description: taskInput,
                        completed: false,
                    }
                ]);
                setTaskInput("");
            } catch (error) {
                console.error("Erro ao adicionar tarefa:", error.response?.data || error.message);
            }
        };
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        updatedTasks.sort((a, b) => a.completed - b.completed);
        setTasks(updatedTasks);
    };

    const removeTask = async (taskId) => {
        try {
            const token = localStorage.getItem('token');

            await axios.delete(`https://computacao-em-nuvem.onrender.com/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error.response?.data || error.message);
        }
    };

    const startEditing = (task) => {
        setEditingTaskId(task._id);
        setEditingText(task.description);
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditingText("");
    };

    const saveTask = async (taskId) => {
        if (editingText.trim() === "") return;

        try {
            const token = localStorage.getItem('token');

            await axios.put(
                `https://computacao-em-nuvem.onrender.com/tasks/${taskId}`,
                {
                    description: editingText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTasks(tasks.map(task =>
                task._id === taskId ? { ...task, description: editingText } : task
            ));
            setEditingTaskId(null);
            setEditingText("");
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <head className="bg-primary py-3">
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6916450801994185"
                    crossorigin="anonymous"></script>
                <div className="container d-flex justify-content-between align-items-center">
                    <h1 className="h3 mb-0" style={{ color: "#ffffff" }}>Controle seu Tempo</h1>
                    <nav>
                        <button onClick={logout} className="btn btn-link text-light" style={{ textDecoration: "none" }}>
                            Sair
                        </button>
                    </nav>
                </div>
            </head>

            <div className="container mt-5 d-flex justify-content-between">
                {/* Pomodoro Section */}
                <div className="pomodoro-section" style={{ flex: 1, textAlign: 'center' }}>
                    <div className="d-flex justify-content-center mb-3">
                        <button onClick={() => resetTimer(25 * 60)} className="btn btn-primary mx-1 zoom-hover">Pomodoro</button>
                        <button onClick={() => resetTimer(5 * 60)} className="btn btn-primary mx-1 zoom-hover">Pausa Curta</button>
                        <button onClick={() => resetTimer(15 * 60)} className="btn btn-primary mx-1 zoom-hover">Pausa Longa</button>
                    </div>

                    <div id="display-temporizador" className="display-1 font-weight-bold">
                        {formatTime(time)}
                    </div>

                    <button onClick={startTimer} style={{ borderRadius: '50px', width: '100px' }} className="btn btn-primary mt-3 zoom-hover">
                        {isRunning ? 'PAUSAR' : 'INICIAR'}
                    </button>
                </div>

                {/* To-Do List Section */}
                <div className="todo-section" style={{ flex: 1, maxWidth: '400px', paddingLeft: '20px' }}>
                    <h3>To-Do List</h3>
                    <div className='input-group mb-3'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Adicionar tarefa...'
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                            style={{
                                height: '40px',
                                fontSize: '16px',
                                padding: '10px',
                                borderRadius: '8px',
                                width: 'calc(100% - 40px)'
                            }}
                        />
                        <button type="submit" onClick={addTask} className='btn btn-primary zoom-hover'
                            style={{
                                marginLeft: '2px',
                                height: '40px',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #007bff',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <FaPlus />
                        </button>
                    </div>
                    <ul className='list-group' style={{ listStyleType: 'none', padding: 0, height: '400px', overflowY: 'auto' }}>
                        {tasks.map((task, index) => (
                            <li key={index}
                                className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-light text-muted' : ''}`}
                                style={{
                                    borderRadius: '10px',
                                    backgroundColor: task.completed ? '#e9ecef' : '#f1f1f1',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    marginBottom: '5px',
                                    padding: '10px 15px',
                                    textDecoration: task.completed ? 'line-through' : 'none'
                                }}>
                                <div>
                                    <input
                                        type='checkbox'
                                        className='form-check-input me-2'
                                        checked={task.completed}
                                        onChange={() => toggleTaskCompletion(index)}
                                    />

                                    {editingTaskId === task._id ? (
                                        <input
                                            type="text"
                                            value={editingText}
                                            onChange={(e) => setEditingText(e.target.value)}
                                            className="form-control d-inline-block"
                                            style={{ width: '150px' }}
                                        />
                                    ) : (
                                        task.description
                                    )}
                                </div>
                                <div>
                                    {editingTaskId === task._id ? (
                                        <>
                                            <button
                                                className='btn btn-success btn-sm me-1 zoom-hover'
                                                onClick={() => saveTask(task._id)}
                                            >
                                                Salvar
                                            </button>
                                            <button
                                                className='btn btn-secondary btn-sm zoom-hover'
                                                onClick={cancelEditing}
                                            >
                                                Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className='btn btn-warning btn-sm me-1 zoom-hover'
                                                onClick={() => startEditing(task)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                >
                                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                                                </svg>
                                            </button>
                                            <button
                                                className='btn btn-danger btn-sm zoom-hover'
                                                onClick={() => removeTask(task._id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Pomodoro;