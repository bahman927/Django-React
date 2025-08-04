// ListBooks.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function ListBooks() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", author: "" });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get("/api/books/").then((res) => setBooks(res.data));
  };

  const handleDelete = (id) => {
    axios.delete(`/api/books/${id}/delete/`).then(() => fetchBooks());
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setFormData({ title: book.title, author: book.author });
    setShowModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`/api/books/${selectedBook.id}/update/`, formData)
      .then(() => {
        setShowModal(false);
        setSelectedBook(null);
        fetchBooks();
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Books</h1>
      <ul className="space-y-2">
        {books.map((book) => (
          <li key={book.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{book.title}</p>
              <p className="text-sm text-gray-600">by {book.author}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEditClick(book)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Update Book</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
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
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}