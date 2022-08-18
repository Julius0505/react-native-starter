export interface User {
  username: string
  email: string
  password: string
  avatar_url: string
}

export interface UpdateUserRequestData {
  current_password?: string
  new_password?: string
  username?: string
  email?: string
  redirect_to?: string
}
export interface UserState {
  loading: boolean
  error: string | boolean
  success: string | boolean
  user: User | null
}

export interface UserReturnHook extends UserState {
  setError: (error: string | boolean) => void
  setSuccess: (success: string | boolean) => void
  updateUser: (data: Partial<UpdateUserRequestData>) => void
  updateAvatar: (avatar: any) => void
  getUser: () => void
}
