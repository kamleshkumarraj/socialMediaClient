import {toast} from 'react-toastify'

export const updateToast = ({toastId , message , type}) => {
    toast.update(toastId , {
        type : type,
        render : message,
        isLoading : false,
        autoClose : 1500
    })
}