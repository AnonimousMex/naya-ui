import { IMAGES } from "@/constants/images";

export type ProfileAvatar = {
  key: string;
  name: string;
  description: string;
  image: any;
  color: string;
};

export const PROFILE_AVATARS: ProfileAvatar[] = [
  {
    key: "ajolito",
    name: "Ajolito",
    description: "Vivo en los lagos de México",
    image: IMAGES.HAPPY_AXOLOTL_HEAD,
    color: "#E94B5A",
  },
  {
    key: "leono",
    name: "Leono",
    description: "Reino en la sabana",
    image: IMAGES.HAPPY_LION_HEAD,
    color: "#F7B32B",
  },
  {
    key: "mish",
    name: "Mish",
    description: "Amo las aventuras",
    image: IMAGES.HAPPY_CAT_HEAD,
    color: "#7B6CF6",
  },
  {
    key: "bambu",
    name: "Bambu",
    description: "Me gusta el bambú",
    image: IMAGES.HAPPY_PANDA_HEAD,
    color: "#2EC4B6",
  },
  {
    key: "bony",
    name: "Bony",
    description: "Salto muy alto",
    image: IMAGES.HAPPY_BUNNY_HEAD,
    color: "#A3C9F9",
  },
];
