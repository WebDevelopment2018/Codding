import * as person from "../../src/reducers/person";
import * as personAction from "../../src/actions/index"

describe('Person Reducers', () => {
    it('get default state in person', () => {
        expect(person.persons(undefined, {})).toEqual({});
     });
    it('get default state in activePersonId', () => {
        expect(person.activePersonId(undefined, {})).toEqual({});
    });
    it('get default state in fetching', () => {
        expect(person.fetching(undefined, {})).toEqual({});
    });
    it('handle FETCH_PERSON in fetching', () => {
        expect(person.fetching(undefined, personAction.fetchPersonStart())).toEqual({
            'undefined': true
        });
    });
    it('handle FETCH_PERSON__SUCCESS in fetching', () => {
        expect(person.fetching(undefined, personAction.fetchPersonSuccess({}))).toEqual({
            "[object Object]": false
        });
    });
    it('handle FETCH_PERSON_FAIL in fetching', () => {
        expect(person.fetching(undefined, personAction.fetchPersonFail('test'))).toEqual({
            'test': false
        });
    });
});