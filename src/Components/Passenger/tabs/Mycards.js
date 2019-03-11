import React from 'react';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import {Table,Button,Modal} from 'react-bootstrap';
import '../index.css'
import {SERVER_URL} from '../../../Constant/config'
import update from "react-addons-update";
import {logging ,GetFormattedDate,GetFormattedTime} from '../../../Common/logger';

import HoverComponent from '../../../Common/HoverComponent';
export class Mycards extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: false,
            selectKey:-1,
            Isblock:'',
            ValidTo:new Date(),
            data:[],
            tableName :'card',
            currentID:'',
            ischanged :false

        };
    }

    handleHide() {
        this.setState({ show: false });
    }

    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        //nextState['ValidTo'] =e.target.value === '0' ? 'DeActivated' :'Active';
        this.setState(nextState);
    }

    componentDidUpdate(prevProps) {

        if (this.props.cards.length > 0 && this.props.cards !== prevProps.cards) {

            let newState = update(this.state, {
                data: {
                    $set: this.props.cards
                }
            });
            this.setState(newState);
        }
    }

    insertLog(data){
        
        const logData={
            TableName : 'card',
            ColumnName :'Isblock',
            TabelRowid:data[0].id,
            CreateEmployeeID:localStorage.getItem('userid'),
            CreateDate:GetFormattedDate(),
            CreateTime:GetFormattedTime(),
            UpdateEmployeeID:localStorage.getItem('userid'),
            UpdateDate:GetFormattedDate(),
            UpdateTime:GetFormattedTime()
        }

        logging(logData).then(res=>{
            if(res){
                this.setState({ischanged :this.state.ischanged ? false :true});
            }
        });
    }
    onHandleChangeCardUpdate=()=>{
        
       
        const card =  {
            "Isblock": this.state.Isblock,
            "ValidTo": this.state.ValidTo,
            "CardNumber": this.state.CardNumber,
        };
        let currentInstance = this;
        axios({
            method: 'put',
            url: `${SERVER_URL}card/block/${this.state.CardNumber}`,
            data: card,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                if (response.status === 200) {
                    console.log("❤card❤");
                    console.log("Update Success");
                    console.log(response);
                    currentInstance.insertLog(response.data);
                    currentInstance.props.handleOnSave();
                 
                }
            })

            .catch(function (response) {
                console.log(response);

            });
    
           
        this.setState({
            data: update(
                this.state.data,
                {
                    [this.state.selectKey]: {
                        Isblock: { $set: this.state.Isblock },
                        ValidTo: { $set: this.state.ValidTo },
                    }
                }
            ),show:false
        }
        );
    };
   
    render() {
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        return(
            <div>
                <Table responsive className="table-view" bordered hover>
                <thead>
                <tr className="th-view">
                    <th>UserID</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Isblock</th>
                    <th>ValidForm</th>
                    <th>ValidTo</th>
                    <th>Balance</th>
                    <th>Card Number</th>
                    <th>FareType</th>
                    <th className="th-button-view"></th>
                </tr>
                </thead>
                <tbody>

                {this.state.data.map((element, index) => {
                    return(
                            <tr key={index}>
                                <td>{this.state.data[index].UserID}</td>
                                <td>{this.state.data[index].FirstName}</td>
                                <td>{this.state.data[index].LastName}</td>
                                <td>{this.state.data[index].Isblock}</td>
                                <td>{this.state.data[index].ValidFrom}</td>
                                <td>{this.state.data[index].ValidTo}</td>
                                <td>{this.state.data[index].Balance}</td>
                                <td>{this.state.data[index].CardNumber}</td>
                                <td>{this.state.data[index].FareType}</td>
                                <td><Button bsStyle="success" onClick={() => this.setState({
                                    show: true,
                                    selectKey:index,
                                    Isblock:this.state.data[index].Isblock,
                                    ValidTo:date,
                                   
                                    CardNumber:this.state.data[index].CardNumber,
                                })}>edit</Button></td>
                                <td><HoverComponent tableName={this.state.tableName} 
                                tableRowID={this.state.data[index].id}
                                ischanged ={this.state.ischanged}
                                followCursor={false}
                                shiftX={0}
                                shiftY={0}
                                /></td>
                            </tr>
                        )})}

                </tbody>
            </Table>
            
                <Button bsStyle="info" style={{float:'left',marginTop:0}} onClick={() => this.setState({
                    new_show: true})}><CSVLink style={{color:'#fff'}} data={this.state.data} >export</CSVLink>
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Update Data
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <label>Isblock</label>
                        <input type="text" name="Isblock"
                               value={this.state.Isblock} onChange={this.handleChange.bind(this)} /><br/>
                        <label>ValidTo</label>
                        <input type="text" name="ValidTo"
                               value={this.state.ValidTo} disabled /><br/>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.onHandleChangeCardUpdate.bind(this)}>Save</Button>
                        <Button onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        );
    }
}



