export interface UpdateSettingData {
  key: string
  data: any
}

export interface SettingState {
  loading: boolean
  error: string | boolean
  success: string | boolean
  setting: any | null
}

export interface SettingReturnHook extends SettingState {
  setError: (error: string | boolean) => void
  setSuccess: (success: string | boolean) => void
  setSetting: (setting: any) => void
  createSetting: (data: any) => void
  getSetting: () => void
}
