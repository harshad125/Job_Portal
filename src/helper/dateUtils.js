import moment from 'moment';

const getDateDifferent = (date) => {
  const now = moment();
  const past = moment(date);
  return now.diff(past, 'minutes');
};

export default { getDateDifferent };
