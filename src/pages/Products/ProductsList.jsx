import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { ProductCard } from "../../components";
import { FilterBar } from "./components/FilterBar";
import { useFilter } from "../../context";
import { getProductList } from "../../services";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 8;

const getPageNumbers = (currentPage, totalPages) => {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
  if (currentPage >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

export const ProductsList = () => {
  const { products, initialProductList } = useFilter();
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [products.length]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {searchTerm ? `Results for "${searchTerm}"` : "All Media"}
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-gray-400 dark:text-gray-500">
          <i className="bi bi-film text-6xl mb-4 block"></i>
          <p className="text-lg">No movies found</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-10 flex-wrap">
          {/* Prev */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          {/* Page numbers with smart truncation */}
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span key={`dots-${index}`} className="px-2 py-2 text-sm text-gray-400 dark:text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors
                  ${currentPage === page
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white"
                  }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}

      {show && <FilterBar setShow={setShow} />}
    </main>
  );
};
