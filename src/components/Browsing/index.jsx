import { useState, useEffect } from "react";
import ProudctCard from "../ProductCard";
import axios from "axios";
import SearchField from "../Search/components/SearchField";
import Pagination from "./components/Pagination";
const Browsing = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/resturant/products/?page=${page}`
        );
        setProducts(response.data.data);
        setTotalPages(response.data.num_pages); // Correct attribute for total pages
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <>
      <SearchField />
      <ProudctCard products={products} />
      <Pagination page={page} count={totalPages} onChange={handlePageChange} />
    </>
  );
};

export default Browsing;
