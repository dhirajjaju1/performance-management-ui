import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PageContainer from "../components/PageContainer";
import { UPDATE_FEEDBACK } from "../gql/feedback-query";

const EditFeedback = () => {

  const validationSchema = Yup.object().shape({
    strengths: Yup.string()
                  .required('Strengths is required')
                  .max(200, 'Strengths must be less than 200 characters'),
    improvements: Yup.string()
                    .required('Improvements is required')
                    .max(200, 'Improvements must be less than 200 characters')
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    SetStrengths(data.strengths);
    SetImprovements(data.improvements);
    UpdateFeedback();
    navigate("/viewRequestedFeedback" , { state: { snackBarSuccessOpen: true, componentMessage: "Feedback Provided success!" } });
  };

  const[strengths1, SetStrengths]  = useState(null);
  const[improvements1, SetImprovements]  = useState(null);
  const { id, employeeId, name, improvements, strengths } = useLocation().state;

  const queryVariables =  {
    variables: {
      id: id,
      status: "Completed",
      strengths: strengths1,
      improvements: improvements1
    }
  };

  const [UpdateFeedback, { data, loading, error }] = useMutation(UPDATE_FEEDBACK, queryVariables);

  return <PageContainer>
    <form autoComplete="off"
      style={{ maxWidth: "400px", margin: "auto" }}>
      <TextField
        id="employeeId"
        name="employeeId"
        label="Employee Id"
        variant="outlined"
        disabled
        value={employeeId}
        fullWidth
        style={{ marginBottom: "1rem" }} />
      <TextField
        id="name"
        name="name"
        label="Employee Name"
        variant="outlined"
        disabled
        value={name}
        fullWidth
        style={{ marginBottom: "1rem" }} />
      <TextField
        id="strengths"
        name="strengths"
        label="Strengths"
        fullWidth
        required
        value={strengths}
        variant="outlined"
        {...register('strengths')}
        error={errors.strengths ? true : false}
        helperText={errors.strengths ? errors.strengths.message : ""}
        style={{ marginBottom: "1rem" }} />
      <TextField
        id="improvements"
        name="improvements"
        label="Improvements"
        multiline
        fullWidth
        required
        value={improvements}
        variant="outlined"
        {...register('improvements')}
        error={errors.improvements ? true : false}
        helperText={errors.improvements ? errors.improvements.message : ""}
        maxRows={4}
        style={{ marginBottom: "1rem" }} />
      <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
        Submit Feedback Request
      </Button>
    </form>
    <Link to="/viewRequestedFeedback" align="right">Back</Link>
  </PageContainer>
}

export default EditFeedback;