import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm.js";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, getSub, removeSub, getSubs } from "../../../functions/sub";
import LocalSearch from "../../../components/forms/LocalSearch";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Subcreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Sub", name, "Parent", category);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`Sub category ${res.data.name} is created`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  const loadCategories = () => {
    return getCategories().then((c) => setCategories(c.data));
  };

  const loadSubs = () => {
    getSubs().then((s) => {
      setSubs(s.data);
      console.log("Subs", s.data);
    });
  };
  const handleRemove = (slug) => {
    removeSub(slug, user.token).then((s) => {
      console.log("Deleted");
      toast.success(`Sub category deleted`);
    });
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-8">
            {loading ? <div>Loading...</div> : <div>Create Sub Category</div>}
            <div className="form-group">
              <label>Parent Category</label>
              <select
                name="category"
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Please Select</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            {subs.filter(searched(keyword)).map((s) => {
              return (
                <div className="alert alert-secondary" key={s._id}>
                  {s.name}
                  <span
                    className="btn btn-sm float-right"
                    onClick={() => handleRemove(s.slug)}
                  >
                    <DeleteOutlined className="text-danger"></DeleteOutlined>
                  </span>
                  <Link to={`/admin/sub-category/${s.slug}`}>
                    <span className="btn btn-sm float-right">
                      <EditOutlined className="text-warning" />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subcreate;
