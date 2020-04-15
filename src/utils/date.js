import 'moment/locale/nb';
import moment from 'moment';

export const getDigitalTime = dateObject => {
  return moment(dateObject)
    .locale('nb')
    .format('LT');
};

export default getDigitalTime;
