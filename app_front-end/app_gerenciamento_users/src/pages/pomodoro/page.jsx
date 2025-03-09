import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaCheck, FaTrash, FaPlus } from "react-icons/fa6";

function Pomodoro() {
    const [time, setTime] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");

    useEffect(() => {
        document.body.classList.add('bg-dark', 'text-light', 'text-center');
        return () => {
            document.body.classList.remove('bg-dark', 'text-light', 'text-center');
        };
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
        window.location.href = '/login';
    };

    const addTask = () => {
        if (taskInput.trim() !== "") {
            setTasks([...tasks, { text: taskInput, completed: false }]);
            setTaskInput("");
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        updatedTasks.sort((a, b) => a.completed - b.completed);
        setTasks(updatedTasks);
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <>
            <header className="bg-primary py-3">
                <div className="container d-flex justify-content-between align-items-center">
                    <h1 className="h3 mb-0">Controle seu Tempo</h1>
                    <nav>
                        <Link to="/gerenciamento_users">
                            <button className="btn btn-link text-light">Gerenciar usuários</button>
                        </Link>
                        <button onClick={logout} className="btn btn-link text-light">
                            Sair
                        </button>
                    </nav>
                </div>
            </header>

            <div className="container mt-5">
                <div className="d-flex justify-content-center mb-3">
                    <button onClick={() => resetTimer(25 * 60)} className="btn btn-primary mx-1">Pomodoro</button>
                    <button onClick={() => resetTimer(5 * 60)} className="btn btn-primary mx-1">Pausa Curta</button>
                    <button onClick={() => resetTimer(15 * 60)} className="btn btn-primary mx-1">Pausa Longa</button>
                </div>

                <div id="display-temporizador" className="display-1 font-weight-bold">
                    {formatTime(time)}
                </div>

                <button onClick={startTimer} className="btn btn-primary btn-lg mt-3">
                    {isRunning ? 'PAUSAR' : 'INICIAR'}
                </button>

                <div className='mt-5'>
                    <h3>To-Do List</h3>
                    <div className='input-group mb-3'>
                        <input 
                            type='text' 
                            className='form-control' 
                            placeholder='Adicionar tarefa...'
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                        />
                        <button onClick={addTask} className='btn btn-primary'>
                            <FaPlus />
                        </button>
                    </div>
                    <ul className='list-group'>
                        {tasks.map((task, index) => (
                            <li key={index} className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-light text-muted' : ''}`} style={task.completed ? { textDecoration: 'line-through' } : {}}>
                                <div>
                                    <input 
                                        type='checkbox' 
                                        className='form-check-input me-2' 
                                        checked={task.completed}
                                        onChange={() => toggleTaskCompletion(index)}
                                        disabled={task.completed}
                                    />
                                    {task.text}
                                </div>
                                <button className='btn btn-danger btn-sm' onClick={() => removeTask(index)}>
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Pomodoro;