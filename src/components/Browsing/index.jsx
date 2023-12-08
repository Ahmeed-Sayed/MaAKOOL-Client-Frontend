import { useState, useEffect, useCallback } from "react";
import ProudctCard from "../ProductCard";
import axios from "axios";
import SearchField from "../Search/components/SearchField";
import Pagination from "./components/Pagination";
import { useQuery, useQueryClient } from "react-query";
import { Rating, styled } from "@mui/material";

const fetchProducts = async (page = 1) => {
  const response = await axios.get(
    `http://127.0.0.1:8000/resturant/products/?page=${page}`
  );
  return response.data;
};

const Browsing = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading, isError } = useQuery(
    ["fetchProducts", page],
    ({ queryKey }) => fetchProducts(queryKey[1]),
    {
      onSuccess: (data) => {
        setProducts(data.results);
        setTotalPages(Math.ceil(data.count / 12));
      },
    }
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setPage(1);
  }, []);

  return (
    <>
      <SearchField />
      <ProudctCard products={products} />
      <Pagination page={page} count={totalPages} onChange={handlePageChange} />
    </>
  );
};

export default Browsing;
