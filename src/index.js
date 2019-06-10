import "babel-polyfill";

const getBooks = async function() {
  return fetch("//127.0.0.1:3000", {
    mode: "no-cors",
    headers: {
      "Content-Type": "text/json"
    }
  });
};

const books = getBooks();

console.log(books);

//
//  Styles
//
import "./index.css";
