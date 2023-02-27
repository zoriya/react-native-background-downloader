import Toast from 'react-native-root-toast';

export const uuid = () => Math.random().toString(36).substring(2, 6);
export const toast = (message, duration = 750, position = 120) => {
  Toast.show(message, {duration, position});
};
