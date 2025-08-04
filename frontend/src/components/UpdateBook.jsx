// UpdateBook.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateBook() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: "", author: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/books/${id}/`).then((res) => setFormData(res.data));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/books/${id}/update/`, formData).then(() => navigate("/"));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
        Update Book
      </button>
    </form>
  );
}