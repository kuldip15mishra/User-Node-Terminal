import axios from 'axios';
import {SERVER_URL} from '../Constant/config'
import * as moment from 'moment';
export const logging =(logdata)=>{
   return axios({
        method: 'post',
        url: `${SERVER_URL}log/insertLog`,
        data: logdata,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
        .then(function (response) {
            if (response.status === 200) {
                console.log("❤card❤");
                console.log("Update Success");
                console.log(response);
                return response;
            }
        })

        .catch(function (response) {
            console.log(response);

        });
}

export const GetFormattedDate=()=> {
    var d = new Date();

    d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2);

    return d;
}

export const GetFormattedTime=()=> {
   // var todayTime = new Date();
    let currentDate = moment().format('hh:mm')
    return currentDate;
}