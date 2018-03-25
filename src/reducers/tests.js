import expect from 'expect';

import {persons} from "../reducers";

expect(
    counter(0, {type: 'INCREMENT'})
).toEqual(1);