import styles from "./index.module.scss";

const HeroBanner = () => {
    return (
        <div className={styles.container}>
            <div className={styles.description}>
                <p className={styles.title}>My name <br/> is <span>Esteban</span></p>
                <p className={styles.descriptionOfDescription}>
                    I’m an Embedded Software Engineer passionate about low-level systems — from real-time code and
                    electronics to 3D modeling. I love building complete embedded solutions, from idea to deployment.
                </p>
            </div>
            <div className={styles.containerSkills}>
                <div className={styles.skills}>
                    <div className={`${styles.skill} ${styles.cpp}`}>C++</div>
                    <div className={`${styles.skill} ${styles.c}`}>C</div>
                    <div className={`${styles.skill} ${styles.python}`}>Python</div>
                    <div className={`${styles.skill} ${styles.bash}`}>Bash</div>
                </div>
            </div>
            <div className={styles.banner}>
                <img src={"/esteban-portfolio/hero_banner.png"} alt="HeroBanner"/>
            </div>
        </div>
    )
}

export default HeroBanner;