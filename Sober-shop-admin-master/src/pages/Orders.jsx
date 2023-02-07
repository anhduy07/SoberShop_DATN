import { Pagination } from '@mui/material';
import orderApi from 'api/orderApi';
import OrderList from 'components/OrderList/OrderList'
import React, { useEffect, useState, useCallback } from 'react'

export default function Orders() {
    const [loading, setLoading] = useState(false);
    const [listOrder, setListOrder] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 1,
        totalPage: 1
    });

    const getListOrder = useCallback(async () => {
        setLoading(true);
        const res = await orderApi.getAll({ page: pagination.page, limit: pagination.limit });
        setListOrder(res.data);
        setPagination({
            page: res.pagination.page,
            limit: res.pagination.limit,
            total: res.pagination.total,
            totalPage: res.pagination.totalPage
        })
        setLoading(false);
    }, [pagination.page, pagination.limit])

    useEffect(() => {
        getListOrder();
    }, [getListOrder])

    const handleChangePage = (e, page) => {
        setPagination(prev => ({
            ...prev,
            page: page
        }))
    };

    return (
        <div>
            <OrderList listOrder={listOrder} loading={loading} />
            <Pagination
                color='primary'
                sx={{ mt: 2, mb: 3 }}
                defaultCurrent={pagination.page}
                total={pagination.total}
                count={pagination.totalPage}
                onChange={handleChangePage}
            />
        </div>
    )
}
