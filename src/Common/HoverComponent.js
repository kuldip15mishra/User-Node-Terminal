


import React from 'react';
import ReactHover from 'react-hover';
import {SERVER_URL} from "../Constant/config";
import axios from 'axios';
import './index.css';

import {Tooltip,ButtonToolbar,OverlayTrigger,Button} from 'react-bootstrap';
export default class HoverComponent extends React.Component {
  
  
state ={
  createdby:'No Record',
  createddate:'No Record',
  createdtime:'No Record',
  lastmodifiedby:'No Record',
  lastmodifieddate:'No Record',
  lastmodifiedtime:'No Record',
  optionsCursorTrueWithMargin :{followCursor:true,
  shiftX: -450,
  shiftY: -200
  }
}
  componentDidMount(){
    this.setState({
      optionsCursorTrueWithMargin :{followCursor:this.props.followCursor,
      shiftX: this.props.shiftX ,//-450,
      shiftY: this.props.shiftY //-200
      }
    },
    this.getContentData(this.props.tableName,  this.props.tableRowID));
  }
  componentDidUpdate(prevProps){
    if(prevProps.ischanged !== this.props.ischanged ){
      this.setState({
        optionsCursorTrueWithMargin :{followCursor:this.props.followCursor,
        shiftX: this.props.shiftX ,//-450,
        shiftY: this.props.shiftY //-200
        }
      },
      this.getContentData(this.props.tableName,  this.props.tableRowID ?this.props.tableRowID :this.props.idchanged));
    }
  
  }

  getContentData(name,id){
    let self =this;
    axios.get(SERVER_URL + `log/getlog/${name}/${id}`)
    .then(res => {
      if(res && res.data && res.data.length >0)
       {const routes = res.data[0];
        console.log(routes);
        self.setState({
          createdby:routes.CreateEmployeeID,
          createddate:routes.CreatedDate,
          createdtime:routes.CreatedTime,
          lastmodifiedby:routes.UpdateEmployeeID,
          lastmodifieddate:routes.UpdatedDate,
          lastmodifiedtime:routes.UpdatedTime
        })
      }
    });
  }

    render() {
       
          const tooltip = (
            <Tooltip  id="tooltip">
            
     <ul >
       <li className="t1li">Created By: {this.state.createdby}</li>
       <li className="t1li">Created Date: {this.state.createddate}</li>
       <li className="t1li">Created Time: {this.state.createdtime}</li>
       <li className="t1li">Last Modified By: {this.state.lastmodifiedby}</li>
       <li className="t1li">Last Modified Date: {this.state.lastmodifieddate}</li>
       <li className="t1li">Last Modified Time: {this.state.lastmodifiedtime}</li>
     </ul>
    
            </Tooltip>
          );
            return(
            
              <ButtonToolbar>
              <OverlayTrigger placement="left" overlay={tooltip}>
              <h1 style={{ background: 'blue','border-radius': '15px', width: '20px', fontSize: '1.5em', color: 'white' }}> <p></p></h1>
              </OverlayTrigger>
              </ButtonToolbar>
            );
      
    }
}

