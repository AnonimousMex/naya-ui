import React from "react";
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from "react-native";
import BlueTopBar from "@/components/BlueTopBar";
import PersonCard from "@/components/PersonCard";
import { IMAGES } from "@/constants/images";

const title = "¡Hola, Fernanda!";
const description = "Dentro de esta sección podrás dar un vistazo a los terapeutas que están disponibles en nuestra app";

const therapists = [
  { name: "Hilary Arroyo Martinez", avatar: IMAGES.DEFAULT_WOMAN_THERAPIST, circleColor: "#C8B8B4" },
  { name: "Francisco Rivera Rodriguez", avatar: IMAGES.DEFAULT_WOMAN_THERAPIST, circleColor: "#F9D7B5" },
  { name: "José Antonio Cisneros", avatar: IMAGES.DEFAULT_WOMAN_THERAPIST, circleColor: "#D6E6F2" },
  { name: "Alejandra Cisneros Pascual", avatar: IMAGES.DEFAULT_WOMAN_THERAPIST, circleColor: "#BEE3DB" },
  { name: "María Fernanda López", avatar: IMAGES.DEFAULT_WOMAN_THERAPIST, circleColor: "#F7CAC9" },
  { name: "Carlos Alberto Gómez", avatar: IMAGES.DEFAULT_WOMAN_THERAPIST, circleColor: "#B5EAD7" },
  { name: "Lucía Hernández Torres", avatar: IMAGES.DEFAULT_WOMAN_THERAPIST, circleColor: "#C7CEEA" },
];

const cardMargin = 8;
const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const containerPadding = 40;
const cardWidth = (screenWidth - containerPadding - cardMargin * (numColumns + 1)) / numColumns;

const TherapistHome = () => {
  return (
    <View className="flex-1 bg-pink-200">
      <BlueTopBar
        title={title}
        description={description}
      />
      <View className="px-5">
        <View className="flex-row justify-between items-center mb-2 mt-8">
          <Text className="text-brown-800 font-bold text-lg font-UrbanistBold">
            Terapeutas disponibles
          </Text>
          <TouchableOpacity>
            <Text className="text-orange-400 font-bold text-sm font-UrbanistBold">
              Ver más
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-5 flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <View className="flex-row flex-wrap justify-between">
            {therapists.map((p) => (
              <PersonCard
                key={p.name}
                name={p.name}
                avatar={p.avatar}
                width={cardWidth}
                circleColor={p.circleColor}
                type="therapist"
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default TherapistHome;
