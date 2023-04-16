import { useQuery } from "@apollo/client";
import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Utils from "../common/utils";
import Feedback from "./Feedback.page";
import PageContainer from "../components/PageContainer";
import { FIND_OPEN_FEEDBACK } from "../gql/feedback-query";

const ViewOpenFeedback = () => {

  const { snackBarSuccessOpen, componentMessage } = useLocation().state ?? {};

  const [open, setOpen] = useState(false);

  const queryVariables = {
    variables: {
      id: Utils.employeeId(),
      status: "New"
    }
  };

  useEffect(() => {
    if (snackBarSuccessOpen) {
      setOpen(true);
    }
  },[]);

  const { data, loading, error } = useQuery(FIND_OPEN_FEEDBACK, queryVariables, {
    fetchPolicy: "network-only"});

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    console.log('handleClose...');
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return <PageContainer>
    <Feedback data={data} />
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {componentMessage}
      </Alert>
    </Snackbar>
  </PageContainer>
}

export default ViewOpenFeedback;