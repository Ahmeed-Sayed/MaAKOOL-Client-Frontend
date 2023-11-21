import { useState, useEffect } from "react";
import Searchcomp from "./components/SearchField";
import axios from "axios";
import ProudctCard from "../ProductCard";
import { useLocation } from "react-router-dom";

export default function Search() {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const searchTerm = urlSearchParams.get("name");
  const [searchList, setSearchList] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = (searchTerm) => {
    axios
      .get(`http://127.0.0.1:8000/resturant/products/?search=${searchTerm}`)
      .then((res) => {
        const results = res.data.results;
        setSearchList(results);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    if (searchTerm) {
      fetchProducts(searchTerm);
    }
  }, [searchTerm]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <Searchcomp />
      <ProudctCard products={searchList} />
    </div>
  );
}
