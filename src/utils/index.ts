const subMinutes = function (dt: Date, minutes: number) {
  return new Date(dt.getTime() - minutes * 60000);
};

const validatePassword = (password: string) => {
  return true;
  // let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  // return regex.test(password);
};

export { subMinutes, validatePassword };
