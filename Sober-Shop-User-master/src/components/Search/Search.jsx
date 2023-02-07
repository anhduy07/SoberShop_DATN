import React, { useState, useEffect, useCallback } from "react";
import "./search.scss";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import productApi from "api/productApi";
import ProductItem from "features/Product/components/ProductItem/ProductItem";
import { DEFAULT_PAGE } from "constants/global";
import { CircularProgress } from "@material-ui/core";
import { Col, Row } from "reactstrap";

export default function Search() {
  const [loading, setloading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [productItem, setProductItem] = useState([]);
  const [product, setProduct] = useState([]);
  const [pagination, setPagination] = useState({
    page: DEFAULT_PAGE,
    limit: 20,
    total: 0,
    totalPage: 0,
  });

  const getProduct = useCallback(async () => {
    try {
      setloading(true);
      const res = await productApi.getAll({
        page: pagination.page,
        limit: pagination.limit,
      });
      console.log(res);
      setProduct(res.data);
      setProductItem(res.data);
      setPagination({
        page: res.pagination.page,
        limit: res.pagination.limit,
        total: res.pagination.total,
        totalPage: res.pagination.totalPage,
      });
      setloading(false);
    } catch (error) {
      return;
    }
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const handleRemove = () => {
		setSearchValue("");
		getProduct();
  };

  const handleSearchProduct = () => {
    const searchProduct = [];
    for (let i in productItem) {
      if (productItem[i]?.name.toLowerCase().includes(searchValue?.toLowerCase())) {
        searchProduct.push(productItem[i]);
      }
    }
    setProduct(searchProduct);
  };

  return (
    <div>
      <div className="search">
        <div className="search-main">
          <div className="search-main-form">
            <span className="search-title">Sober</span>
            <div className="search-input">
              <input
                type="text"
                placeholder="Search product..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <AiOutlineClose className="close-icon" onClick={handleRemove} />
            </div>
            <button className="search-btn" onClick={handleSearchProduct}>
              <FaSearch />
              <span>Search</span>
            </button>
          </div>
        </div>
        {loading ? (
          <CircularProgress size={20} />
        ) : product.length === 0 ? (
          <div style={{ textAlign: "center", fontSize: "24px", marginBottom: 50 }}>No product</div>
        ) : (
          <div className="search-bottom">
              <Row>
                {product.map((item, index) => {
                  return (
                    <Col sm="4" lg="2" key={index}>
                      <ProductItem product={item} />
                    </Col>
                  );
                })}
              </Row>
          </div>
        )}
      </div>
    </div>
  );
}
