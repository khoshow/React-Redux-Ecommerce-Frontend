import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";

import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createCategory({ name }, user.token)
      .then((res) => {
       
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const handleRemove = async (slug) => {
   
    if (window.confirm("delete")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col">
            {loading ? <h3>Loading...</h3> : <h3>Create Category</h3>}
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />

            <input
              type="search"
              placeholder="Search Category"
              value={keyword}
              onChange={handleSearchChange}
              className="form-control mb-4"
            />

            {categories.filter(searched(keyword)).map((c) => (
              <div className="alert alert-secondary" key={c._id}>
                {c.name}
                <span
                  onClick={() => {
                    handleRemove(c.slug);
                  }}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>

                <Link to={`/admin/category/${c.slug}`}>
                  <span className="btn btn-sm float-right">
                    <EditOutlined className="text-warning" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCreate;
