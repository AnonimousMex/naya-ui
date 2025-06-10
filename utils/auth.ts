
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string,
) => {
  return password === confirmPassword;
};

