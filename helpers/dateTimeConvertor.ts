// convert time to timestamp
export const dateTimeConvertor = (date: string) => {
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
