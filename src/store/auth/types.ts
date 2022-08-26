export interface AuthState {
  loading: boolean
  error: boolean | string
  success: boolean | string
  access_token: string | null
  refresh_token: string | null
  expires_in: number | null
  session: string | null
  id: string | null
  username: string | null
  role: string | null
  rememberMe: boolean
}

export enum AuthError {
  USERNAME_EXISTS = 'USERNAME_EXISTS',
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  NOT_FOUND = 'NOT_FOUND',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  EMAIL_NOT_CONFIRMED = 'EMAIL_NOT_CONFIRMED'
}

export interface AuthReturnHook extends AuthState {
  setError: (error: string | boolean) => void
  setSuccess: (success: string | boolean) => void
  login: (data: LoginData) => void
  register: (data: RegisterData) => void
  changePassword: (data: ChangePasswordData) => void
  logout: () => void
  forgotPassword: (email: string) => void
  initPasswordReset: (email: string) => void
}

export interface SignInResponse {
  access_token?: string
  refresh_token?: string
  expires_in?: number
}

export interface AuthResponse {
  // eslint-disable-next-line
  result?: any
  error?: AuthError
}

export interface AuthStorage {
  access_token: string
  refresh_token: string
  expires_in: number
  rememberMe: boolean
  session?: string
}

export interface LoginData {
  username: string
  password: string
  rememberMe: boolean
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

export interface ChangePasswordData {
  password: string
  token: string
}

export interface ConfirmPasswordResetData {
  token: string
  password: string
}
