 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListBooks from "./components/ListBooks";
import CreateBook from "./components/CreateBook";
import UpdateBook from "./components/UpdateBook";
import DeleteBook from "./components/DeleteBook";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<ListBooks />} />
          <Route path="/create" element={<CreateBook />} />
          <Route path="/update/:id" element={<UpdateBook />} />
          <Route path="/delete/:id" element={<DeleteBook />} />
        </Routes>
      </div>
    </Router>
  );
}