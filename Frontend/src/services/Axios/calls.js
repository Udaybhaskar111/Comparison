import axios from "axios";
export const request=async(method,url,data)=>{
    try{
        const res=await axios({method,url,data})
        console.log(res.data)
        return res.data;

    }
    catch(error){
        console.log(error)
    }
}
