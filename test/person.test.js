import * as person from "../src/reducers/person";
import * as personAction from "../src/actions/person"

describe('Person Reducers', () => {
  it('get default state in person', () => {
    expect(person.persons(undefined, {})).toEqual({});
  });
  it('get default state in fetching', () => {
    expect(person.fetching(undefined, {})).toEqual({});
  });
  it('should handle FETCH_PERSON in fetching', () => {
    expect(person.fetching(undefined, personAction.fetchPersonStart())).toEqual({
      'undefined': true
    });
  });
  it('should handle FETCH_PERSON__SUCCESS in fetching', () => {
    expect(person.fetching(undefined, personAction.fetchPersonSuccess({}))).toEqual({
      "[object Object]": false
    });
  });
  it('should handle FETCH_PERSON_FAIL in fetching', () => {
    expect(person.fetching(undefined, personAction.fetchPersonFail('test'))).toEqual({
      'test': false
    });
  });

  it('get default state in fetching with defined state', () => {
    expect(person.fetching({'3': true, '5': false}, {} )).toEqual({'3': true, '5': false});
  });
  it('handle FETCH_PERSON in fetching with defined state', () => {
    expect(person.fetching({'3': true, '5': false}, personAction.fetchPersonStart('person')))
      .toEqual({'3': true, '5': false, 'person': true});
  });
  it('handle FETCH_PERSON_SUCCESS in fetching with defined state', () => {
    expect(person.fetching({'3': true, '5': false}, personAction.fetchPersonSuccess('person', [])))
      .toEqual({'3': true, '5': false, 'person': false});
  });

  it('handle FETCH_PERSON_FAIL in fetching with defined state', () => {
    expect(person.fetching({'3': true, '5': false}, personAction.fetchPersonFail('person', [])))
      .toEqual({'3': true, '5': false, 'person': false});
  });

  it('get default state in editing person id with defined state', () => {
    expect(person.editingPersonId({'3': true, '5': false}, {} )).toEqual({'3': true, '5': false});
  });
  it('handle EDITING_PERSON_START in fetching with defined state', () => {
    expect(person.editingPersonId({'3': true}, personAction.editingPersonStart('person')))
      .toEqual({"id": "person"}
      );
  });
  it('handle EDITING_PERSON_SUCCESS in fetching with defined state', () => {
    expect(person.editingPersonId({'3': true, '5': false}, personAction.editingPersonSuccess('person', [])))
      .toEqual({"id": null}
      );
  });

  it('get default state in add relatives with defined state', () => {
    expect(person.addRelatives({'3': true, '5': false}, {} )).toEqual({'3': true, '5': false});
  });
  it('handle ADD_RELATIVES_START in fetching with defined state', () => {
    expect(person.addRelatives({'3': true}, personAction.addRelativesStart('person')))
      .toEqual({"relatives": "person"});
  });
  it('handle ADD_RELATIVES_SUCCESS in fetching with defined state', () => {
    expect(person.addRelatives({'3': true}, personAction.addRelativesSuccess('person', [])))
      .toEqual({"relatives": null}
      );
  });

  it('get default state in persons with defined state', () => {
    expect(person.persons({'3': true, '5': false}, {} )).toEqual({'3': true, '5': false});
  });
  it('handle FETCH_PERSON_SUCCESS in fetching with defined state', () => {
    expect(person.persons({'3': true}, personAction.searchPersonByNameStart('person')))
      .toEqual({'3': true});
  });
  it('handle SEARCH_PERSON_SUCCESS in fetching with defined state', () => {
    expect(person.persons({'3': true}, personAction.searchPersonByNameSuccess('person', [])))
      .toEqual({"3": true}
      );
  });

});