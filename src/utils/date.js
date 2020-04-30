import 'moment/locale/nb';
import moment from 'moment';

export const getDigitalTime = dateObject => {
  return moment(dateObject)
    .locale('nb')
    .format('LT');
};

export const getDuration = seconds => {
  return moment
    .duration(seconds)
    .locale('en')
    .humanize();
};
