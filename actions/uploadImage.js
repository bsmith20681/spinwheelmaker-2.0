import axios from axios;

export const uploadImage = (file) => {
    axios.post(`${NEXT_PUBLIC_BACKEND_URL}/api/v1/imageupload`, {
        //data goes here
    }.then(data => {
        toast.success("image upload was successful", {
            position: toast.POSITION.TOP_RIGHT
        })
    }).catch(err => {
        toast.error("something went wrong", {
            position: toast.POSITION.TOP_RIGHT
        })
    }))
}
