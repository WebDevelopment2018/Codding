import { getPersonById } from "../reducers/index"
import { uniq } from "ramda"
import { fetchPerson } from "./person"
import { FETCH_FAMILY, FETCH_FAMILY_FAIL, FETCH_FAMILY_SUCCESS } from "./actionTypes"

export const fetchFamilyStart = id => ({ type: FETCH_FAMILY, id })
export const fetchFamilySuccess = (family, id) => ({ type: FETCH_FAMILY_SUCCESS, family, id })
export const fetchFamilyFail = (family, id) => ({ type: FETCH_FAMILY_FAIL, family, id })

export const fetchUserFamily = id => async dispatch => {
  dispatch(fetchFamilyStart(id))
  try {
    const family = {
      parents: await dispatch(getParents(id)),
      children: await dispatch(getChildren(id)),
      relationship: await dispatch(getRelationship(id)),
      siblings: await dispatch(getSiblings(id))
    }
    dispatch(fetchFamilySuccess(family, id))
  } catch (error) {
    dispatch(fetchFamilyFail(error))
  }
}

export const getParents = id => async (dispatch, getState) => {
  if (id) {
    let person = getPersonById(id, getState())
    if (!person) {
      await dispatch(fetchPerson(id))
    }
    person = getPersonById(id, getState())
    let parents = [
      await dispatch(getParents(person.father)),
      await dispatch(getParents(person.mother))
    ]
    return {
      name: person._id,
      children: parents.filter(n => n)
    }
  }
  return null
}
export const getRelationship = id => async (dispatch, getState) => {
  let person = getPersonById(id, getState())
  if (!person) {
    await dispatch(fetchPerson(id))
  }
  await Promise.all(
    person.relationship.map(i => (!getPersonById(i, getState()) ? dispatch(fetchPerson(i)) : i))
  )
  return person.relationship
}
export const getSiblings = id => async (dispatch, getState) => {
  let person = getPersonById(id, getState())
  if (!person) {
    person = await dispatch(fetchPerson(id))
  }
  let siblings = []
  if (person.mother !== null) {
    let mother = getPersonById(person.mother, getState())
    if (!mother) {
      mother = await dispatch(fetchPerson(person.mother))
    }

    mother.children.map(child => (child !== person._id ? siblings.push(child) : child))
  }
  if (person.father !== null) {
    let father = getPersonById(person.father, getState())
    if (!father) {
      father = await dispatch(fetchPerson(person.father))
    }
    father.children.map(child => (child !== person._id ? siblings.push(child) : child))
  }
  siblings = uniq(siblings)
  await Promise.all(
    siblings.map(i => (!getPersonById(i, getState()) ? dispatch(fetchPerson(i)) : i))
  )
  return siblings
}
export const getChildren = id => async (dispatch, getState) => {
  if (id) {
    let person = getPersonById(id, getState())
    if (!person) {
      await dispatch(fetchPerson(id))
    }
    person = getPersonById(id, getState())
    if (person.children !== []) {
      const children = await Promise.all(person.children.map(id => dispatch(getChildren(id))))
      return {
        name: person._id,
        children
      }
    }
    return {
      name: person._id,
      children: []
    }
  }
  return null
}
