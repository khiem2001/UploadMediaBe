export const getCurrentTimeStamp = () => {
  const currentTimestampInMilliseconds = Date.now();
  return Math.floor(currentTimestampInMilliseconds / 1000);
};
