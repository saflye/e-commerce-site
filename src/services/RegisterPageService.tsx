import { AxiosResponse } from "axios";
import axios from "../config/AxiosConfig";
import { UserType } from "../types/Types";

class RegisterPageServices {
    register(newUser:UserType) :Promise<any>{
        return new Promise((resolve: any, reject: any) => {
            axios.post("/users",newUser)
            .then((response:AxiosResponse<any, any>)=>resolve(response.data))
            .catch((error:any)=>reject(error));
        })
    }
}

export default new RegisterPageServices();