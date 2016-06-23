/**
 * Created by jonlazarini on 22/06/16.
 */
const toWeekDay = (date) => {
    const weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    const dayStringEng = weekday[date.getDay()];
    return dayStringEng
  };

export default toWeekDay;

