import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiService from "../apiService";
import AudioBookDetails from "../components/AudioBookDetails";

function AudioDetails() {
  const { id } = useParams();
  const [audioBook, setAudioBook] = useState(null);

  useEffect(() => {
    apiService
      .getAudioBookById(id)
      .then((data) => setAudioBook(data))
      .catch((error) => console.error("Error fetching audiobook:", error));
  }, [id]);

  if (!audioBook) {
    return <div>Loading...</div>;
  }

  return <AudioBookDetails audioBook={audioBook} />;
}

export default AudioDetails;
