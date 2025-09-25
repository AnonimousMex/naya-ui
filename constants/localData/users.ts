// Datos de usuarios locales basados en la base de datos
export const LOCAL_USERS = [
  {
    id: "57223778-cd2e-4b99-8d1a-46465cda5e24",
    name: "Daniel",
    email: "daniel@gmail.com",
    password: "Hola123*",
    active: true,
    user_type: "PATIENT" as const,
    patient_id: "702d987f-5e26-4b67-8254-129b6d7afaf0",
    animal_id: "550e8400-e29b-41d4-a716-446655440004", // Bambu - Panda
  },
  {
    id: "9493bc02-f84e-4187-82ea-f7a369306a12",
    name: "Fernanda Medina",
    email: "fernanda@gmail.com",
    password: "Hola123*",
    active: true,
    user_type: "THERAPIST" as const,
    patient_id: null,
    animal_id: null,
  },
  {
    id: "fb7dd085-7ffd-41f3-8e15-00e82fc61485",
    name: "Hugo",
    email: "hugo@gmail.com",
    password: "Hola123*",
    active: true,
    user_type: "PATIENT" as const,
    patient_id: "69168a51-208d-4efd-99f8-fb0b0b78e7e2",
    animal_id: "550e8400-e29b-41d4-a716-446655440010", // Mish - Cat
  },
];