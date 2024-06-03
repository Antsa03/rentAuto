export default function isEmailValid(email: string) {
  const regex = /^[a-zA-Z0-9.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regex.test(email);
}
