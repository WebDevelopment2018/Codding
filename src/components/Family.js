import React from "react"
import "../styles/common.scss"
import Person from "./Person"
import "../styles/Family.scss"

const Family = ({ coordinates, activeId }) => (
  <div className="Family">
    {coordinates.map((person, i) => <Person person={person} activeId={activeId} key={i} />)}
  </div>
)

export default Family
