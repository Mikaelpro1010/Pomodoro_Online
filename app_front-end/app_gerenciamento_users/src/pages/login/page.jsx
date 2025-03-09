import React from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import welcome from '../../assets/welcome.svg';
import api from '../../services/api';

function Login() {
    useEffect(() => {
     
        document.body.classList.add('bg-light');
        
        return () => {
            document.body.classList.remove('bg-light');
        };
    }, []);

    const navigate = useNavigate();

    const inputEmail = useRef();
    const inputPassword = useRef();

    async function login(){
        try{
            const response = await api.post('/login', {
                email: inputEmail.current.value,
                password: inputPassword.current.value
            })
 
            const token = response.data.token;

            if(token) {
                localStorage.setItem('token', token);
                navigate('/pomodoro');
            } else {
                alert('Credenciais inválidas!');
            }
        } catch(error) {
            alert('Erro ao realizar login!');
        }
    }

    return (
        <>
            <div>
                
            </div>
             <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <i className="fa-sharp fa-solid fa-clock ml-2 mx-2" style={{ color: '#74C0FC' }}></i>
                        Pomodoro
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link fw-bold text-warning" to="/login">
                                    Entrar
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-bold text-warning" to="/register">
                                    Cadastrar
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-bold text-warning" to="/about">
                                    Sobre
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
            <section className="container vh-100 d-flex align-items-center justify-content-center">
                <div className="card shadow-lg mx-auto" style={{"maxWidth": 900}}>
                    <div className="row no-gutters">

                        <div className="col-md-6 bg-primary d-flex flex-column align-items-center justify-content-center p-4">
                            <img src={welcome} alt="Imagem de Login" style={{ maxWidth: '80%', height: 'auto' }} />
                        </div>

                        <div className="col-md-6 bg-white d-flex flex-column align-items-center justify-content-center p-4">
                            <h2 className="text-primary">Bem-vindo de Volta!</h2>
                            <p className="text-muted text-center">Entre na sua conta para continuar.</p>
                            
                            <form className="w-100 px-4 text-center">
                                <input type="email" name="email" className="form-control mb-3" placeholder="E-mail" ref={inputEmail} />
                                <input type="password" name="password" className="form-control mb-3" placeholder="Senha" ref={inputPassword} />
                                
                                <button type="button" onClick={ login } className="btn btn-primary rounded-pill w-50">Entrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;