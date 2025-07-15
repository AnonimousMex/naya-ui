import { ImageSourcePropType } from 'react-native'

export const useColorAnimal = (animalImage: ImageSourcePropType) => {
  //this file is provicional
  if(animalImage === 38){
    return "bg-pink-100"
  }else if(animalImage === 41){
    return "bg-blue-200"
  }else if(animalImage === 39){
    return "bg-brown-20"
  }else if(animalImage === 40){
    return "bg-orange-200"
  }else if(animalImage === 43){
    return "bg-gray-300"
  }
  
  return "bg-pink-100"
}
