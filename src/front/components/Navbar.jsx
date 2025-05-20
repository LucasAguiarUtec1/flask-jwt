import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate();
	const handleCloseSession = () => {
		dispatch({type: 'close_session', payload:{}})
		sessionStorage.clear();
		navigate('/login');
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary" onClick={() => handleCloseSession()}>Cerrar session</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};