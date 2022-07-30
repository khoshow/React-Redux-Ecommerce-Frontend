import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CategoryForm from "../../../components/forms/CategoryForm";
import AdminNav from "../../../components/nav/AdminNav";
import { getCategories } from "../../../functions/category";

import { getSub, getSubs, updateSub } from "../../../functions/sub";

const SubUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(match.params.slug);
  const [parent, setParent] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  };

  const loadSub = () => {
    getSub(name).then((s) => {
      setName(s.data);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateSub(match.params.slug, { name }, user.token).then((res) => {
      if (res.err) {
        console.log("erro");
      } else {
        toast.success("Sub Updated");
      }
    });
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10">
            {loading ? <h4>Loading...</h4> : <h4>Sub Category Update</h4>}
            <h3>Parent Category</h3>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please Select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
            <p>Update Sub Category</p>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubUpdate;
