import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import Feedback from "./Feedback.page";
import { GET_ALLUSERS_COMPLETED_FEEDBACK_QUERY } from "../gql/feedback-query";

const ViewCompletedFeedback = () => {

    const { id } = useLocation().state;

    console.log("id received from request Param:" + id);
    const queryVariables = {
        variables: {
            id: id,
            status: "Completed"
        }
    };

    const { data, loading, error } = useQuery(GET_ALLUSERS_COMPLETED_FEEDBACK_QUERY, queryVariables);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    return (
        <Feedback data={data} navigateThru={"ViewCompletedFeedback"} />
    );

}

export default ViewCompletedFeedback;