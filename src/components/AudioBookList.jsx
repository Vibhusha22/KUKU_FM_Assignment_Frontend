import { Link } from "react-router-dom";
import styles from "./AudioBookList.module.css";

function AudioBookList({ audioBook }) {
  return (
    <div className={`${styles.col} mb-4`}>
      <Link to={`/Detail/${audioBook.id}`} className={styles.link}>
        <div className={`${styles.card} shadow-sm`}>
          <img
            src={audioBook.imageLink}
            className={styles.img}
            alt={audioBook.title}
            width="100%"
            height="310"
            role="img"
            aria-label={audioBook.title}
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          />
          <div className={styles.cardBody}>
            <h5 className={styles.title}>{audioBook.title}</h5>
            <div className={styles.descriptionScroll}>
              <p className={styles.text}>
                <strong>Author:</strong> {audioBook.author}
              </p>
            </div>
            <p className={styles.text}>
              <strong>Genre:</strong> {audioBook.genre}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default AudioBookList;
