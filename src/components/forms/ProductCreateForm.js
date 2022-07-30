import React from "react";

import { Button } from "antd";
import { Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  values,
  setValues,
  handleCategoryChange,
  subOptions,
  showSub,
}) => {
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  console.log("Show Sub", showSub);
  console.log("SUb Options", subOptions);
  console.log("Categories from Procreate create form", categories);
  console.log("Categories from Procreate create form", categories.map((c)=>c));
  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-6">
        <div className="form-group mb-5">
          <label>Title</label>
          <input
            type="text"
            name="title"
            values={title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group mb-5">
          <label>Description</label>
          <input
            type="text"
            name="description"
            values={description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group mb-5">
          <label>Price</label>
          <input
            type="number"
            name="price"
            values={price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group mb-5">
          <label>Shipping</label>
          <select
            name="shipping"
            className="form-control"
            onChange={handleChange}
          >
            <option>Please Select</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div className="form-group mb-5">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            values={quantity}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group mb-5">
          <label>Color</label>
          <select name="color" onChange={handleChange} className="form-control">
            <option>Select One</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-5">
          <label>Brand</label>
          <select name="brand" className="form-control" onChange={handleChange}>
            <option>Select One</option>
            {brands.map((b) => {
              return (
                <option values={b} key={b}>
                  {b}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            name="brand"
            values={brand}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            className="form-control"
            onChange={handleCategoryChange}
          >
            <option>Please select</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        {showSub && (
          <div>
            <label>Sub Categories</label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </div>
        )}
      </div>
      <button className="btn btn-primary">Save</button>
    </form>
  );
};

export default ProductCreateForm;
