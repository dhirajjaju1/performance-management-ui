import { Snackbar } from "@material-ui/core";
import { Alert, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import UserService from "../services/test.service";
import PageContainer from "./PageContainer";

const Home = () => {

  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
    if (snackBarSuccessOpen) {
      setOpen(true);
    }
  }, []);

  const { snackBarSuccessOpen, snackBarErrorOpen, componentMessage } = useLocation().state ?? {};
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <PageContainer>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {componentMessage}
          </Alert>
        </Snackbar>
      </Stack>
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </PageContainer>
  );
};

export default Home;
