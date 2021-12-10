export const extractYearFromYyyyMmDd = (date) => {
  return date.substr(0, 4);
};

export const convertMinsToHours = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let hoursStr = "";
  switch (hours) {
    case 0:
      hoursStr = "";
      break;
    case 1:
      hoursStr = hours.toString() + " hr ";
      break;
    default:
      hoursStr = hours.toString() + " hrs ";
      break;
  }

  let minutesStr = "";
  switch (minutes) {
    case 0:
      minutesStr = "";
      break;
    case 1:
      minutesStr = minutes.toString() + " min";
      break;
    default:
      minutesStr = minutes.toString() + " mins";
      break;
  }

  const result = hoursStr + minutesStr;
  return result;
};
