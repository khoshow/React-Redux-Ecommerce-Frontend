import React, { useState, useEffect } from "react";
import { getProductCategory } from "../../functions/category";

const AdminProductCard = ({ product }) => {
  const [category, setCategory] = useState("");

    useEffect(() => {
      loadProductCategory();
    }, []);

  const loadProductCategory = () => {
    getProductCategory(product.category).then((c) => {
             setCategory(c.data.name);
    });
  };

  return (
    <div>
      <p>{category}</p>
    </div>
  );
};
export default AdminProductCard;
