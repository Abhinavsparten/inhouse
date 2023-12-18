import BASE_URL from "./baseurl";
import { commonRequest } from "./commonReq";

//add employee
export const addTeam=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/api/addemployee`,body)
}

//add project
export const addProject=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/api/addprojects`,body)
}



