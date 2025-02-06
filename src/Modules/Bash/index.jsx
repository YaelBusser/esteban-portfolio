import styles from "./index.module.scss";

const Bash = ({children}) => {
    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <button className={styles.red}></button>
                <button className={styles.orange}></button>
                <button className={styles.green}></button>
            </div>
            {children}
        </div>
    )
}

export default Bash;