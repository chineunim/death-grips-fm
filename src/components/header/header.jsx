import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import style from "./header.module.scss"

const Header = () => {
	return(
		<div className={style.container}>
			<Link to="/death-grips-fm/">
				<HomeIcon className={style.home} />
			</Link>
			<h2>A	L	B	U	M	S</h2>
		</div>
	)
}

export default Header;