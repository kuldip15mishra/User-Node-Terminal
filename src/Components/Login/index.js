import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import '../../css/index.css';
import './index.css';
import axios from 'axios';
import {GetFormattedDate,GetFormattedTime} from '../../Common/logger';
import {SERVER_URL} from '../../Constant/config'

export class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            id:'',
            pwd:'',
            current:'',
            data:'login',
            redirect:false
        }
    }

    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/home' />
        }
      }
    onHandleLogin(){
        this.checkLogin();        
    }
    insertLog(id){
       
      
          const logData={
                    EmployeeID : id,
                    LastLoginDate:GetFormattedDate(),
                    LastLoginTime:GetFormattedTime(),
                    
          }
          this.loggingAPI(logData);        
            
        
      
    }
    loggingAPI(logdata){
        axios({
            method: 'post',
            url: `${SERVER_URL}auth/updateLastLogin`,
            data: logdata,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                if (response.status === 200) {
                    console.log("❤card❤");
                    console.log("Update Success");
                    console.log(response);
                }
            })
    
            .catch(function (response) {
                console.log(response);
    
            });
    }
    checkLogin(){
        var credentials ={
            EmployeeID :this.state.id,
            Password:this.state.pwd
        }
        var self= this;
        axios({
            method: 'post',
            url: `${SERVER_URL}auth/authenticate`,
            data: credentials,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                if (response.status === 200) {
                    if(response.data && response.data.length >0){
                        if(response.data[0]['count(1)'] === 1){
                            self.insertLog(self.state.id);
                            localStorage.setItem('userid', self.state.id);
                            self.setState({
                                redirect: true
                              })
                        }else{
                            alert('Invalid User');
                        }
                    }
                     
                }
            })
            .catch(function (response) {
                console.log(response);
                return
            });
    }

    render() {
        return(
            <div className="container-view">
 {this.renderRedirect()}
                <img className="header-img imgResponsive" src="header.png" alt="passenger" /><br/>
                <input name="id" value={this.state.id} onChange={this.handleChange.bind(this)} className="input-login-view" placeholder="Employee ID"/><br/>
                <input type="password" name="pwd" value={this.state.pwd} onChange={this.handleChange.bind(this)} className="input-login-view" placeholder="Password"/><br/>
                <span style={{fontSize:11,float:'right',marginRight:10,cursor:'pointer'}}>Forget password?</span><br/>
                <Link to={this.state.current}><button onClick={this.onHandleLogin.bind(this)} className="login-button">{this.state.data}</button></Link>

                <span style={{position:'absolute',bottom:10,left:10}}>Copyright @ Muflar Technologies Private Limited 2018</span>
            </div>
        );
    }
}
