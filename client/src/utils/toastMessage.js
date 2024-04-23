import { toast } from "react-toastify";

import { Toast } from "../components/Toast";

export const toastProps = {
  autoClose: 3000,
  position: "top-right",
  closeButton: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: false,
  newestOnTop: true,
  limit: 3,
};

export const toastMessage = (message, type = "success", position = "bottom-left") => {
  toast.clearWaitingQueue();

  return toast(Toast(message, type), {
    ...toastProps,
    type,
    position,
  });
};
