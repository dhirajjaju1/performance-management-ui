
const getPropVal = (element) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
        return user._id;
    }
}

const employeeId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.employeeId) {
        return user.employeeId;
    }
};

const Utils = {
    getPropVal,
    employeeId
};

export default Utils;