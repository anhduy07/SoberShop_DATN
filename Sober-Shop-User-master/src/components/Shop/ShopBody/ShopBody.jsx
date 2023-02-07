import React, { useCallback, useEffect, useState } from "react";
import { FaTh, FaThLarge, FaCircle, FaFilter } from "react-icons/fa";
import ProductItem from "../../../features/Product/components/ProductItem/ProductItem";
// import RangeSlider from "../RangeSlider/RangeSlider";
import "./shop.scss";
import categoryApi from "api/categoryApi";
import Loading from "components/Loading/Loading";
import { Col, Container, Row } from "reactstrap";
import productApi from "api/productApi";
import { DEFAULT_PAGE } from "constants/global";

export default function ShopBody() {
  const [currentTab, setCurrentTab] = useState(1);
  const [gridTab, setGridTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [pagination, setPagination] = useState({
    page: DEFAULT_PAGE,
    limit: 8,
    total: 0,
    totalPage: 0,
  });
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);  

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

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryApi.getAll();
        setCategories(response.data);
      } catch (error) {
        console.log("Failed to fetch category list", error);
      }
    };

    fetchCategory();
  }, []);

  const onChangeMinPrice = (e) => {
    setMinPrice(e.target.value);
  }

  const onChangeMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  }

  const handleClickIncrease = () => {
    setLoading(true);
    if (pagination.page >= pagination.totalPage) return;
    setPagination((prev) => ({
      ...prev,
      page: pagination.page + 1,
    }));
    setLoading(false);
  };

  const handleSearchByCategory = async (categoryId) => {
    try {
      setIsLoading(true);
      const res = await productApi.searchByCategory(categoryId);
      setListProduct(res.data);
      setIsLoading(false);
    } catch (error) {
      return;
    }
  }

  const handleChangePrice = async() => {
    try {
      setIsLoading(true);
      const res = await productApi.searchByPrice({minPrice: minPrice, maxPrice: maxPrice});
      setTimeout(() => {
        setListProduct(res.data);
      }, 1000);
      setIsLoading(false);
    } catch (error) {
      return;
    }
  }

  //hot product
  const hotProduct = listProduct.filter((product) => product.sold >= 40);
  const saleProduct = listProduct.filter((product) => product.discount > 0);
  const newProduct = listProduct
    .sort()
    .filter((product) => (Date.now() - Date.parse(product.createdAt)) / (3600 * 24 * 1000) < 10);

  return (
    <div className="ShopBody">
      <div className="shopbody-container">
        <div className="shopbody-filter">
          <div className="shopbody-filter-cate">
            <div className="shopbody-filter-title">Product Categories</div>
            <div className="shopbody-filter-catelist">
              {categories.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleSearchByCategory(item?._id)}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
            <div className="shopbody-filter-line"></div>
          </div>
          <div className="shopbody-filter-price">
            <div className="shopbody-filter-title">Price</div>
          </div>
          {/* <div>
            <RangeSlider value={range} setValue={setRange} />
          </div> */}
          <div className="shopbody-filter-range">
            <div className="shopbody-filter-range__item">
              <label htmlFor="min_price">From</label>
              <input
                type="number"
                placeholder="Price"
                id="min_price"
                value={minPrice}
                onChange={onChangeMinPrice}
              />
            </div>
            <div className="shopbody-filter-range__item">
              <label htmlFor="max_price">To</label>
              <input
                type="number"
                placeholder="Price"
                id="max_price"
                value={maxPrice}
                onChange={onChangeMaxPrice}
              />
            </div>
          </div>
          <div className="shopbody-filter-submit" onClick={handleChangePrice}>
            Filter
          </div>
        </div>

        <div className="shopbody-main">
          <div className="shopbody-main-container flex">
            <div className="shopbody-tab flex">
              <div
                onClick={() => setCurrentTab(1)}
                className={
                  currentTab === 1
                    ? "shopbody-tab-item active"
                    : "shopbody-tab-item"
                }
              >
                All Products
              </div>
              <div
                onClick={() => setCurrentTab(2)}
                className={
                  currentTab === 2
                    ? "shopbody-tab-item active"
                    : "shopbody-tab-item"
                }
              >
                Hot Products
              </div>
              <div
                onClick={() => setCurrentTab(3)}
                className={
                  currentTab === 3
                    ? "shopbody-tab-item active"
                    : "shopbody-tab-item"
                }
              >
                New Products
              </div>
              <div
                onClick={() => setCurrentTab(4)}
                className={
                  currentTab === 4
                    ? "shopbody-tab-item active"
                    : "shopbody-tab-item"
                }
              >
                Sales Products
              </div>
            </div>

            <div className="shopbody-option flex">
              <div className="count">{pagination.total} products</div>
              <div className="shopbody-option-grid flex">
                <div className="grid-icon" onClick={() => setGridTab(1)}>
                  <FaTh className={gridTab === 1 ? "grid-icon-active" : " "} />
                </div>
                <div className="grid-icon" onClick={() => setGridTab(2)}>
                  <FaThLarge
                    className={gridTab === 2 ? "grid-icon-active" : " "}
                  />
                </div>
                <div className="grid-icon" onClick={() => setGridTab(3)}>
                  <FaCircle
                    className={gridTab === 3 ? "grid-icon-active" : " "}
                  />
                </div>
              </div>
              <div className="shopbody-option-filter">
                <FaFilter />
                <span>Filter</span>
              </div>
            </div>
          </div>

          {currentTab === 1 &&
            (isLoading ? (
              <Loading backgroundColor="black" />
            ) : listProduct.length === 0 ? (
              <div>No product</div>
            ) : (
              <div className="shopbody-products">
                <Container fluid="true">
                  <Row>
                    {listProduct.map((item, index) => {
                      return (
                        <Col md="4" lg="3" key={index}>
                          <ProductItem product={item} />
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              </div>
            ))}

          {currentTab === 2 && (
            <div className="shopbody-products">
              <Container fluid="true">
                <Row>
                  {hotProduct.map((item, index) => {
                    return (
                      <Col md="4" lg="3">
                        <ProductItem key={item.id} product={item} />
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </div>
          )}

          {currentTab === 3 && (
            <div className="shopbody-products">
              <Container fluid="true">
                <Row>
                  {newProduct.map((item, index) => {
                    return (
                      <Col md="4" lg="3">
                        <ProductItem key={item.id} product={item} />
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </div>
          )}

          {currentTab === 4 && (
            <div className="shopbody-products">
              <Container fluid="true">
                <Row>
                  {saleProduct.map((item, index) => {
                    return (
                      <Col md="4" lg="3">
                        <ProductItem key={item.id} product={item} />
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </div>
          )}

          <div className="loadmore">
            <div className="loadmore-btn" onClick={handleClickIncrease}>
              {loading === false && (
                <div
                  className="loadmore-btn-text btn"
                  onClick={handleClickIncrease}
                >
                  Load more
                </div>
              )}
              {loading === true && (
                <div className="loadmore-loading btn">
                  <Loading />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
