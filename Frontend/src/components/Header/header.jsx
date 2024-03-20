import styles from './header.module.scss';
export default function Header(){
    return(
        <div className={styles.header}>
            <p className={styles.header__text}>File to DB Comparsion</p>
        </div>
    )
}