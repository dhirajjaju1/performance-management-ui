import { gql } from "@apollo/client";

export const FIND_USER_QUERY = gql`
query Users($id : String, $userName : String ) {
    findByEmployeeIdOrUserName (id : $id, userName : $userName){
        id
        institution
        employeeId
        userName
        email
        managersId
        roles
    }
}
`;

export const FINDALL_USERS_BY_MANAGERSID_QUERY = gql`
query Users($id : String!) {
    findByManagersId (id : $id){
        id
        institution
        employeeId
        userName
        email
        managersId
        roles
    }
}
`;

/*const QUERIES = {
    FIND_USER_QUERY,
    createExpenseQuery,
    FINDALL_USERS_BY_MANAGERSID_QUERY
}

export default QUERIES;*/