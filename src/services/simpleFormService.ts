import type { SimpleForm } from '@/types/Interfaces'
import { AxiosError, type AxiosInstance } from 'axios'

export async function getAll(httpClient: AxiosInstance): Promise<{
  data: SimpleForm[]
  errors: AxiosError | null
}> {
  let errors = null
  let data: SimpleForm[] = []
  await httpClient
    .get('simpleForm')
    .then((response) => {
      data = response.data
    })
    .catch((e) => {
      errors = e
    })
  return { data, errors }
}
export async function getById(
  httpClient: AxiosInstance,
  id: number
): Promise<{
  data: SimpleForm[]
  errors: AxiosError | null
}> {
  let errors = null
  let data: SimpleForm[] = []
  await httpClient
    .get(`simpleForm/${id}`)
    .then((response) => {
      data = response.data
    })
    .catch((e) => {
      errors = e
    })
  return { data, errors }
}
export async function post(
  httpClient: AxiosInstance,
  simpleForm: SimpleForm
): Promise<{
  data: SimpleForm | null
  errors: AxiosError | null
}> {
  let errors = null
  let data = null
  await httpClient
    .post('simpleForm', simpleForm)
    .then((response) => {
      data = response.data
    })
    .catch((e) => {
      errors = e
    })
  return { data, errors }
}

export default (httpClient: AxiosInstance) => ({
  findAll: async () => {
    const { data, errors } = await getAll(httpClient)
    return { data, errors }
  },
  findById: async (id: number) => {
    const { data, errors } = await getById(httpClient, id)
    return { data, errors }
  },
  save: async (simpleForm: SimpleForm) => {
    const { data, errors } = await post(httpClient, simpleForm)
    return { data, errors }
  }
})
