import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  const searchBooks = (query) => {
    console.log("searching for books!", query);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${10}`
      )
      .then((res) => {
        console.log("data", res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <Navbar searchBooks={searchBooks} />
    </div>
  );
}

export default App;
