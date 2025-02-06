import mainStyles from "../../../styles/globals.module.scss";
import styles from "./index.module.scss";

const BashHome = () => {
    return (
        <div className={styles.container}>
            <div className={mainStyles.blockText}>
                <p className={mainStyles.comments}>#Profile</p>
                <p className={mainStyles.var}>firstname<span className={mainStyles.equal}>=</span><span className={mainStyles.value}>"Esteban"</span></p>
                <p className={mainStyles.var}>lastname<span className={mainStyles.equal}>=</span><span className={mainStyles.value}>"Cottineau"</span></p>
            </div>
        </div>
    )
}

export default BashHome;