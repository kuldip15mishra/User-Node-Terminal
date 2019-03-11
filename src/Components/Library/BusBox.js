import React from 'react';
import {BusContent} from "./BusContent";
import {SERVER_URL} from "../../Constant/config";
import './index.css';
import axios from 'axios';

export class BusBox extends React.Component {

    constructor(){
        super();
        this.state={
            stops:[],
            routes:[],
            changebusroutesd:[],
            changetransfermonitor1:[],
            changetransfermonitor2:[],
            changeDriverID:[],
            changeDriverMonitor:[]
        }
    }

    componentDidMount(){

        axios.get(SERVER_URL + `routefare/`)
            .then(res => {
                const routes = res.data;
                this.setState({ routes });
            });

        axios.get(SERVER_URL + `busstops/`)
            .then(res => {
                const stops = res.data;
                this.setState({ stops });
            });

            axios.get(SERVER_URL + `busrouteSD/getAll`)
            .then(res => {
                const changebusroutesd = res.data;
                console.log(changebusroutesd)
                this.setState({ changebusroutesd });
            });
            axios.get(SERVER_URL + `driverid`)
            .then(res => {
                const changeDriverID = res.data;
                this.setState({ changeDriverID });
            });
            axios.get(SERVER_URL + `drivermonitor`)
            .then(res => {
                const changeDriverMonitor = res.data;
                this.setState({ changeDriverMonitor });
            });
    }

    render() {
        return(

            <div className="input-view1">
                <BusContent
                    stops={this.state.stops}
                    routes={this.state.routes}
                    changebusroutesd={this.state.changebusroutesd}
                    changeDriverID={this.state.changeDriverID}
                    changeDriverMonitor={this.state.changeDriverMonitor}
                />
            </div>
        );
    }
}
