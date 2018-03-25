import {uniq} from "ramda";

export const getUserById = (id, data) => {
    return data.find(user => user.id === id);
};

export const buildParentsTree = (id, data) => {
    if (id !== null) {
        let user = getUserById(id, data);
        let parents = [buildParentsTree(user.father, data), buildParentsTree(user.mother, data)];
        return {
            "name": user.id,
            "children": parents.filter(n => n)
        };
    }
    return null;
};

export const buildChildrenTree = (id, data) => {
    if (id !== null) {
        let user = getUserById(id, data);
        if (user.children !== []) {
            let children = [];
            user.children.map(i => children.push(buildChildrenTree(i, data)));
            return {
                "name": user.id,
                children
            };
        }
        return {
            "name": user.id,
            "children": []
        };
    }
    return null;
};
export const findSiblings = (id, data) => {
    const person = getUserById(id, data);
    let siblings = [];
    if (person.mother !== null) {
        const mother_children = getUserById(person.mother, data).children;
        mother_children.map(child => {child !== id ? siblings.push(getUserById(child,data)): child});
    }
    if (person.father !== null) {
        const father_children = getUserById(person.father, data).children;
        father_children.map(child => {child !== id ? siblings.push(getUserById(child,data)): child});
    }
    console.log(siblings);
    return uniq(siblings);
};

export const findRelationships = (id, data) => {
    if (id !== null) {
        const user = getUserById(id, data);
        return user.relationship;
    }
    return [];
};