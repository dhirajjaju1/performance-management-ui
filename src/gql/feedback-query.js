import { gql } from "@apollo/client";


// GraphQL query to create an 
export const CREATE_FEEDBACK_REQUEST_QUERY = gql`
mutation createFeedback($_id : String!, $id : String!) {
    createFeedback(feedbackRequestorId: $_id, feedbackReceiversId: $id) {
        id
        feedbackRequestorId
        feedbackRequestorManagersId
        feedbackReceiversId
        feedbackAcceptedStatus
    }
}
`;

export const GET_ALLUSERS_COMPLETED_FEEDBACK_QUERY = gql`
query GetUserFeedback($id : String!, $status : String!) {
    getFeedbackByStatus (feedbackRequestorId : $id, feedbackAcceptedStatus : $status){
        id
        feedbackRequestorId
        feedbackRequestor {
            employeeId
            userName
            email
        }
        feedbackRequestorManagersId
        feedbackRequestorManager {
            employeeId
            userName
            email
        }
        feedbackReceiversId
        feedbackAcceptedStatus
        strengths
        improvements
        feedbackReceiverUser {
            employeeId
            userName
            email
        }
    }
}`;

export const FIND_OPEN_FEEDBACK = gql`
query getOpenFeedbackRequest($id : String!, $status : String!) {
    getOpenFeedbackRequest(feedbackReceiversId : $id, feedbackAcceptedStatus : $status){
        id
        feedbackRequestorId
        feedbackRequestor {
            employeeId
            userName
            email
        }
        feedbackRequestorManagersId
        feedbackRequestorManager {
            employeeId
            userName
            email
        }
        feedbackAcceptedStatus
        strengths
        improvements
        feedbackReceiverUser {
            employeeId
            userName
            email
        }
    }
}`;

export const UPDATE_FEEDBACK = gql`
mutation updateFeedback($id: ID!, $status : String!, $strengths: String!, $improvements: String!){
    updateFeedback(id: $id, feedbackAcceptedStatus: $status, strengths: $strengths, improvements: $improvements){
        id
        feedbackRequestorId
        feedbackRequestorManagersId
        feedbackReceiversId
        feedbackAcceptedStatus
        strengths
        improvements
    }
}`; 