import React from "react";
import "./addProduct.scss";
import { Box, CircularProgress } from "@mui/material";
import InputField from "components/FormField/InputField";
import { useForm } from "react-hook-form";
import { SelectField } from "components/FormField/SelectField";
import { useState } from "react";
import productApi from "api/productApi";
import { useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useHistory } from "react-router-dom";

export default function EditProduct() {
  const history = useHistory();
  const location = useLocation();
  const productItem = location.state;
  const initialValues = {
    discount: productItem.discount ? productItem.discount : 0,
    evaluation: productItem.evaluation ? productItem.evaluation : 0,
    description: productItem.description ? productItem.description : "",
    sold: productItem.sold ? productItem.sold : 0,
    name: productItem.name ? productItem.name : "",
    price: productItem.price ? productItem.price : 0,
    quantity: productItem.quantity ? productItem.quantity : 0,
    category: productItem.category._id ? productItem.category._id : "",
  };
  const validationSchema = Yup.object().shape({
    discount: Yup.number()
      .required("Discount is required")
      .min(0, "Minimum is 0"),
    price: Yup.number().required("Price is required").min(1, "Minimum is 1"),
    sold: Yup.number(),
    category: Yup.string().required("Category is required"),
    name: Yup.string().required("Name is required"),
  });
  const [loading, setLoading] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const getCategory = async () => {
    const res = await productApi.getAllCate();
    setListCategory(res.data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const selectCategory = listCategory.map((item) => {
    return { value: item._id, name: item.name };
  });
  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const res = await productApi.update(productItem._id, data);
      if (res.success === true) {
        alert("Update product successfully!");
        history.push("list-product")
      }
      setLoading(false)
    } catch (error) {
      console.log("err", error);
      alert(error);
    }
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <div className="row add-product__main">
        <div className="col-6 col-md-12 add-product__main__left">
          <h4>General</h4>
          <Box
            sx={{
              maxWidth: "100%",
            }}
          >
            <div className="left-item">
              <p>
                Title <span>*</span>
              </p>
              <InputField name="name" label="Title" control={control} />
            </div>
            <div className="left-item">
              <p>
                Price <span>*</span>
              </p>
              <InputField
                name="price"
                type="number"
                label="Price"
                control={control}
              />
            </div>
            <div className="left-item">
              <p>
                Quantity <span>*</span>
              </p>
              <InputField
                name="quantity"
                type="number"
                label="Quantity"
                control={control}
              />
            </div>
            <div className="left-item">
              <p>
                Discount <span></span>
              </p>
              <InputField
                name="discount"
                type="number"
                label="Discount"
                control={control}
              />
            </div>
            {/* <div className="left-item">
              <p>
                Sold <span></span>
              </p>
              <InputField
                name="sold"
                type="number"
                label="Sold"
                control={control}
              />
            </div> */}
            <div className="left-item">
              <p>
                Category <span>*</span>
              </p>
              <SelectField
                name="category"
                label="Category"
                control={control}
                options={selectCategory}
              />
            </div>
          </Box>
        </div>
        <div className="col-6 col-md-12 add-product__main__right">
          <div>
            <h4>Add description</h4>
            <InputField
              name="description"
              label="Description"
              control={control}
              multiline
              rows={6}
            />
          </div>
          <div className="btn-add" onClick={handleSubmit(onsubmit)}>
            {loading ? (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            ) : (
              "update"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
