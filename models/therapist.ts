export type TPatient = {
  patient_id: string;
  name: string;
  animal_id: string | null;
  avatar?: string;
  circleColor?: string;
};

export type TSpecialty = {
  name: string;
  description?: string;
};

export type TTherapist = {
  therapist_id: string;
  name: string;
  avatar?: string;
  circleColor?: string; 
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  specialties?: TSpecialty[];
  experiences?: Array<{ 
    title: string; 
    years: string; 
    description: string 
  }>;
};

export type TListTherapistsResponse = {
  therapists: TTherapist[];
};

export type TCloseConnection = {
  idPatient: string
}