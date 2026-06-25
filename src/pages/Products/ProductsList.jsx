import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { ProductCard } from "../../components";
import { FilterBar } from "./components/FilterBar";
import { useFilter } from "../../context";
import { getProductList } from "../../services";
import { toast } from "react-toastify";

export const ProductsList = () => {
  const { products, initialProductList } = useFilter();
  const [show, setShow] = useState(false);
  const search = useLocation().search;
  const searchTerm = new URLSearchParams(search).get("q");
  useTitle("Explore Movies Collection");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProductList(searchTerm);
        initialProductList(data);
      } catch (error) {
        toast.error(error.message, { closeButton: true, position: "bottom-center" });
      }
    }
    fetchProducts();
  }, [searchTerm]); //eslint-disable-line

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {searchTerm ? `Results for "${searchTerm}"` : "All Movies"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{products.length} movies available</p>
        </div>
        <button
          onClick={() => setShow(!show)}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
        >
          <i className="bi bi-sliders"></i> Filter
        </button>
      </div>

      {/* YouTube-like grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-gray-400 dark:text-gray-500">
          <i className="bi bi-film text-6xl mb-4 block"></i>
          <p className="text-lg">No movies found</p>
        </div>
      )}

      {show && <FilterBar setShow={setShow} />}
    </main>
  );
};
