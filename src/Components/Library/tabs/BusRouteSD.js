import React from 'react';
import {CSVLink} from 'react-csv';
import {Table,Button,Modal} from 'react-bootstrap';
import '../../../css/index.css';
import axios from 'axios';
import API from "../../../Constant/api";
import {SERVER_URL} from '../../../Constant/config'
import update from 'react-addons-update';
import {logging ,GetFormattedDate,GetFormattedTime} from '../../../Common/logger';
import HoverComponent from '../../../Common/HoverComponent'
export class BusRouteSD extends React.Component {

    constructor(props) {
        super(props);

        this.handleHide = this.handleHide.bind(this);

        this.state = {
            olddata :[],
            new_show: false,
            update_show: false,
            del_show: false,
            name: "",
            BusRoute: "",
            Source: "",
            Destination: "",
            Direction: "",
            new_BusRoute: "",
            new_Source: "",
            new_Destination: "",
            new_Direction: "",
            data: [],
            selectKey:-1,
            tableName :'busroutesd',
        };
    }

    handleHide() {
        this.setState({del_show: false,update_show:false,new_show:false});
    }

    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        let currentchanged = [...this.state.olddata];
        currentchanged.push(e.target.name);
        nextState['olddata'] =[...currentchanged];
        this.setState(nextState);
    }

    componentDidUpdate(prevProps) {

        if (this.props.changebusroutesd && prevProps.changebusroutesd && this.props.changebusroutesd.length > 0 && this.props.changebusroutesd !== prevProps.changebusroutesd) {

            let newState = update(this.state, {
                data: {
                    $set: this.props.changebusroutesd
                }
            });
            this.setState(newState);
        }
    }

    onInsertStop(){

        const InserData =  {

            "BusRoute": this.state.new_BusRoute,
            "Direction" :this.state.new_Direction,
            "Source": this.state.new_Source,
            "Destination": this.state.new_Destination,
          
        };

        
        var currentInstance = this;
        axios({
            method: 'post',
            url: `${SERVER_URL}busrouteSD`,
            data: InserData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                if (response.status === 200) {
                    let id = response.data[0].id;
                    currentInstance.insertLog(InserData,id);
                }
            })
            .catch(function (response) {
                return
            });

        let newState = update(this.state, {
            data: {
                $push: [InserData]
            }
        });
        this.setState(newState);
        this.setState({new_show:false});
    }

    onUpdateStop(){

        const InserData =  {
            "BusRoute": this.state.BusRoute,
            "Destination" :this.state.Destination,
            "Source": this.state.Source,
            "Direction": this.state.Direction,
            "id":this.state.id
        };

        
        var currentInstance = this;
        axios({
            method: 'put',
            url: `${SERVER_URL}busrouteSD/${this.state.id}`,
            data: InserData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response);
                     console.log(response.data);
                     let id = response.data[0].id;
                    currentInstance.insertLogForUpdate(InserData,id);
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
                        BusRoute: { $set: this.state.BusRoute },
                        Source: { $set: this.state.Source },
                        Direction: { $set: this.state.Direction },
                        Destination: { $set: this.state.Destination }
                        
                    }
                }
            )
        });

        this.setState({new_show:false});
        this.setState({update_show:false})
    }
    insertLogForDelete(datalist,id){
       
        if(datalist){
          const logData={
                    TableName : 'busroutesd',
                    ColumnName :'Entire Row',
                    TabelRowid:id,
                    CreateEmployeeID:localStorage.getItem('userid'),
                    CreateDate:GetFormattedDate(),
                    CreateTime:GetFormattedTime(),
                    UpdateEmployeeID:localStorage.getItem('userid'),
                    UpdateDate:GetFormattedDate(),
                    UpdateTime:GetFormattedTime()
          }
                logging(logData);
            
        
                
            
        }
      
    }
    insertLog(datalist,id){
        var promises = [];
        let self= this;
        if(datalist){
            Object.keys(datalist).map(col=>{
                
                {const logData={
                    TableName : 'busroutesd',
                    ColumnName :col,
                    TabelRowid:id,
                    CreateEmployeeID:localStorage.getItem('userid'),
                    CreateDate:GetFormattedDate(),
                    CreateTime:GetFormattedTime(),
                    UpdateEmployeeID:localStorage.getItem('userid'),
                    UpdateDate:GetFormattedDate(),
                    UpdateTime:GetFormattedTime()
                }
                promises.push(logging(logData));
            }
        
                
            });
            Promise.all(promises).then(res=>{
                if(res)
                    {self.setState({ischanged :self.state.ischanged ? false :true,idchanged :id});}
            })
        }
      
    }
    insertLogForUpdate(datalist,id){
        var promises = [];
        let self= this;
        if(datalist){
            Object.keys(datalist).map(col=>{
                if(this.isValueChanged(col,id,datalist[col]))
                {const logData={
                    TableName : 'busroutesd',
                    ColumnName :col,
                    TabelRowid:id,
                    CreateEmployeeID:localStorage.getItem('userid'),
                    CreateDate:GetFormattedDate(),
                    CreateTime:GetFormattedTime(),
                    UpdateEmployeeID:localStorage.getItem('userid'),
                    UpdateDate:GetFormattedDate(),
                    UpdateTime:GetFormattedTime()
                }
                promises.push(logging(logData));
            }
           
            })
            Promise.all(promises).then(res=>{
                if(res)
                    {self.setState({ischanged :self.state.ischanged ? false :true,idchanged :id});}
            })
        }
      
    }
    isValueChanged(key ,id,newVal){
        if(key && id){
           var filteredList= this.state.olddata.filter(item=>{
                return item ===key
            })

            if(filteredList && filteredList.length>0)
            {
           
                return true
            }else{
                return false
            }
        }
        
    }
    onDeleteStops(){
        console.log("id",this.state.id);
        var currentInstance = this;
        API.delete(`busrouteSD/${this.state.id}`)
            .then(response => {
                console.log(response);
                console.log(response.data);
               // let id = response.data[0].id;
                   // currentInstance.insertLogForDelete({'EntireRow' :'ALL ROW'},id);
            });

        this.setState({
            data: update(
                this.state.data,
                {
                    $splice: [[this.state.selectKey, 1]]
                }
            ),
            selectKey: -1,
            del_show:false
        });
    }



    render() {
        return (
            <div>
                <Table responsive className="table-view" bordered hover>
                    <thead>
                    <tr className="th-view">       
                       <th>BusRoute</th>
                       <th>Source</th>
                       <th>Destination</th>
                       <th>Direction</th>
                        <th className="th-button-view"></th>
                        <th className="th-button-view"></th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.data.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td>{this.state.data[index].BusRoute}</td>
                                <td>{this.state.data[index].Direction}</td>
                                <td>{this.state.data[index].Source}</td>
                                <td>{this.state.data[index].Destination}</td>
                                <td><Button bsStyle="success" onClick={() => this.setState({
                                    update_show: true,
                                    selectKey:index,
                                    id:this.state.data[index].id,
                                    BusRoute:this.state.data[index].BusRoute,
                                    Direction : this.state.Direction,
                                    Source:this.state.data[index].Source,
                                    Destination:this.state.data[index].Destination})}>edit</Button>
                                </td>
                                <td><Button bsStyle="danger" onClick={()=>{this.setState({
                                    id:this.state.data[index].id,
                                    selectKey:index,
                                    del_show:true})}}>delete</Button></td>
                                    <td><HoverComponent tableName={this.state.tableName} 
                                tableRowID={this.state.data[index].id}
                                ischanged ={this.state.ischanged}
                                idchanged={this.state.idchanged}
                                /></td>
                            </tr>
                        )
                    })}

                    </tbody>
                </Table>

                <Button bsStyle="info" style={{marginLeft:30}} onClick={()=>this.setState({new_show:true})}>New</Button>
                <Button style={{marginLeft:20}} bsStyle="info" ><CSVLink style={{color:'#fff'}} data={this.state.data} >export</CSVLink>
                </Button>
                <Modal
                    show={this.state.update_show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Update Bus Route Fare
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Bus Route</label>
                        <input type="text" name="BusRoute"
                               value={this.state.BusRoute} onChange={this.handleChange.bind(this)} /><br/>
                        <label>Source</label>
                        <input type="text" name="Source" value={this.state.Source} onChange={this.handleChange.bind(this)}/><br/>
                        <label>Destination</label>
                        <input type="text" name="Destination" value={this.state.Destination} onChange={this.handleChange.bind(this)}/><br/>
                        <label>Direction</label>
                        <input type="text" name="Direction" value={this.state.Direction} onChange={this.handleChange.bind(this)}/><br/>
                       
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.onUpdateStop.bind(this)}>Save</Button>
                        <Button onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={this.state.new_show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            New Bus Route Fare
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Bus Route</label>
                        <input type="text" name="new_BusRoute"
                               value={this.state.new_BusRoute} onChange={this.handleChange.bind(this)} /><br/>
                        <label>Source</label>
                        <input type="text" name="new_Source" value={this.state.new_Source} onChange={this.handleChange.bind(this)}/><br/>
                        <label>Destination</label>
                        <input type="text" name="new_Destination" value={this.state.new_Destination} onChange={this.handleChange.bind(this)}/><br/>
                        <label>Direction</label>
                        <input type="text" name="new_Direction" value={this.state.new_Direction} onChange={this.handleChange.bind(this)}/><br/>
                     </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.onInsertStop.bind(this)}>Save</Button>
                        <Button onClick={()=>{this.setState({new_show:false})}}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={this.state.del_show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Delete Bus Route Fare
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Are you really remove this data?
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.onDeleteStops.bind(this)}>Save</Button>
                        <Button onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}