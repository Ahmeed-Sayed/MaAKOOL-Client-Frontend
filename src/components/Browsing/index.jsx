import { useEffect, useState } from "react";
import ProudctCard from "../ProductCard";
import axios from "axios";
import SearchField from "../Search/components/SearchField";
const Browsing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/resturant/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <>
      <SearchField />
      <ProudctCard products={products} />;
    </>
  );
};
export default Browsing;
