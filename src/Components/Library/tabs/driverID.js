import React from 'react';
import {CSVLink} from 'react-csv';
import {Table,Button,Modal} from 'react-bootstrap';
import axios from 'axios';
import '../../../css/index.css'
import {SERVER_URL} from '../../../Constant/config'
import update from "react-addons-update";
import {logging ,GetFormattedDate,GetFormattedTime} from '../../../Common/logger';
export class DriverID extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleHide = this.handleHide.bind(this);

        this.state = {
            new_show: false,
            update_show: false,
            del_show: false,
            data: [],

            new_FirstName:'',
            new_LastName:'',
            new_dID:'',
            new_DOB:'',
            new_Age:'',
            new_Password:'',
            new_CreatedDate:'',
            new_UPdatedDate:'',
            new_Status:'',
            new_rating:'',
        };
    }

    handleHide() {
        this.setState({del_show: false,update_show:false,new_show:false});
    }

    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    insertLog(datalist,id){
       
        if(datalist){
            Object.keys(datalist).map(col=>{
                const logData={
                    TableName : 'reportchangeroute',
                    ColumnName :col,
                    TabelRowid:id,
                    CreateEmployeeID:localStorage.getItem('userid'),
                    CreateDate:GetFormattedDate(),
                    CreateTime:GetFormattedTime(),
                    UpdateEmployeeID:localStorage.getItem('userid'),
                    UpdateDate:GetFormattedDate(),
                    UpdateTime:GetFormattedTime()
                }
        
                logging(logData);
                return null;
            })
        }
      
    }
    componentDidUpdate(prevProps) {

        if (this.props.changeDriverID && this.props.changeDriverID.length > 0 && prevProps.changeDriverID && this.props.changeDriverID !== prevProps.changeDriverID) {

            let newState = update(this.state, {
                data: {
                    $set: this.props.changeDriverID
                }
            });
            this.setState(newState);
        }
    }

    onInsertStop(){

        const InserData =  {

            "UserID": this.state.new_UserID,
            "ReportID": this.state.new_ReportID,
            "Report_Type": this.state.new_Report_Type,
            "Bus_ID": this.state.new_Bus_ID,
            "BusRoute": this.state.new_BusRoute,
            "New_Route": this.state.new_New_Route,
            "TransferBusID": this.state.new_TransferBusID,
            "Report_Date": this.state.new_Report_Date,
            "Status": this.state.new_Status,
            "New_UserID": this.state.new_New_UserID,
        };

        console.log("new_BusID",this.state.new_Status);
        var currentInstance = this;
        axios({
            method: 'post',
            url: `${SERVER_URL}reportchangeroute`,
            data: InserData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    let id = response.data[0].id;
                    currentInstance.insertLog(InserData,id);
                }
            })
            .catch(function (response) {
                console.log(response);
                return
            });

        let newState = update(this.state, {
            data: {
                $push: [InserData]
            }
        });
        this.setState(newState);
        this.setState({new_show:false});
        console.log("❤❤D❤a❤t❤a❤❤", this.state.data);
    }

    render() {
        return (
            <div>
                <Table responsive className="table-view" bordered hover>
                    <thead>
                    <tr className="th-view">
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>DID</th>
                        <th>DOB</th>
                        <th>Age</th>
                        <th>Password</th>
                        <th>CreatedDate</th>
                        <th>UpdatedDate</th>
                        <th>Status</th>
                        <th>rating</th>
                    </tr>
                    </thead>
                   
                </Table>
                <Button bsStyle="info" style={{marginLeft:30}} onClick={()=>this.setState({new_show:true})}>New</Button>
                <Button style={{marginLeft:20}} bsStyle="info"><CSVLink style={{color:'#fff'}} data={this.state.data} >export</CSVLink>
                </Button>
                <Modal
                    show={this.state.new_show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            New Change Route
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <label>FirstName</label>
                        <input type="text" name="new_UserID"
                               value={this.state.new_UserID} onChange={this.handleChange.bind(this)} /><br/>
                        <label>LastName</label>
                        <input type="text" name="new_ReportID" value={this.state.new_ReportID} onChange={this.handleChange.bind(this)}/><br/>
                        <label>dID</label>
                        <input type="text" name="new_Report_Type" value={this.state.new_Report_Type} onChange={this.handleChange.bind(this)}/><br/>
                        <label>DOB</label>
                        <input type="text" name="new_Bus_ID" value={this.state.new_Bus_ID} onChange={this.handleChange.bind(this)}/><br/>
                        <label>Age</label>
                        <input type="text" name="new_New_Route" value={this.state.new_New_Route} onChange={this.handleChange.bind(this)}/><br/>
                        <label>Password</label>
                        <input type="text" name="new_TransferBusID" value={this.state.new_TransferBusID} onChange={this.handleChange.bind(this)}/><br/>
                        <label>CreatedDate</label>
                        <input type="text" name="new_Report_Date" value={this.state.new_Report_Date} onChange={this.handleChange.bind(this)}/><br/>
                        <label>UpdatedDate</label>
                        <input type="text" name="new_Status" value={this.state.new_Status} onChange={this.handleChange.bind(this)}/><br/>
                        <label>Status</label>
                        <input type="text" name="new_New_UserID" value={this.state.new_New_UserID} onChange={this.handleChange.bind(this)}/><br/>
                        <label>rating</label>
                        <input type="text" name="new_New_UserID" value={this.state.new_New_UserID} onChange={this.handleChange.bind(this)}/><br/>
                  
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.onInsertStop.bind(this)}>Save</Button>
                        <Button onClick={()=>{this.setState({new_show:false})}}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}