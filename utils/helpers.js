module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    const currentDate = new Date(date);
    return currentDate.toLocaleDateString();
  }
};
