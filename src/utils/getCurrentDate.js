export const getCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`;
  return formattedTime;
};

export const getCurrentDate = () => {
  return new Date().toLocaleDateString();
};
