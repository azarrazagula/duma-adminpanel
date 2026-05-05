import { useState } from "react";
import { useAdmin } from "../context/AdminContext";

export const useProducts = () => {
  const { products, loading, error, refreshData } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return {
    products,
    filteredProducts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    refreshProducts: refreshData,
  };
};
