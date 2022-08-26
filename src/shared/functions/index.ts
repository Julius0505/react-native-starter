import AsyncStorage  from '@react-native-async-storage/async-storage';

export const handleLongText = (str: string, max: number): string => {
    const wordList = str.split(' ')
    const temp = wordList
      .map((word) => (word.length > 17 ? word.substring(0, 15) + '...' : word))
      .join(' ')
    if (temp.length < max) return temp
    else return temp.substring(0, max) + ' ...'
  }

export const handleLongString = (str: string, max: number): string => {
    if (str.length < max) return str
    else return str.substring(0, max) + ' ...'
}

export const handleMaxWordCount = (str: string, max: number): string => {
    let result = str
    const headlineWords = str.split(' ')
  
    if (headlineWords.length > max) {
      result = headlineWords.splice(0, max).join(' ')
      result += '...'
    }
    return result
}

export const stripHTML = (str: string) => str.replace(/<(.|\n)*?>/g, '')


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
