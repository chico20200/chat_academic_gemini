import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";
const Main = () => {
	const {
		onSent,
		recentPrompt,
		showResults,
		loading,
		resultData,
		setInput,
		input,
	} = useContext(Context);

    const handleCardClick = (promptText) => {
			setInput(promptText);
		};
	return (
		<div className="main">
			<div className="nav">
				<p>Academico IA EPN</p>
				<img src={assets.epn} alt="" />
			</div>
			<div className="main-container">
				{!showResults ? (
					<>
						<div className="greet">
							<p>
								<span>Hola Estudiante,</span>
							</p>
							<p>Que quieres consultar el día de hoy</p>
						</div>

                        <div className="cards">
                            <div
                                className="card"
                                onClick={() =>
                                    handleCardClick("¡Auxilio! Se cayó el SAEw y necesito matricularme. ¿Qué hago?")
                                }
                            >
                                <p>¡Se cayó el SAEw y necesito matricularme! </p>
                                <img src={assets.code_icon} alt="Icono SAEw" />
                            </div>
                            
                            <div
                                className="card"
                                onClick={() =>
                                    handleCardClick(
                                        "Dame consejos para sobrevivir a los exámenes en el Edificio de Básicas."
                                    )
                                }
                            >
                                <p>Tips para sobrevivir a los exámenes en Básicas 🏢</p>
                                <img src={assets.bulb_icon} alt="Icono Ideas" />
                            </div>
                            
                            <div
                                className="card"
                                onClick={() =>
                                    handleCardClick("¿Cómo estructuro mi plan de tesis según el formato de la EPN?")
                                }
                            >
                                <p>¿Cómo estructuro mi plan de tesis en la Poli? 🎓</p>
                                <img src={assets.compass_icon} alt="Icono Guía" />
                            </div>
                            
                            <div
                                className="card"
                                onClick={() => {
                                    handleCardClick(
                                        "Explícame un tema difícil de Ingeniería como si fuera para un novato."
                                    );
                                }}
                            >
                                <p>Explícame un tema difícil de Ingeniería fácilmente 🧠</p>
                                <img src={assets.message_icon} alt="Icono Chat" />
                            </div>
                        </div>
					</>
				) : (
					<div className="result">
						<div className="result-title">
							<img src={assets.epn} alt="" />
							<p>{recentPrompt}</p>
						</div>
						<div className="result-data">
							<img src={assets.buho_epn} alt="" />
							{loading ? (
								<div className="loader">
									<hr />
									<hr />
									<hr />
								</div>
							) : (
								<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
							)}
						</div>
					</div>
				)}

				<div className="main-bottom">
					<div className="search-box">
						<input
							onChange={(e) => {
								setInput(e.target.value);
							}}
							value={input}
							type="text"
							placeholder="Ingresa tu consulta aqui..."
						/>
						<div>
							<img src={assets.gallery_icon} alt="" />
							<img src={assets.mic_icon} alt="" />
							<img
								src={assets.send_icon}
								alt=""
								onClick={() => {
									onSent();
								}}
							/>
						</div>
					</div>
					<div className="bottom-info">
						<p>
							Gemini may display inaccurate info, including about people, so
							double-check its responses. Your privacy & Gemini Apps
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
