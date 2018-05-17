const API_ENDPOINT = "/api";

export const fetchUser = async id => {
  const response = await fetch(`${API_ENDPOINT}/persons/${id}`)
  return response.json()
}

export const editUser = async (id, data) => {
  console.log("edited id:", id)
  const response = await fetch(`${API_ENDPOINT}/persons/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const addUser = async data => {
  const response = await fetch(`${API_ENDPOINT}/persons`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data)
  })
  return response.json()
}
