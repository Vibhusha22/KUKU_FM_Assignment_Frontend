import { useState, useEffect } from "react";
import apiService from "../apiService";
import AudioBookList from "../components/AudioBookList";

function AudioBooks() {
  const [audioBooks, setAudioBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAudioBooks = async () => {
      setStatus("loading");
      try {
        const audioBooksResponse = await apiService.getAudioBooks();
        setAudioBooks(audioBooksResponse || []);
        setFilteredBooks(audioBooksResponse || []);
        setStatus("succeeded");
      } catch (error) {
        console.error("Failed to fetch audiobooks", error);
        setError(error.message);
        setStatus("failed");
      }
    };
    fetchAudioBooks();
  }, []);

  const handleSearchChange = (query) => {
    const filtered = audioBooks.filter((book) => {
      return (
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.genre.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredBooks(filtered);
  };

  let content;

  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "succeeded") {
    content = (
      <div className="scrollable-container">
        <div className="album py-5 bg-body-tertiary">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {filteredBooks.map((audioBook) => (
                <AudioBookList key={audioBook.id} audioBook={audioBook} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <>
      <input
        type="search"
        className="form-control"
        placeholder="Search by title, author, genre..."
        aria-label="Search"
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      {content}
    </>
  );
}

export default AudioBooks;
