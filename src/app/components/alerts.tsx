import Swal from 'sweetalert2';

export const alertSucess = (msg) => {
    Swal.fire({
        title: msg,
        icon: 'success'
    });
};

export const alertError = (msg) => {
    Swal.fire({
        title: msg,
        icon: 'error'
    });
};

export const alertWarning = (msg) => {
    Swal.fire({
        title: msg,
        icon: 'warning'
    });
};