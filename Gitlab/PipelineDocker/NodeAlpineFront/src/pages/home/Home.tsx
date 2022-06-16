import styles from './Home.module.css';
import TopBarModule from "../../components/TopBar/TopBar";
import SearchBlock from "../../components/SearchBlock/SearchBlock";

const React = require('react');

function Home() {
    return (
        <div className={styles.HomeContainer}>
            <TopBarModule/>
            <div className={styles.mainText}>
                <div className={styles.firstTextTitle}>ORGANISEZ VOTRE ROAD TRIP</div>
                <div className={styles.secondTextTitle}>EN FRANCE</div>
            </div>
            <SearchBlock/>
        </div>
    );
}

export default Home;
