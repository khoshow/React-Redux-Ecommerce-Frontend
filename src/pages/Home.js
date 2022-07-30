import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/nav/Header";
import { getCategories } from "../functions/category";
import { getProducts } from "../functions/myFunctions";
import { getProductCategory } from "../functions/category";
import AdminProductCard from "../components/cards/AdminProductsCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    return getProducts().then((p) => {
      setProducts(p.data);
  
    });
  };

  // const loadProductCategory= (_id)=>{
  // getProductCategory()
  // }

  return (
    <>
      <div className="container">
        <h3>Home Page</h3>
        {products.map((p) => {
          return (
            <div key={p._id}>
              <div className="card p-3">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <p>{p.price}</p>
                <div className="row">
                  <div className="col">
                    <h4>Category</h4>

                    <AdminProductCard product={p} />
                  </div>
                  <div className="col">
                    <h4>Sub Category</h4>
                    {p.subs}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
