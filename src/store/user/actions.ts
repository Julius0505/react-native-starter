import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import {
  updateUser as updateUserApi,
  getUser as getUserApi,
  updateAvatar as updateAvatarApi
} from 'http/user'
import { User } from './types'

const SET_ERROR = 'user/SET_ERROR'
const SET_SUCCESS = 'user/SET_SUCCESS'
const UPDATE_USER = 'user/UPDATE_USER'
const UPDATE_AVATAR = 'user/UPDATE_AVATAR'
const GET_USER = 'user/GET_USER'

export const setError = createAction<string | boolean>(SET_ERROR)

export const setSuccess = createAction<string | boolean>(SET_SUCCESS)

export const updateUser = createAsyncThunk<void, Partial<User>>(
  UPDATE_USER,
  async (data) => {
    await updateUserApi(data)
  }
)
export const updateAvatar = createAsyncThunk<void, File>(
  UPDATE_AVATAR,
  async (avatar, { dispatch }) => {
    await updateAvatarApi(avatar)
    setTimeout(() => {
      dispatch(getUser())
    }, 200)
  }
)

export const getUser = createAsyncThunk<User, void>(GET_USER, async () => {
  const user = await getUserApi()
  return user
})
