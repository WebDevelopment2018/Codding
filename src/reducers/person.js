const startId = 7;

const person = (state = {startId}, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default person;

export const getPerson = (personId, state) => state;