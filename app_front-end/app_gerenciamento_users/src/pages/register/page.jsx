import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Helmet from 'react-helmet';
import api from '../../services/api';

function Register() {
    useEffect(() => {
        document.body.classList.add('bg-light');
        return () => {
            document.body.classList.remove('bg-light');
        };
    }, []);

    const [successMessage, setSuccessMessage] = useState("");

    const inputName = useRef();
    const inputEmail = useRef();
    const inputPassword = useRef();

    const navigate = useNavigate();

    async function createUsers() {
        try {
            await api.post('/register', {
                name: inputName.current.value,
                email: inputEmail.current.value,
                password: inputPassword.current.value
            });

            clearInputs();
            setSuccessMessage("Cadastro realizado com sucesso!");

            // Aguarda 2 segundos antes de redirecionar
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setSuccessMessage("Erro ao realizar o cadastro!");
        }
    }

    function clearInputs() {
        inputName.current.value = '';
        inputEmail.current.value = '';
        inputPassword.current.value = '';
    }

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#1565C0" }}>
                <div className="container">
                    <Helmet>
                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6916450801994185"
                            crossorigin="anonymous"></script>

                    </Helmet>
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

            {/* Formulário de Cadastro */}
            <section className="container vh-100 d-flex align-items-center justify-content-center">
                <div className="card shadow-lg mx-auto" style={{ maxWidth: 900, borderRadius: "12px" }}>
                    <div className="row no-gutters">

                        {/* Lado esquerdo - Mensagem de boas-vindas */}
                        <div className="col-md-6 text-white d-flex flex-column align-items-center justify-content-center p-5"
                            style={{ backgroundColor: "#1E88E5", borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px" }}>
                            <h2 className="text-white">Bem-vindo de Volta!</h2>
                            <p className="text-center">
                                A melhor forma de controlar e monitorar seu tempo.
                                Te ajudamos a aumentar sua produtividade e atenção!
                                Para se manter conectado conosco, faça login com suas informações pessoais.
                            </p>
                            <Link to="/login">
                                <button className="btn text-white rounded-pill px-4"
                                    style={{ backgroundColor: "#0D47A1", transition: "0.3s" }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = "#063970"}
                                    onMouseOut={(e) => e.target.style.backgroundColor = "#0D47A1"}>
                                    Entrar
                                </button>
                            </Link>
                        </div>

                        {/* Lado direito - Formulário */}
                        <div className="col-md-6 bg-white d-flex flex-column align-items-center justify-content-center p-5"
                            style={{ borderTopRightRadius: "12px", borderBottomRightRadius: "12px", border: "2px solid #1E88E5", padding: "20px" }}>
                            <h2 className="text-dark">Criar Conta</h2>
                            <p className="text-muted text-center">ou use seu e-mail para cadastro:</p>

                            {/* Alerta de Cadastro */}
                            {successMessage && (
                                <div className="alert alert-success w-75 text-center mt-2" role="alert"
                                    style={{ borderRadius: "8px", transition: "0.3s" }}>
                                    {successMessage}
                                </div>
                            )}

                            {/* Formulário */}
                            <form className="w-100 px-4 text-center">
                                <input type="text" name="name" className="form-control mb-3" placeholder="Nome" ref={inputName}
                                    style={{ borderRadius: "8px", border: "1px solid #ddd", border: "2px solid", padding: "12px" }}
{/*                                     onFocus={(e) => e.target.style.borderColor = "#1E88E5"}
                                    onBlur={(e) => e.target.style.borderColor = "#ddd"}  */}
                                />

                                <input type="email" name="email" className="form-control mb-3" placeholder="E-mail" ref={inputEmail}
                                    style={{ borderRadius: "8px", border: "1px solid #ddd", border: "2px solid", padding: "12px" }}
{/*                                     onFocus={(e) => e.target.style.borderColor = "#1E88E5"}
                                    onBlur={(e) => e.target.style.borderColor = "#ddd"}  */}
                                />

                                <input type="password" name="password" className="form-control mb-3" placeholder="Senha" ref={inputPassword}
                                    style={{ borderRadius: "8px", border: "1px solid #ddd", border: "2px solid", padding: "12px" }}
{/*                                     onFocus={(e) => e.target.style.borderColor = "#1E88E5"}
                                    onBlur={(e) => e.target.style.borderColor = "#ddd"}  */}
                                />

                                <button type="button" onClick={createUsers} className="btn text-white rounded-pill w-50"
                                    style={{ backgroundColor: "#1E88E5", padding: "12px", fontSize: "16px", transition: "0.3s" }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = "#0D47A1"}
                                    onMouseOut={(e) => e.target.style.backgroundColor = "#1E88E5"}>
                                    Cadastrar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;
