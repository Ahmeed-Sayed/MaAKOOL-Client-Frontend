import { useParams } from "react-router";
import ProudctCard from "../ProductCard";
import { useEffect } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

export default function BrowseCatg() {
  const params = useParams();
  const queryClient = useQueryClient();

  const fetchProducts = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/resturant/category-products/${params.catgNum}/`
    );
    return response.data;
  };

  const { data: products, refetch } = useQuery(
    ["fetchProducts", params.catgNum],
    fetchProducts
  );

  const handleRatingSubmit = async (productId, userRating) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/resturant/rateProduct/",
        {
          product_id: productId,
          user_id: localStorage.id,
          rating_value: userRating,
        }
      );
      // Invalidate the "fetchProducts" query after rating submission
      queryClient.invalidateQueries(["fetchProducts", params.catgNum]);
    } catch (error) {
      console.error(error);
    }
  };

  // Refetch products when the category changes
  useEffect(() => {
    refetch();
  }, [params.catgNum, refetch]);

  return (
    <ProudctCard products={products} handleRatingSubmit={handleRatingSubmit} />
  );
}
