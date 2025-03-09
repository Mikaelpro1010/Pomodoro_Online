import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Pomodoro() {
    const [time, setTime] = useState(25 * 60); 
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

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

    return (
        <>
            <header className="bg-primary py-3">
                <div className="container d-flex justify-content-between align-items-center">
                    <Link className="navbar-brand" to="/pomodoro">
                        <i className="fa-sharp fa-solid fa-clock ml-2 mx-2" style={{ color: '#74C0FC' }}></i>
                        Pomodoro
                    </Link>
                    <nav>
                        <Link to="/gerenciamento_users">
                            <button className="btn text-light fw-bold">Gerenciar usuários</button>
                        </Link>
                        <button onClick={logout} className="btn fw-bold text-light">
                            Sair
                        </button>
                    </nav>
                </div>
            </header>

            <div className="container mt-5">
               
                <div className="d-flex justify-content-center mb-3">
                    <button onClick={() => resetTimer(25 * 60)} className="btn btn-primary rounded-pill mx-1">
                        Pomodoro
                    </button>
                    <button onClick={() => resetTimer(5 * 60)} className="btn btn-primary rounded-pill mx-1">
                        Pausa Curta
                    </button>
                    <button onClick={() => resetTimer(15 * 60)} className="btn btn-primary rounded-pill mx-1">
                        Pausa Longa
                    </button>
                </div>

              
                <div id="display-temporizador" className="display-1 font-weight-bold">
                    {formatTime(time)}
                </div>

                
                <button onClick={startTimer} className="btn btn-primary btn-lg rounded-pill mt-3">
                    {isRunning ? 'PAUSAR' : 'INICIAR'}
                </button>
            </div>
        </>
    );
}

export default Pomodoro;