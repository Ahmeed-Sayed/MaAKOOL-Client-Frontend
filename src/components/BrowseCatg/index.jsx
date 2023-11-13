import { useParams } from "react-router";
import ProudctCard from "../ProductCard";
import categories from "./categories.json";
import { useEffect, useState } from "react";
import axios from "axios";
export default function BrowseCatg() {
  // const { catgName } = useParams();
  // console.log("hello");
  // const selectedCategory = categories.find(
  //   (category) => category.name === catgName
  // );
  // if (!selectedCategory) {
  //   return <div>Category not found</div>;
  // }
  // console.log(selectedCategory, "hello");
  // const categoryProducts = products.filter(
  //   (product) => product.category === selectedCategory.name
  // );
  const [products, setProducts] = useState([]);

  const params = useParams();
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/resturant/category-products/${params.catgNum}/`
      )
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [params.catgNum]);

  return <ProudctCard products={products} />;
}
