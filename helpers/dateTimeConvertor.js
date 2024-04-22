export const dateTimeConvertor = (date) => {
  let tempDate = new Date();
  date =
    tempDate.getFullYear() +
    "-" +
    tempDate.getMonth() +
    "-" +
    tempDate.getDate() +
    " " +
    date +
    ":00";
  return date;
};
