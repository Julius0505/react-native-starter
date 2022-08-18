import { Store } from '@reduxjs/toolkit'
import { AxiosRequestConfig } from 'axios'

import http from './index'
import { RootState } from '../store/types'
import { logout, setAuthSession } from 'store/auth/actions'
import { AuthSession } from 'store/auth/types'
import { setAuthSession as persistAuthSession } from 'store/auth/utils'

export default {
  setup: (store: Store<RootState>): void => {
    const addAuthorizationToken = async (config: AxiosRequestConfig) => {
      const {
        auth: { access_token }
      } = store.getState()

      if (access_token) {
        config.headers = {
          ...(config.headers ?? {}),
          Authorization: `Bearer ${access_token}`
        }
      }

      return config
    }

    http.interceptors.request.use(addAuthorizationToken)

    http.interceptors.response.use(
      (res) => {
        return res
      },
      async (err) => {
        const originalConfig = err.config
        if (originalConfig.url !== '/auth/sign-in' && err.response) {
          // Access Token was expired
          if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true
            const {
              auth: { refresh_token, rememberMe }
            } = store.getState()

            if (refresh_token) {
              try {
                const rs = await http.post('/auth/refresh', {
                  refresh_token
                })
                const {
                  access_token: new_access_token,
                  refresh_token: new_refresh_token,
                  expires_in: new_expire_in
                } = rs.data.result

                const authSession: AuthSession = {
                  access_token: new_access_token,
                  refresh_token: new_refresh_token,
                  rememberMe,
                  expires_in: Date.now() + new_expire_in * 1000
                }
                persistAuthSession(authSession, rememberMe)
                store.dispatch(setAuthSession(authSession))

                return http(originalConfig)
              } catch (_error) {
                store.dispatch(logout())
                return Promise.reject(_error)
              }
            }
          }
        }

        return Promise.reject(err)
      }
    )
  }
}
