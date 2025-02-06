import Bash from "../../Modules/Bash/index.jsx";
import {Outlet} from "react-router-dom";
import styles from "./index.module.scss";

const Home = () => {
    return (
        <div className={styles.container}>
            <Bash>
                <Outlet/>
            </Bash>
        </div>
    )
}

export default Home;