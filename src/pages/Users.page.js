import { Alert, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";


const Users = ({ data, navigateThru }) => {

    var noRows = true;
    if (data) {

        var navigateThruManPage = false;
        var navigateThruSearchUser = false;
        var title = null;

        switch (navigateThru) {
            case "ViewDirectReportess":
                data = data.findByManagersId;
                navigateThruManPage = true;
                title = "Direct Reportees Details";
                break;
            case "SearchUser":
                navigateThruSearchUser = true;
                data = data.findByEmployeeIdOrUserName;
                title = "Request Feedback";
                break;
            default:

                break;
        }

        noRows = data.length === 0;
    }

    return (
        <PageContainer>
            <h2>{title}</h2>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee Id</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Employee Email</TableCell>
                            <TableCell>{(navigateThruManPage) ? "View" : "Request"} Feedback</TableCell>
                        </TableRow>
                    </TableHead>
                    {(noRows) ?
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="info">No Data !</Alert>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        :
                        <TableBody>
                            {data?.map((row) => (
                                <TableRow key={row.employeeId}>
                                    <TableCell align="center">{row.employeeId}</TableCell>
                                    <TableCell>{row.userName}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>
                                        {(navigateThruManPage) ?
                                            <Link to="/viewCompletedFeedback" state={{ id: row.employeeId, name: row.userName }}>
                                                View
                                            </Link>
                                            :
                                            <Link to="/createFeedback" state={{ id: row.employeeId, name: row.userName }}>
                                                Request
                                            </Link>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>}
                </Table>
            </TableContainer>
        </PageContainer>
    );
};

export default Users;