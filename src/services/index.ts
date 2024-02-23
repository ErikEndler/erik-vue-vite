import axios from 'axios'
import SimpleFormService from './simpleFormService'

const API_URL = 'https://my-json-server.typicode.com/ErikEndler/json-server'

const httpClient = axios.create({
  baseURL: API_URL
})

export default {
  simpleForm: SimpleFormService(httpClient)
}
