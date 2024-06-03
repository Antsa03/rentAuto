import Swal from "sweetalert2";

type IconType = "success" | "error" | "warning" | "info" | "question";

export const showSwal = (title: string, text: string, icon: IconType) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    customClass: "custom-swal",
    heightAuto: false,
  });
};

export const showSwalWithoutConfirm = (
  title: string,
  text: string,
  icon: IconType
) => {
  Swal.fire({
    title: title,
    icon: icon,
    text: text,
    timer: 1000,
    showConfirmButton: false,
    heightAuto: false,
    padding: 40,
    customClass: "custom-swal",
  });
};

export const showToast = (title: string, text: string, icon: IconType) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: true,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    title: title,
    text: text,
    icon: icon,
  });
};
