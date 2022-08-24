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