import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

const Sidebar = () => {
	const [extended, setExtended] = useState(false);
	const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

	const loadPreviousPrompt = async (prompt) => {
		setRecentPrompt(prompt);
		await onSent(prompt);
	};

	const showHelp = () => {
		alert(
			"Escribe tu mensaje y presiona enviar.\nPuedes seleccionar chats recientes desde el menú."
		);
	};

	const toggleHistory = () => {
		setExtended((prev) => !prev);
	};

	const showSettings = () => {
		alert("Configuración disponible próximamente.");
	};

	return (
		<div className="sidebar">
			<div className="top">
				<img
					src={assets.menu_icon}
					className="menu"
					alt="menu-icon"
					onClick={() => {
						setExtended((prev) => !prev);
					}}
				/>
				<div className="new-chat">
					<img
						src={assets.plus_icon}
						alt=""
						onClick={() => {
							newChat();
						}}
					/>
					{extended ? <p>Nuevo chat</p> : null}
				</div>
				{extended ? (
					<div className="recent">
						<p className="recent-title">Recientes</p>
						{prevPrompts.map((item, index) => {
							return (
								<div
									onClick={() => {
										loadPreviousPrompt(item);
									}}
									className="recent-entry"
									key={index}
								>
									<img src={assets.message_icon} alt="" />
									<p>{item.slice(0, 18)}...</p>
								</div>
							);
						})}
					</div>
				) : null}
			</div>
			<div className="bottom">
				<div className="bottom-item recent-entry" onClick={showHelp}>
					<img src={assets.question_icon} alt="" />
					{extended ? <p>Ayuda</p> : null}
				</div>
				<div className="bottom-item recent-entry" onClick={toggleHistory}>
					<img src={assets.history_icon} alt="" />
					{extended ? <p>Historial</p> : null}
				</div>
				
			</div>
		</div>
	);
};

export default Sidebar;
