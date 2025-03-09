import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function About() {
    useEffect(() => {
      
        document.body.classList.add('d-flex', 'flex-column', 'min-vh-100');
        
      
        return () => {
            document.body.classList.remove('d-flex', 'flex-column', 'min-vh-100');
        };
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <i className="fa-sharp fa-solid fa-clock ml-2 mx-2" style={{color: "#74C0FC"}}></i>
                        <span className="ml-2">Pomodoro</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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

            <section id="about" className="py-5 flex-grow-1 mt-5">
                <div className="container bg-light p-4 rounded shadow">
                    <h2 className="text-primary mb-4">Sobre</h2>
                    <p className="text-secondary">
                        Este trabalho foi desenvolvido para a disciplina de <strong>Desenvolvimento de Plataformas Web </strong>
                        da <strong> Universidade de Fortaleza</strong>, pelos membros da equipe:
                    </p>
                    <ul className="list-unstyled text-secondary">
                        <li>Antonio Mikael Vasconcelos Aguiar</li>
                        <li>Sandy Rodrigues do Nascimento</li>
                        <li>Vitória de Oliveira Almeida</li>
                    </ul>
                    <p className="text-secondary">
                        O objetivo era criar uma aplicação que permitisse aos usuários controlar seu tempo, ajudando-os a organizar e realizar as atividades do dia a dia com mais eficiência e foco. Além disso, esta aplicação possibilita o gerenciamento de usuários autenticados no sistema.
                    </p>
                </div>
            </section>
        </>
    )
}

export default About;