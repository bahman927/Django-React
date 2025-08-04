import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex space-x-4">
      <Link to="/" className="hover:underline">List Books</Link>
      <Link to="/create" className="hover:underline">Create Book</Link>
      {/* <Link to="/update/1" className="hover:underline">Update Book</Link>
      <Link to="/delete/1" className="hover:underline">Delete Book</Link> */}
    </nav>
  );
}
