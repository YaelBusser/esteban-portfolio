import styles from "./styles/main.module.scss";
import Header from "./components/Header/index.jsx";
import HeroBanner from "./components/HeroBanner/index.jsx";

const App = () => {

    return (
        <div className={styles.container}>
            <Header />
            <HeroBanner />
        </div>
    )
}

export default App
