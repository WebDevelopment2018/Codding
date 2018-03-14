
export const changePersonId = (id) => {
    return {
        type: 'CHANGE_ID',
        person: id
    }
};

export const setData = (data) => {
    return {
        type: 'SET_DATA',
        data
    }
}