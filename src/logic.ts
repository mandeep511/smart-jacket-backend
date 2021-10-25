export const sendMessage = (message: string) => {
  console.log(message);
};

export const heartRateCheck = (currHeartRate: number) => {
  if (currHeartRate > 100) {
    sendMessage("Heart rate is too high");
  }
  if (currHeartRate < 60) {
    sendMessage("Heart rate is too low");
  }
};
