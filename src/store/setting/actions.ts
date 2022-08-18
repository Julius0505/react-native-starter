import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { COOKIES } from 'enums/cookie.enum'

import {
  createSetting as createSettingApi,
  getSetting as getSettingApi
} from 'http/setting'

const SET_ERROR = 'setting/SET_ERROR'
const SET_SETTING = 'auth/SET_SETTING'
const SET_SUCCESS = 'setting/SET_SUCCESS'
const CREATE_SETTING = 'setting/CREATE_SETTING'
const GET_SETTING = 'setting/GET_SETTING'

export const setError = createAction<string | boolean>(SET_ERROR)

export const setSuccess = createAction<string | boolean>(SET_SUCCESS)

// eslint-disable-next-line
export const createSetting = createAsyncThunk<void, any>(
  CREATE_SETTING,
  async (data) => {
    const setting = await createSettingApi(data)
    return setting
  }
)

export const setSetting = createAction<void>(SET_SETTING)

// eslint-disable-next-line
export const getSetting = createAsyncThunk<any, void>(GET_SETTING, async () => {
  const setting = await getSettingApi(Object.values(COOKIES))
  return setting
})
