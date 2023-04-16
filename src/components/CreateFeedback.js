import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Utils from "../common/utils";
import { CREATE_FEEDBACK_REQUEST_QUERY } from "../gql/feedback-query";
import PageContainer from "./PageContainer";

const CreateFeedback = () => {

  const navigate = useNavigate();
  const { id } = useLocation().state;

  // All the data that needs to be sent to the GraphQL endpoint
  // to create a feedback request  will be passed through queryVariables.
  const queryVariables = {
    variables: {
      id: id,
      _id: Utils.getPropVal("_id"),
    }
  };

  const [CreateFeedback,{ data, loading, errors }] = useMutation(CREATE_FEEDBACK_REQUEST_QUERY, queryVariables);

  useEffect(() => {
    CreateFeedback();
    navigate("/searchUser", { state: { snackBarSuccessOpen: true, componentMessage: "Feedback Request Created Success!" } });
  });

  return <PageContainer>

  </PageContainer>
}

export default CreateFeedback;