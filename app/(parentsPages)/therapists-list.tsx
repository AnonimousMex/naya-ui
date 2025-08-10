import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import BlueTopBar from "@/components/BlueTopBar";
import PersonCard from "@/components/PersonCard";
import { IMAGES } from "@/constants/images";
import { useTherapists } from "@/hooks/useTherapists";
import { useUserInfo } from "@/hooks/useUserInfo";

const description =
  "Dentro de esta sección podrás dar un vistazo a los terapeutas que están disponibles en nuestra app";

const cardMargin = 8;
const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const containerPadding = 40;
const cardWidth =
  (screenWidth - containerPadding - cardMargin * (numColumns + 1)) / numColumns;

const TherapistHome = () => {
  const { therapists, loading, error, refetch } = useTherapists();
  const { userInfo } = useUserInfo();

  const title = `¡Hola, ${userInfo?.name || 'Usuario'}!`;

  if (loading) {
    return (
      <View className="flex-1 bg-pink-200">
        <BlueTopBar title={title} description={description} />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="text-gray-600 mt-4 font-UrbanistRegular">
            Cargando terapeutas...
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-pink-200">
        <BlueTopBar title={title} description={description} />
        <View className="flex-1 justify-center items-center px-8">
          <Text className="text-red-500 text-center mb-4 font-UrbanistRegular">
            {error}
          </Text>
          <TouchableOpacity
            className="bg-blue-500 px-6 py-3 rounded-lg"
            onPress={refetch}
          >
            <Text className="text-white font-UrbanistBold">
              Intentar de nuevo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-pink-200">
      <BlueTopBar title={title} description={description} />
      <View className="px-5">
        <View className="flex-row justify-between items-center mb-2 mt-8">
          <Text className="text-brown-800 font-bold text-lg font-UrbanistBold">
            Terapeutas disponibles ({therapists.length})
          </Text>
          <TouchableOpacity onPress={refetch}>
            <Text className="text-orange-400 font-bold text-sm font-UrbanistBold">
              Actualizar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-5 flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {therapists.length === 0 ? (
            <View className="flex-1 justify-center items-center mt-20">
              <Text className="text-gray-600 text-center font-UrbanistRegular">
                No hay terapeutas disponibles en este momento
              </Text>
            </View>
          ) : (
            <View className="flex-row flex-wrap justify-between">
              {therapists.map((therapist) => (
                <PersonCard
                  key={therapist.therapist_id}
                  id={therapist.therapist_id}
                  name={therapist.name}
                  avatar={therapist.avatar || IMAGES.DEFAULT_WOMAN_THERAPIST}
                  width={cardWidth}
                  circleColor={therapist.circleColor || "#C8B8B4"}
                  type="therapist"
                />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default TherapistHome;
