const Id = 7;

const person = (state = {Id}, action) => {
    switch(action.type) {
        case "CHANGE_ID":
            return {person: action.person};
        default:
            return state;
    }
};

export default person;

export const getPerson = (personId, state) => state;