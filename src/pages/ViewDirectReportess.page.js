import { useQuery } from "@apollo/client";
import React from "react";
import Utils from "../common/utils";
import PageContainer from "../components/PageContainer";
import ViewUsers from "./Users.page";
import { FINDALL_USERS_BY_MANAGERSID_QUERY } from "../gql/user-query";

const ViewDirectReportess = () => {

  const queryVariables = {
    variables: {
      id: Utils.employeeId()
    }
  };

  const { data, loading, error } = useQuery(FINDALL_USERS_BY_MANAGERSID_QUERY, queryVariables);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  return <PageContainer>
    <ViewUsers data={data} navigateThru={"ViewDirectReportess"}/>
  </PageContainer>
}

export default ViewDirectReportess;