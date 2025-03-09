import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';

function Register() {
    useEffect(() => {
        document.body.classList.add('bg-light');
        
        return () => {
            document.body.classList.remove('bg-light');
        };
    }, []); 

    const [successMessage, setSuccessMessage] = useState("");

    const inputName = useRef()
    const inputEmail = useRef()
    const inputPassword = useRef()

    async function createUsers(){

        try{
            await api.post('/register', {
                name: inputName.current.value,
                email: inputEmail.current.value,
                password: inputPassword.current.value
            })

            clearInputs();
            setSuccessMessage("Cadastro realizado com sucesso!");
        } catch(error){
            setSuccessMessage("Erro ao realizar o cadastro!");
        }
    }

    function clearInputs(){
        inputName.current.value = '';
        inputEmail.current.value = '';
        inputPassword.current.value = '';
    }

    return (
        <>
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

                        <div className="col-md-6 bg-primary text-white d-flex flex-column align-items-center justify-content-center p-4">
                            <h2 className="text-warning">Bem-vindo de Volta!</h2>
                            <p className="text-center">A melhor forma de controlar e monitorar seu tempo. Te ajudamos a aumentar sua produtividade e atenção! Para se manter conectado conosco, faça login com suas informações pessoais.</p>
                           
                            <Link to="/login">
                                <button className="btn btn-warning text-primary rounded-pill px-4">Entrar</button>
                            </Link>
                        </div>

                        <div className="col-md-6 bg-white d-flex flex-column align-items-center justify-content-center p-4">
                            <h2 className="text-primary">Criar Conta</h2>
                            <p className="text-muted text-center">ou use seu e-mail para cadastro:</p>

                            {successMessage && (
                                <div className="alert alert-success w-100 text-center" role="alert">
                                    {successMessage}
                                </div>
                            )}

                            <form className="w-100 px-4 text-center">
                                <input type="text" name="name" className="form-control mb-3" placeholder="Nome" ref={inputName} />
                                <input type="email" name="email" className="form-control mb-3" placeholder="E-mail" ref={inputEmail} />
                                <input type="password" name="password" className="form-control mb-3" placeholder="Senha" ref={inputPassword} />
                               
                                <button type="button" onClick= {createUsers} className="btn btn-primary rounded-pill w-50">Cadastrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;