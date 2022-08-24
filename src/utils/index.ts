import AsyncStorage  from '@react-native-async-storage/async-storage';

export const capitalizeFirstLetter = (str: string) => {
  return str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};


export const setExpLocalData = async (key: string, data: any, exp: number) => {
  await AsyncStorage.setItem(
    key,
    JSON.stringify({
      data,
      expiresOn: Date.now() + exp // 1month in ms
    })
  )
}

export const getExpLocalData = async (key: string): Promise<any | null> => {
  const localData = await AsyncStorage.getItem(key)
  if (!localData) return null
  const parsedData = JSON.parse(localData)
  if (!parsedData) return null

  const expiresOn = parsedData.expiresOn

  if (Date.now() > expiresOn) return null
  return parsedData.data
}
