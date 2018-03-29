import * as family from "../../src/reducers/family";
import * as familyAction from "../../src/actions/index"

describe('Person Reducers', () => {
    it('get default state in families', () => {
        expect(family.families(undefined, {})).toEqual({});
    });
    it('get default state in fetching', () => {
        expect(family.fetching(undefined, {})).toEqual({});
    });
    it('handle FETCH_FAMILY in fetching', () => {
        expect(family.fetching(undefined, familyAction.fetchFamilyStart())).toEqual({
            'undefined': true
        });
    });
    it('handle FETCH_FAMILY__SUCCESS in fetching', () => {
        expect(family.fetching(undefined, familyAction.fetchFamilySuccess({}))).toEqual({
            "undefined": false
        });
    });
    it('handle FETCH_FAMILY_FAIL in fetching', () => {
        expect(family.fetching(undefined, familyAction.fetchFamilyFail('test'))).toEqual({
            'undefined': false
        });
    });
});