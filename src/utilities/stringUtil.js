export const upperFirst = (name) => {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

export const shortenString = (string, length) => {
  const tempString = string.substring(0, length);
  const lastIndex = tempString.lastIndexOf(" ");
  return tempString.substring(0, lastIndex) + "...";
};
