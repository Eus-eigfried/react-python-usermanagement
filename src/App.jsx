import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainTable from "./components/pages/developer/MainHome";
import { StoreProvider } from "./store/StoreContext";
function App() {
	return (
		<>
			<StoreProvider>
				<Router>
					<Routes>
						<Route
							path='/*'
							element={<MainTable />}
						/>
					</Routes>
				</Router>
			</StoreProvider>
		</>
	);
}
export default App;
