import { AxiosError } from 'axios'
import { AuthError } from 'store/auth/types'

export const accept20x = (status: number): boolean =>
  /20[0-9]/.test(String(status))

export const accept5xx = (status: number): boolean =>
  /5[0-9][0-9]/.test(String(status))

export const isNetWorkError = (error: AxiosError): boolean =>
  !!error.isAxiosError && !error.response

export const getErrorMessage = (
  // eslint-disable-next-line
  error: any,
  getDataError = false
): string | undefined => {
  console.log('err=>', error.response.data)
  if (error && error.response) {
    if (!getDataError) return error.response.data?.error

    let errorMessage = ''

    const dataErrors: string[] | undefined = error.response.data?.data?.errors

    if (dataErrors?.length) {
      errorMessage = `${
        dataErrors[0].charAt(0).toUpperCase() +
        dataErrors[0].substring(1).toLowerCase()
      }`
    }

    if (errorMessage === '') errorMessage = error.response.data?.message

    return errorMessage
  }

  if (error.reason) {
    return error.reason?.message
  }

  return undefined
}

export const authErrorHandler = (
  errMsg: string | boolean
): string | boolean => {
  return errMsg === AuthError.NOT_FOUND
    ? 'Username is incorrect'
    : errMsg === AuthError.EMAIL_EXISTS
    ? 'Email is already existed'
    : errMsg === AuthError.EMAIL_NOT_CONFIRMED
    ? 'Email is not verified yet'
    : errMsg === AuthError.INVALID_PASSWORD
    ? 'Password is incorrect'
    : errMsg === AuthError.USERNAME_EXISTS
    ? 'Username is already existed'
    : typeof errMsg === 'boolean'
    ? errMsg
    : 'Unknown Error'
}
