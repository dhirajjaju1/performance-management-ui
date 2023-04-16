import { useLazyQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import PageContainer from "../components/PageContainer";
import ViewUsers from "./Users.page";
import { FIND_USER_QUERY } from "../gql/user-query";

const SearchUserForm = () => {

    const { snackBarSuccessOpen, componentMessage } = useLocation().state ?? {};

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (snackBarSuccessOpen) {
            setOpen(true);
        }
    }, []);

    const [id, SetId] = useState(null);
    const [name, SetName] = useState(null);

    const validationSchema = Yup.object().shape({
        id: Yup.string().when('name', {
            is: (name) => !name || name.length === 0,
            then: () => Yup.string()
                .required("Either Employee ID or Name is Required ")
        }),
        name: Yup.string().when('id', {
            is: (id) => !id || id.length === 0,
            then: () => Yup.string().required("Either Employee ID or Name is Required"),
        })
    }, [['id', 'name']]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


    const onSubmit = (data) => {
        SetId(data.id);
        SetName(data.name);
        SearchUser();
    };

    const queryVariables = {
        variables: {
            id: id,
            userName: name
        }
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const [SearchUser, { data, loading, error }] = useLazyQuery(FIND_USER_QUERY, queryVariables);

    return (
        <PageContainer>
            <h2>Search User</h2>
            <form autoComplete="off"
                style={{ maxWidth: "400px", margin: "auto" }}>
                <TextField
                    id="id"
                    name="id"
                    label="Employee Id"
                    fullWidth
                    required
                    variant="outlined"
                    {...register('id')}
                    error={errors.id ? true : false}
                    helperText={errors.id ? errors.id.message : ""}
                    style={{ marginBottom: "1rem" }} />
                <TextField
                    id="name"
                    name="name"
                    label="Employee Name"
                    fullWidth
                    required
                    variant="outlined"
                    {...register('name')}
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name.message : ""}
                    style={{ marginBottom: "1rem" }} />
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                    Search User
                </Button>
            </form>
            <ViewUsers data={data} navigateThru={"SearchUser"} />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {componentMessage}
                </Alert>
            </Snackbar>
        </PageContainer>

    );
};

export default SearchUserForm;