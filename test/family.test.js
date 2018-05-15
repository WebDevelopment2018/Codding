let family = require("../src/reducers/family");
let familyAction = require("../src/actions/fetching");

describe('Family Reducers', () => {
  it('get default state in families', () => {
    expect(family.families(undefined, {})).toEqual({});
  });
  it('should handle FETCH_FAMILY in fetching', () => {
    expect(family.fetching(undefined, familyAction.fetchFamilyStart())).toEqual({
      'undefined': true
    });
  });
  it('should handle FETCH_FAMILY__SUCCESS in fetching', () => {
    expect(family.fetching(undefined, familyAction.fetchFamilySuccess({}))).toEqual({
      "undefined": false
    });
  });
  it('should handle FETCH_FAMILY_FAIL in fetching', () => {
    expect(family.fetching(undefined, familyAction.fetchFamilyFail('test'))).toEqual({
      'undefined': false
    });
  });

  it('get default state in families with defined state', () => {
    expect(family.families({'3': true}, {})).toEqual({'3': true});
  });
  it('should handle FETCH_FAMILY in fetching with defined state', () => {
    expect(family.fetching({'3': true, '5': false}, familyAction.fetchFamilyStart('family')))
      .toEqual({'3': true, '5': false, 'family': true});
  });
  it('should handle FETCH_FAMILY__SUCCESS in fetching with defined state', () => {
    expect(family.fetching({'3': true, '5': false}, familyAction.fetchFamilySuccess('family','5'))).toEqual(
    {'3': true, '5': false});
  });
  it('should handle FETCH_FAMILY_FAIL in fetching with defined state', () => {
    expect(family.fetching({'3': true, '5': false}, familyAction.fetchFamilyFail('family','5'))).toEqual(
      {'3': true, '5': false});
  });
});