import axios from "axios";

export const loginUser = async ({data , method , url , contentType}) => {
    const options = {
        method ,
        url ,
        data ,
        'Content-Type' : contentType || 'application/json',
        withCredentials : true
    }
    try {
        const {data} = await axios(options);
        console.log(data)
        return {success : data?.success , data : data?.data , message : data?.message};
    } catch (error) {
        return {success : false , message : error};
    }
}