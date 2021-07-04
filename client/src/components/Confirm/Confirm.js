import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const confirmation = (title, message, callback) => {
  confirmAlert({
    title,
    message,
    buttons: [
      {
        label: 'Cancel',
      },
      {
        label: 'OK',
        onClick: () => callback(),
      },
    ],
  });
};

export const customAlert = (message) => {
  confirmAlert({
    title: 'DemGames',
    message,
    buttons: [
      {
        label: 'OK',
      },
    ],
  });
};
