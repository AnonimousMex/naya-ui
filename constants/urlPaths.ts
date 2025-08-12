export const URL_PATHS = {
  AUTH: {
    VERIFY_CODE: "/auth/verification-code",
    LOGIN: "/auth/login",
    SING_UP: "/patients",
    CONNECTION_PATIENT_WITH_THERAPIST: "/auth/connect-patient-with-therapist",
    CHANGE_PASSWORD: "/auth/password-change-request",
    DAILY_MESSAGE: "/auth/daily",
    SELECT_PROFILE: "/auth/select-profile",
    RESEND_VERIFICATION_CODE: "/auth/resend-verification-code",
  },
  ANIMAL: {
    LIST_ANIMALS: "/animals",
  },
  THERAPIST: {
    SCHEDULE_APPOINTMENT: "/schedule-appointment",
    RESCHEDULE_APPOINTMENT: "/reschedule-appointment",
    LIST_APPOINTMENTS: "/list-appointments",
    CANCEL_APPOINTMENT: "/cancel-appointment",
    COMPLETE_APPOINTMENT: "/complete-appointment",
    LIST_PATIENTS: "/therapist/list-patients",
    CLOSE_CONNETION: "/disconnect-patient",
  },
  PARENTS: {
    LIST_THERAPISTS: "/parent/list-therapists",
  },
  GAMES: {
    GET_MEMOCIONES_PAIRS: "/pairs",
    GET_Y_ESE_RUIDO_SOUNDS: "/sounds",
    GAME_LIST: "/games",
    GET_DETECTIVE: "/detective/game"
  },
  ENERGIES: {
    GET_ENERGY: "/energy/current_energies",
    CONSUME_ENERGY: "/energy/consume",
  },
  TEST: {
    INIT_TEST: "/test/init-test",
    SAVE_ANSWER: "/test/send-answer",
    LIST_TESTS: "/test/list-test"
  },
  TEST_THERAPIST:{
    TEST_INFO: "/test/test-details",
    TEST_RESULTS: "/test/list-answers",
    TEST_STATICS: "/test/percentage-answers"
  },
};
