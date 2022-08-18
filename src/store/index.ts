import { configureStore, EnhancedStore, Middleware } from '@reduxjs/toolkit'

import rootReducer from './reducers'
import { Actions, RootState } from './types'

const configureAppStore = (
  preloadedState?: RootState
): EnhancedStore<RootState, Actions> => {
  const devMiddlewares: Middleware[] = []

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(devMiddlewares),
    preloadedState,
    enhancers: []
  })

  return store
}

export const store = configureAppStore()
