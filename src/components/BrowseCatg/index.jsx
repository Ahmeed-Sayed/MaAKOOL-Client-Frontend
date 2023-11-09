import { useParams } from "react-router";
import products from "../Browsing/products.json";
import ProudctCard from "../ProductCard";
import categories from "./categories.json";
export default function BrowseCatg() {
  const { catgName } = useParams();
  console.log("hello");
  const selectedCategory = categories.find(
    (category) => category.name === catgName
  );
  if (!selectedCategory) {
    return <div>Category not found</div>;
  }
  console.log(selectedCategory, "hello");
  const categoryProducts = products.filter(
    (product) => product.category === selectedCategory.name
  );
  return <ProudctCard products={categoryProducts} />;
}
