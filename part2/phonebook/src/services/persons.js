import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl)

const create = (newPerson) => axios.post(baseUrl, newPerson)

const update = (id, changedPerson) =>
  axios.put(`${baseUrl}/${id}`, changedPerson)

const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`)

export default {
  getAll,
  create,
  update,
  remove
}