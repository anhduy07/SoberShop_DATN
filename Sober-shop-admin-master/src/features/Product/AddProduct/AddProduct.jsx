import React, { useEffect } from 'react'
import './addProduct.scss'
import { Box, CircularProgress } from '@mui/material';
import UploadImage from 'components/UploadImage/UploadImage';
import InputField from 'components/FormField/InputField';
import { useForm } from 'react-hook-form';
import { SelectField } from 'components/FormField/SelectField';
import { useState } from 'react';
import productApi from 'api/productApi';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom'

export default function AddProduct() {
    const history = useHistory();
    const initialValues = {
        discount: 0,
        evaluation: 0,
        description: '',
        sold: 0,
        name: '',
        price: 0,
        quantity: 0,
        category: ''
    }
    const validationSchema = Yup.object().shape({
        discount: Yup.number()
            .required("Discount is required")
            .min(0, "Minimum is 0"),
        price: Yup.number()
            .required("Price is required")
            .min(1, "Minimum is 1"),
        quantity: Yup.number()
            .required("Quantity is required")
            .min(1, "Minimum is 1"),
        category: Yup.string()
            .required("Category is required"),
        name: Yup.string()
            .required("Name is required"),
    })
    const [loading, setLoading] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [selectImage, setSelectImage] = useState([]);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: initialValues,
        mode: 'all',
        resolver: yupResolver(validationSchema)
    });

    const getCategory = async () => {
        const res = await productApi.getAllCate();
        setListCategory(res.data);
    }

    useEffect(() => {
        getCategory();
    }, [])

    const selectCategory = listCategory.map(item => {
        return { value: item._id, name: item.name };
    })


    const handleImageChange = (e) => {
        if (e.target.files) {
            const fileArr = Array.from(e.target.files).map(file => file);
            setSelectImage(prev => prev.concat(fileArr));
        }
    }

    const handleRemoveImage = (index) => {
        const newImg = selectImage.filter((item, id) => id !== index);
        setSelectImage(newImg);
    }

    const onsubmit = async (data) => {
        try {
            const formData = new FormData();
            selectImage.forEach((item) => {
                return (
                    formData.append("thumb", item)
                )
            })
            formData.append("name", data.name)
            formData.append("discount", data.discount);
            formData.append("evaluation", data.evaluation);
            formData.append("description", data.description);
            formData.append("sold", data.sold);
            formData.append("quantity", data.quantity);
            formData.append("price", data.price);
            formData.append("category", data.category);
            selectImage.forEach((item) => {
                return (
                    formData.append("listImage", item)
                )
            })
            setLoading(true);
            const res = await productApi.create(formData);
            if (res.success === true) {
                alert("Add product successfully!");
                history.push('/products/list-product');
            }
            setLoading(false);
            reset(initialValues);
            setSelectImage([]);
        } catch (error) {
            console.log("err", error);
            alert(error);
        }
    }

    return (
        <div className="add-product">
            <h2>Add Product</h2>
            <div className="row add-product__main">
                <div className="col-6 col-md-12 add-product__main__left">
                    <h4>General</h4>
                    <Box
                        sx={{
                            maxWidth: '100%'
                        }}
                    >
                        <div className="left-item">
                            <p>Title <span>*</span></p>
                            <InputField
                                name="name"
                                label="Title"
                                control={control}
                            />
                        </div>
                        <div className="left-item">
                            <p>Price <span>*</span></p>
                            <InputField
                                name="price"
                                type="number"
                                label="Price"
                                control={control}
                            />
                        </div>
                        <div className="left-item">
                            <p>Quantity <span>*</span></p>
                            <InputField
                                name="quantity"
                                type="number"
                                label="Quantity"
                                control={control}
                            />
                        </div>
                        <div className="left-item">
                            <p>Discount <span></span></p>
                            <InputField
                                name="discount"
                                type="number"
                                label="Discount"
                                control={control}
                            />
                        </div>
                        {/* <div className="left-item">
                            <p>Sold <span></span></p>
                            <InputField 
                                name="sold"
                                type="number"
                                label="Sold"
                                control={control}
                            />
                        </div> */}
                        <div className="left-item">
                            <p>Category <span>*</span></p>
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
                    <div className="right-item">
                        <p style={{ marginBottom: '10px' }}>List Image</p>
                        <UploadImage
                            selectImage={selectImage}
                            handleImageChange={handleImageChange}
                            handleRemoveImage={handleRemoveImage}
                        />
                    </div>
                    <div className="btn-add" onClick={handleSubmit(onsubmit)}>
                        {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : "add"}
                    </div>
                </div>
            </div>
        </div>
    )
}
