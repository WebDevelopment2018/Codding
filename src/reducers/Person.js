import data from "../../data/data.json"

const Person = (state = {data}, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default Person;

export const getPerson = (personId, state) => state;