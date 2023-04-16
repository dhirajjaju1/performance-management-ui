import { Alert, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";

const Feedback = ({ data, navigateThru }) => {

    const navigateThruManPage = (navigateThru === "ViewCompletedFeedback") ? true : false;

    navigateThru ? data = data?.getFeedbackByStatus : data = data?.getOpenFeedbackRequest;

    const noRows = data.length === 0;

    return (
        <PageContainer>
            {(navigateThruManPage) ?
                <h2>Completed Feedback</h2>
                : <h2>Open Feedback Request</h2>}
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    {(navigateThruManPage) ?
                        <TableHead>
                            <TableRow>
                                <TableCell>Employee Id</TableCell>
                                <TableCell>Employee Name</TableCell>
                                <TableCell>Feedback Provider</TableCell>
                                <TableCell>Strengths</TableCell>
                                <TableCell>Improvements</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        :
                        <TableHead>
                            <TableRow>
                                <TableCell>Request Id</TableCell>
                                <TableCell>Employee Id</TableCell>
                                <TableCell>Employee Name</TableCell>
                                <TableCell>Feedback Provider</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Provide Feedback</TableCell>
                            </TableRow>
                        </TableHead>
                    }
                    {(noRows) ?
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="info">No Data !</Alert>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        : (navigateThruManPage) ?
                            <TableBody>
                                {data?.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="center">{row.feedbackRequestor.employeeId}</TableCell>
                                        <TableCell>{row.feedbackRequestor.userName}</TableCell>
                                        <TableCell>{row.feedbackReceiverUser.userName}</TableCell>
                                        <TableCell>{row.strengths}</TableCell>
                                        <TableCell>{row.improvements}</TableCell>
                                        <TableCell>{row.feedbackAcceptedStatus}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            :
                            <TableBody>
                                {data?.map((row) => (
                                    (<TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell align="center">{row.feedbackRequestor.employeeId}</TableCell>
                                        <TableCell>{row.feedbackRequestor.userName}</TableCell>
                                        <TableCell>{row.feedbackReceiverUser.userName}</TableCell>
                                        <TableCell>{row.feedbackAcceptedStatus}</TableCell>
                                        <TableCell>
                                            <Link to="/provideFeedback" state={{
                                                id: row.id, employeeId: row.feedbackRequestor.employeeId,
                                                name: row.feedbackRequestor.userName, improvements: row.improvements, strengths: row.strengths
                                            }}>
                                                provide
                                            </Link>
                                        </TableCell>
                                    </TableRow>)
                                ))}
                            </TableBody>
                    }
                </Table>
            </TableContainer>
            {(navigateThruManPage) ?
                <Link to="/viewDirectReportees" align="right">Back</Link>
                : <Link />}
        </PageContainer>
    );
};

export default Feedback;