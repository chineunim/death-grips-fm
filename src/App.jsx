import Header from "./components/header/header.jsx"
import MainPage from "./pages/mainPage.jsx";
import Album from "./pages/albumPage.jsx";
import Playbar from "./components/playbar/Playbar.jsx";
import Banner from "./components/banner/banner.jsx";
import style from './global.module.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
	return(
			<div className={style.wrapper}>
			<Banner />
			<Router>
					<Header />
					<Routes>
						<Route path="/death-grips-fm/" exact element={<MainPage />} />
						<Route path="/album/:id" element={<Album />} />
					</Routes>
			</Router>
			<div className={style.disclaimer}>
				<a href="https://thirdworlds.net">

				</a>
				<a href="https://thirdworlds.net">
					<p>I do not own rights to any music used on this website. Please, support the Death Grips!</p>
					https://thirdworlds.net/</a>
			</div>
			<Playbar />
		</div>
	)
}

export default App;