import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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

    // Função de login
    async function login() {
        try {
            // Requisição de login
            const response = await api.post('/login', {
                email: inputEmail.current.value,
                password: inputPassword.current.value
            });

            const token = response.data.token;

            if (token) {
                // Armazenar o token no localStorage
                localStorage.setItem('token', token);

                api.defaults.headers['Authorization'] = `Bearer ${token}`;

                // Navega para a página de Pomodoro após login bem-sucedido
                navigate('/pomodoro');
            } else {
                alert('Credenciais inválidas!');
            }
        } catch (error) {
            alert('Erro ao realizar login!');
        }
    }

    return (
        <>
            {/* Navbar Atualizada */}
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#1565C0" }}>
                <div className="container">
                    <Link className="navbar-brand text-white" to="/">
                        <i className="fa-sharp fa-solid fa-clock ml-2 mx-2" style={{ color: '#BBDEFB' }}></i>
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
                                <Link className="nav-link fw-bold text-white" to="/login">
                                    Entrar
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-bold text-white" to="/register">
                                    Cadastrar
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-bold text-white" to="/about">
                                    Sobre
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Modal de Login */}
            <section className="container vh-100 d-flex align-items-center justify-content-center">
                <div className="card shadow-lg p-4 rounded" style={{ maxWidth: "400px", width: "100%" }}>
                    <h2 className="text-dark text-center">Bem-vindo de Volta!</h2>
                    <p className="text-muted text-center">Entre na sua conta para continuar.</p>

                    <form className="w-100">
                        <input type="email" name="email" className="form-control mb-3" placeholder="E-mail" ref={inputEmail}
                            style={{ borderRadius: "8px", border: "1px solid #ddd", padding: "12px" }}
                            onFocus={(e) => e.target.style.borderColor = "#1E88E5"}
                            onBlur={(e) => e.target.style.borderColor = "#ddd"}
                        />

                        <input type="password" name="password" className="form-control mb-3" placeholder="Senha" ref={inputPassword}
                            style={{ borderRadius: "8px", border: "1px solid #ddd", padding: "12px" }}
                            onFocus={(e) => e.target.style.borderColor = "#1E88E5"}
                            onBlur={(e) => e.target.style.borderColor = "#ddd"}
                        />

                        <button type="button" onClick={login} className="btn text-white rounded-pill w-100"
                            style={{ backgroundColor: "#1E88E5", padding: "12px", fontSize: "16px", transition: "0.3s" }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#0D47A1"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#1E88E5"}>
                            Entrar
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Login;
