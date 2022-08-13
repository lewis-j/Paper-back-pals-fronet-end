const differenceFromToday = (date) => {
  const _date = new Date(date);
  const today = new Date();
  const diffInMiliseconds = Math.abs(today.getTime() - _date.getTime());

  return {
    seconds: Math.floor(diffInMiliseconds / 1000),
    minutes: Math.floor(diffInMiliseconds / (1000 * 60)),
    hours: diffInMiliseconds / (1000 * 3600),
    days: diffInMiliseconds / (1000 * 3600 * 24),
  };
};
export const getTimeFromToday = (date) => {
  console.log("getTimeFromToday", differenceFromToday(date));
  const { seconds, minutes, hours, days } = differenceFromToday(date);

  if (seconds < 60) return `${Math.floor(seconds)} seconds ago`;
  if (minutes < 60) return `${Math.floor(minutes)} minutes ago`;
  if (hours < 24) return `${Math.floor(hours)} hours ago`;
  if (days < 7) return `${Math.floor(days)} days ago`;

  const weeks = days / 7;
  if (weeks <= 4) return `${Math.floor(weeks)} weeks ago`;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);

  //   if (Math.floor(dayDiff) < 1) Math.floor(dayDiff * 24).toString();
  //   let format = {
  //     month: "short",
  //     day: "numeric",
  //   };
  //   if (Math.floor(dayDiff) < 7) {
  //     format = {
  //       weekday: "short",
  //     };
  //   }
  //   return new Intl.DateTimeFormat("en", format).format(created);
};
