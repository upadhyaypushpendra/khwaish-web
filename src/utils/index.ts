const subMinutes = function (dt: Date, minutes: number) {
  return new Date(dt.getTime() - minutes * 60000);
};

export { subMinutes };
