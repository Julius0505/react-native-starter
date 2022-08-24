import axios from "axios"

export const addSubscribe = (id: string): Promise<any> =>
  axios.get(`https://podcasts.valurank.com/api/add/podcasts/${id}`, {
    headers: {
      Authorization: 'ApiKey UdEtwyaP33w_uJ069KNcbZqaZN8WfWpLANueVQi9Klc'
    }
  })
