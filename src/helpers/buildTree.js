import {uniq} from "ramda";

export const getUserById = (id,data) => {
    return data.find(user => user.id === id);
};

export const buildParentsTree = (id,data) => {
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

export const buildChildrenTree = (id,data) => {
    if (id !== null) {
        let user = getUserById(id, data);

        return {
            "name": user.id,
            "children": getChildren(id,data)
        };
    }
    return null;
};
export const findSiblings = (id,data) => {
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

export const findRelationships = (id,data) => {
    let relationship = [];
    data.map((user) => {
            if (user.mother === id && user.father !== null) {
                relationship.push(user.father);
            }else if(user.father === id && user.mother !== null){
                relationship.push(user.mother);
            }
        }
    );
    return uniq(relationship);
};

export const getChildren = (id,data) => {
    let children = [];
    data.map(user => {
        if (user.mother === id || user.father === id) {
            children.push(buildChildrenTree(user.id,data));
        }
    });
    return children;
};