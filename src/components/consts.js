export const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

export const DAYNAMES = ["Mon","Tue","Wed","Thu","Fr","Sat","Su"];

export const getUserById = (id,data) => data.find(user => user.id === id);