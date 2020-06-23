import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default (title, message, handleDelete) => {
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
