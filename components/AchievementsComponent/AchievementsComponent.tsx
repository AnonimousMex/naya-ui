import { View } from "react-native";
import { AchievementDescription } from "@/components/AchievementDescription";
import { IMAGES } from "@/constants/images";

const AchievementsComponent = () => {
  const achievements = [
    { description: "Completaste 3 juegos diarios por 3 días" },
    { description: "Ganaste 5 partidas seguidas" },
    { description: "Primer lugar en el ranking" },
    { description: "Alcanzaste nivel 10" },
    { description: "Completaste todos los niveles básicos" },
    { description: "Invitó a 3 amigos" },
    { description: "Jugó 7 días consecutivos" },
    { description: "Obtenido 1000 puntos" },
    { description: "Derrotó a 50 enemigos" },
    { description: "Coleccionó todas las monedas" },
    { description: "Terminó el juego en modo difícil" },
    { description: "Ayudó a 5 jugadores nuevos" },
    { description: "Logró un combo de 15x" },
    { description: "Descubrió todos los secretos" },
    { description: "Completó el desafío semanal" },
  ];

  const bgColors = [
    "#DEE3FF",
    "#DACCCC",
    "#FCF6F1",
    "#D1DDD0",
    "#EFDDEF",
    "#E8D9A9",
  ] as const;
  const images: (keyof typeof IMAGES)[] = ["ROCKET_1", "ROCKET_2"];

  return (
    <View className="bg-white px-7 pt-14 pb-10 rounded-t-[50px] rounded-b-[50px]">
      {achievements.map((achievement, index) => (
        <AchievementDescription
          key={index}
          bgColor={bgColors[index % bgColors.length]}
          image={images[index % images.length]}
          description={achievement.description}
          className="mb-4"
        />
      ))}
    </View>
  );
};

export default AchievementsComponent;
