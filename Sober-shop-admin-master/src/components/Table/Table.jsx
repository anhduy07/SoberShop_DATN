import React, { useState } from 'react'
import './table.scss'
import { TableContainer,Table as TableMain, TableHead, TableRow, Paper, TableBody, Typography } from '@mui/material'

export default function Table(props) {

    const initialDataShow = props.limit && props.bodyData ?
        props.bodyData.slice(0, Number(props.limit)) : props.bodyData;
    
    const [limitData, setLimitData] = useState(initialDataShow);
    const [curPage, setCurPage] = useState(0);

    let pages = 1;
    let range = [];

    if (props.limit !== undefined) {
        let page = Math.floor(props.bodyData.length / Number(props.limit))
        pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1
        range = [...Array(pages).keys()]
    } 

    const selectPage = (page) => {
        const start = Number(props.limit) * page;
        const end = start + Number(props.limit);
        setLimitData(props.bodyData.slice(start, end));
        setCurPage(page);
    }
    
    return (
        <div className="table">
            <TableContainer component={Paper} style={{ borderRadius: 10 }}> 
                <Typography variant="h5"  component="div" gutterBottom style={{margin: '16px 0 0 16px', fontWeight: 600}}>{props.title}</Typography>
                <TableMain>
                    <TableHead>
                        {
                            props.headData && props.renderHead ?
                                (
                                    <TableRow>
                                        {
                                            props.headData.map((item, index) => props.renderHead(item, index))
                                        }
                                    </TableRow>
                                ) : ''
                        }
                    </TableHead>
                    {
                        props.bodyData && props.renderBody ? (
                            <TableBody>
                                {
                                    props.limit ? (
                                        limitData.map((item, index) => props.renderBody(item, index))
                                    ) : (
                                        props.bodyData.map((item, index) => props.renderBody(item, index))
                                    )
                                    
                                }
                            </TableBody>
                        ) : ''
                    }
                    {
                        pages > 1 ? (
                            <div className="pagination">
                                {
                                    range.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`pagination-item ${curPage === index ? 'active' : ''}`}
                                                onClick={() => selectPage(index)}
                                            >
                                                {item + 1}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : ''
                    }
                </TableMain>
            </TableContainer>
        </div>
    )
}
