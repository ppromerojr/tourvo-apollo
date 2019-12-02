import { create } from 'apisauce'

export const api = create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: 'application/json'
  }
})

// api.addAsyncRequestTransform(request => async () => {
//   const token = await localForage.getItem("token")
//   if (token) {
//     request.headers["Authorization"] = `Bearer ${token}`
//   }
// })

export const requests = {
  get: async url => {
    return await api.get(url)
  },
  post: async (url, data) => {
    api.setHeaders({
      'Content-Type': 'application/json'
    })

    return await api.post(url, data)
  },
  put: async (url, data) => {
    api.setHeaders({
      'Content-Type': 'application/json'
    })

    return await api.put(url, data)
  },
  delete: async url => {
    return await api.delete(url)
  },
  authorize: async (url, data) => {
    api.setHeaders({
      'Content-Type': 'application/json'
    })

    // console.log("api", api, url, data)
    return await api.post(url, data)
  },
  upload: async (url, data) => {
    api.setHeaders({
      'Content-Type': 'multipart/form-data'
    })

    return await api.post(url, data)
  }
}

export const Tags = {
  getPopularTags: () => requests.get('trending-tags'),
  countView: tagId => requests.get(`countview/${tagId}`)
}
