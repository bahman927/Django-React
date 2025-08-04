import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DeleteBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log({id})

  useEffect(() => {
    axios.delete(`/api/books/${id}/delete/`).then(() => navigate("/"));
  }, [id, navigate]);

  return <p>Deleting book...</p>;
}
