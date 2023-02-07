import React, { useEffect, useState } from "react";
import ListProduct from "../ListProduct/ListProduct";
import "./carousel.scss";
import Loading from "components/Loading/Loading";
import productApi from "api/productApi";
import { DEFAULT_PAGE, LIMIT } from "constants/global";
import { useCallback } from "react";

export default function Carousel() {
  const [isLoading, setIsLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [pagination, setPagination] = useState({
    page: DEFAULT_PAGE,
    limit: LIMIT,
    total: 1,
    totalPage: 1,
  });
  const [currentTab, setCurrentTab] = useState(1);
  const [isActive, setIsActive] = useState(1);

  const getAllProducts = useCallback(async () => {
    setIsLoading(true);
    const res = await productApi.getAll({
      page: pagination.page,
      limit: pagination.limit,
    });
    setListProduct([...listProduct, ...res.data]);
    setPagination({
      page: res.pagination.page,
      limit: res.pagination.limit,
      total: res.pagination.total,
      totalPage: res.pagination.totalPage,
    });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const handleIncreasePage = () => {
    if (pagination.page >= pagination.totalPage) return;
    setPagination((prev) => ({
      ...prev,
      page: pagination.page + 1,
    }));
  };

  const saleProduct = [...listProduct].filter((product) => product.discount > 0);
  const newProduct = [...listProduct].filter((product) => (Date.now() - Date.parse(product.createdAt)) / (1000 * 3600 * 24) < 10);

  return (
    <div className="Carousel">
      <div className="main-tab">
        <p
          onClick={() => {
            setCurrentTab(1);
            setIsActive(1);
          }}
          className={isActive === 1 ? "main-tab-item active" : "main-tab-item"}
        >
          Best Sellers
        </p>
        <p
          onClick={() => {
            setCurrentTab(2);
            setIsActive(2);
          }}
          className={isActive === 2 ? "main-tab-item active" : "main-tab-item"}
        >
          New Products
        </p>
        <p
          onClick={() => {
            setCurrentTab(3);
            setIsActive(3);
          }}
          className={isActive === 3 ? "main-tab-item active" : "main-tab-item"}
        >
          Sale Products
        </p>
      </div>
      <div className="tab-content">
        {currentTab === 1 &&
          (isLoading ? (
            <Loading backgroundColor="black" />
          ) : (
            <ListProduct
              product={listProduct}
              onIncreasePage={handleIncreasePage}
            />
          ))}
        {currentTab === 2 && <ListProduct product={newProduct} />}
        {currentTab === 3 && <ListProduct product={saleProduct} />}
      </div>
    </div>
  );
}
