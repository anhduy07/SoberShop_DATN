import React from 'react'
import { Paper, TableContainer, TableHead, Table, TableRow, TableCell, Typography, TableBody} from '@mui/material'
import { employeeData } from 'assets/fakeData/global'

const style = {
    backgroundColor: '#bbbbbb',
    width: '100%',
    height: '10px',
    borderRadius: '20px'
}

export default function Employee() {
    return (
        <div className="employee">
            <TableContainer component={Paper} style={{ borderRadius: 10}}>
                <Typography variant="h5"  component="div" gutterBottom style={{margin: '16px 0 0 16px', fontWeight: 600}}>Empolyee Status</Typography>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                employeeData.header.map((item, index) => {
                                    return (
                                        <TableCell key={index} style={{fontWeight: 600}}>{item}</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            employeeData.body.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.position}</TableCell>
                                        <TableCell>
                                            <div style={style}>
                                                <div style={{height: '10px', backgroundColor: '#62b4ff', width: `${item.skill}`, borderRadius: '20px'}}>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{item.experience}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
