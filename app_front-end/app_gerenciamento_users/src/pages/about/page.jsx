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
            {/* Navbar atualizada com a cor do projeto */}
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#1565C0" }}>
                <div className="container">
                    <head>
                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6916450801994185"
                            crossorigin="anonymous"></script>
                    </head>
                    <Link className="navbar-brand d-flex align-items-center text-white" to="/">
                        <i className="fa-sharp fa-solid fa-clock ml-2 mx-2" style={{ color: "#BBDEFB" }}></i>
                        <span className="ml-2">Pomodoro</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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

            {/* Seção Sobre */}
            <section id="about" className="py-5 flex-grow-1 mt-5">
                <div className="container bg-light p-4 rounded shadow">
                    <h2 className="text-primary mb-4">Sobre</h2>
                    <p className="text-secondary">
                        Este trabalho foi desenvolvido para a disciplina de <strong>Projeto Aplicado de Desenvolvimento de Software - Etapa 2 </strong>
                        da <strong> Universidade de Fortaleza</strong>, pelos membros da equipe:
                    </p>
                    <ul className="list-unstyled text-secondary">
                        <li>Antonio Mikael Vasconcelos Aguiar - 2326335</li>
                        <li>Sandy Rodrigues do Nascimento - 2326334</li>
                        <li>Vitória de Oliveira Almeida - 2325332</li>
                    </ul>
                    <p className="text-secondary">
                        O objetivo era criar uma aplicação que permitisse aos usuários controlar seu tempo, ajudando-os a organizar e realizar as atividades do dia a dia com mais eficiência e foco. Além disso, essa aplicação possibilita o gerenciamento de usuários autenticados no sistema. Levando em consideração que essa aplicação fosse desenvolvida diretamente na nuvem, tanto o front-end quanto o back-end foram implementados em ambiente cloud. Além disso, o código-fonte foi hospedado em um repositório remoto na nuvem.
                    </p>
                </div>
            </section>
        </>
    );
}

export default About;
