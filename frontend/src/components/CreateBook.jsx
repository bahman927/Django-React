import React, { useState } from 'react'
import axios from 'axios'

const BookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    published_date: '',
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const formattedDate = new Date(formData.published_date).toISOString().slice(0, 10); // "YYYY-MM-DD"
    const payload = {
       ...formData,
       published_date: formattedDate,
  };
    console.log(formData.published_date);  // Should be "2025-08-03"
    try {
      const response = await axios.post('http://localhost:8000/api/books/create/', payload)
      setMessage('Book created successfully!')
      console.log(response.data)
    } catch (error) {
      setMessage('Error creating book')
      console.error(error.response?.data || error.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
      {message && <p className="mb-2 text-sm text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="published_date"
          value={formData.published_date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Book
        </button>
      </form>
    </div>
  )
}

export default BookForm

// import React, { useState } from "react";
// import axios from 'axios'

// function BookForm() {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const book = { title, author };

//     // const response = await fetch("http://localhost:8000/api/books/", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify(book),
//     // });


//   //   if (response.ok) {
//   //     alert("Book saved!");
//   //     setTitle("");
//   //     setAuthor("");
//   //   } else {
//   //     alert("Error saving book.");
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const response = await axios.post('http://localhost:8000/api/books/create/', formData)
//       setMessage('Book created successfully!')
//       console.log(response.data)
//     } catch (error) {
//       setMessage('Error creating book')
//       console.error(error.response?.data || error.message)
//     }
//   }
//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full border rounded p-2"
//         required
//       />
//       <input
//         type="text"
//         placeholder="Author"
//         value={author}
//         onChange={(e) => setAuthor(e.target.value)}
//         className="w-full border rounded p-2"
//         required
//       />
//       <button type="submit" className="bg-blue-400 text-white px-4 py-1 rounded">
//         Save Book
//       </button>
//     </form>
//   );
// }
// }

// export default BookForm;
