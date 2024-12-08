import Swal, { SweetAlertIcon } from 'sweetalert2';
export default class Toast {
  static showToast(message: string, type: SweetAlertIcon) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: type,
      title: message,
    });
  }
  static showAlert(message: string, title: string, type: SweetAlertIcon) {
    Swal.fire({
      icon: type,
      title: title,
      text: message,
    });
  }
}
