
import data from "../../data/data.json";
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

export const DAYNAMES = ["Mon","Tue","Wed","Thu","Fr","Sat","Su"];

export const getUserById = (id,data) => data.find(user => user.id === id);

export const buildParentsTree = (id) => {
    if (id !== null) {
        let user = getUserById(id, data);
        let parents = [buildParentsTree(user.father, name), buildParentsTree(user.mother, name)];
        return {
            "name": user.id,
            "children": parents.filter(n => n)
        };
    }
    return null;
};

export const buildChildrenTree = (id) => {
    if (id !== null) {
        let user = getUserById(id, data);

        return {
            "name": user.id,
            "children": getChildren(id)
        };
    }
    return null;
};
export const findSiblings = (id) => {
    const person = getUserById(id,data);
    let mother = person.mother,
        father = person.father,
        sistersBrothers = [];
    data.map((user) => {
            if (mother !== null && father !== null && person !== user && user.mother === mother && user.father === father) {
                sistersBrothers.push(user);
            }
        }
    );
    return sistersBrothers;


};

export const getChildren = (id) => {
    let children = [];
    data.map(user => {
        if (user.mother === id || user.father === id) {
            children.push(buildChildrenTree(user.id));
        }
    });
    return children;
};