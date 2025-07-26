import styles from "./styles/main.module.scss";
import Header from "./components/Header/index.jsx";
import HeroBanner from "./components/HeroBanner/index.jsx";
import Projects from "./components/Projects/index.jsx";

const App = () => {

    return (
        <div className={styles.container}>
            <Header />
            <HeroBanner />
            <div className={styles.projects}>
                <Projects />
            </div>
        </div>
    )
}

export default App
