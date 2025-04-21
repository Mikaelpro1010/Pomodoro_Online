import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import timer from './assets/timer.svg';
import tecnicapomodoro from './assets/tecnicapomodoro.svg';
import science from './assets/science.svg';
import './App.css';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

function App() {

    return (
        <>
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

            <section className="d-flex align-items-center mt-5 animate-left">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 d-flex justify-content-center">
                            <img src={timer} alt="Imagem Pomodoro" width="400px" />
                        </div>
                        <div className="col-md-6">
                            <h1 className="text-dark mb-4">Otimize seu Tempo com Pomodoro!</h1>
                            <p className="text-secondary mb-4">
                                Está cansado de se distrair e perder o foco no trabalho ou nos estudos? Com a técnica Pomodoro, você pode organizar seu tempo e aumentar sua produtividade.
                                Acesse nossa página e descubra como usar intervalos inteligentes para alcançar suas metas e transformar seu dia a dia. Concentre-se no que realmente importa e
                                comece a ver resultados!
                            </p>
                            <Link to="/register" className="btn rounded-pill text-white" style={{ backgroundColor: "#1E88E5", padding: "12px 24px", fontSize: "18px" }}>
                                Cadastre-se
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 animate-right">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2 className="text-dark mb-4">O que é a técnica Pomodoro?</h2>
                            <p className="text-secondary">
                                A Técnica Pomodoro é um método de gerenciamento de tempo para aumentar sua produtividade.
                                Um cronômetro é usado para dividir o tempo em intervalos chamados pomodoros e pausas.
                            </p>
                            <p className="text-secondary">
                                A duração de cada intervalo depende do seu nível de foco, mas geralmente é de 25 minutos
                                para pomodoros e 5 minutos para pausas.
                            </p>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center">
                            <img src={tecnicapomodoro} alt="Imagem Técnica Pomodoro" width="400px" />
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-light mt-5 animate-left">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 d-flex justify-content-center">
                            <img src={science} alt="Imagem Ciência Pomodoro" width="400px" />
                        </div>
                        <div className="col-md-6">
                            <h2 className="text-dark mb-4">A ciência por trás da Técnica Pomodoro</h2>
                            <p className="text-secondary mb-3">
                                O <a href="https://www.cnnbrasil.com.br/saude/estudo-mostra-como-nao-ter-atencao-desviada-das-tarefas-e-manter-o-foco/"
                                    className="text-decoration-none text-primary" target="_blank"> intervalo de atenção </a>
                                é a capacidade de nos concentrarmos em uma única tarefa; quanto maior nossa concentração, mais fácil será para nós fazê-lo. Estudos estimam que esse intervalo dura aproximadamente 20 minutos.
                            </p>
                        </div>
                    </div>
                </div>
                <a href="#top"
                    className="btn btn-primary position-fixed"
                    style={{ right: "15px", bottom: "15px" }}>
                    <i className="fas fa-arrow-up"></i>
                </a>
            </section>

            <section className="mt-5">
                <footer className="pt-3 pb-3 text-white text-center" style={{ backgroundColor: "#0D47A1" }}>
                    <p>&copy; 2025. Todos os direitos reservados.</p>
                </footer>
            </section>

        </>
    )
}

export default App;

