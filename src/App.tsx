import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PokemonDetailPage from "./pages/PokemonDetailPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/detail/:id" element={<PokemonDetailPage />} />
		</Routes>
	);
}

export default App;
