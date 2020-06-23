import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const confirmation = (title, message, handleDelete) => {
  confirmAlert({
    title,
    message,
    buttons: [
      {
        label: 'Cancel',
      },
      {
        label: 'OK',
        onClick: () => handleDelete(),
      },
    ],
  });
};

export const alert = (message) => {
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
