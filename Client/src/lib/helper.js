import toast from "react-hot-toast";

export const makeToast = (text)=>{
    toast.success(text, {
        style:{
            borderRadius:"4px",
            background:"green",
            color:"#fff",
            fontSize:"18px",
        }
    })
}

export const makeToastError = (text)=>{
    toast.error(text, {
        style:{
            borderRadius:"4px",
            background:"green",
            color:"#fff",
            fontSize:"18px",
        }
    })
}

export const makeToastWarning = (text)=>{
    toast(text, {
        style:{
            borderRadius:"4px",
            background:"green",
            color:"#fff",
            fontSize:"18px",
        }
    })
}