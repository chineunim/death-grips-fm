import style from "./banner.module.scss"	
import video from "./banner.gif"
import text from "./text.png"

const Banner = () => {
	return(
		<div className={style.container}>
			<img className={style.video} src={video} alt="" />
			<img className={style.text} src={text} alt="" />
		</div>
	)
}

export default Banner;