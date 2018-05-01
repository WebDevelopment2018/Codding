import { schema } from 'normalizr';

const personSchema = new schema.Entity('persons');
export const personsListSchema = new schema.Array(personSchema);