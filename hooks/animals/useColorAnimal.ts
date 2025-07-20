import { IMAGES } from '@/constants/images'
import { ImageSourcePropType } from 'react-native'

export const useColorAnimal = (animalImage: ImageSourcePropType) => {
  //this file is provicional
  if(animalImage === IMAGES.HAPPY_AXOLOTL_HEAD){
    return "bg-pink-100"
  }else if(animalImage === IMAGES.HAPPY_BUNNY_HEAD){
    return "bg-blue-200"
  }else if(animalImage === IMAGES.HAPPY_CAT_HEAD){
    return "bg-brown-20"
  }else if(animalImage === IMAGES.HAPPY_LION_HEAD){
    return "bg-orange-200"
  }else if(animalImage === IMAGES.HAPPY_PANDA_HEAD){
    return "bg-gray-300"
  }
  
  return "bg-pink-100"
}
