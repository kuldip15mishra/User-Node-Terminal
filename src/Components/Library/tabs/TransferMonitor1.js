import React from 'react';
import {Table,Button} from 'react-bootstrap';
import '../../../css/index.css'

export class TransferMonitor1 extends React.Component {

    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    constructor(props, context) {
        super(props, context);

        this.handleHide = this.handleHide.bind(this);

        this.state = {
            new_show: false,
            update_show: false,
            del_show: false,
            data: [],

        };
    }

    handleHide() {
        this.setState({del_show: false,update_show:false,new_show:false});
    }
    render() {
        return (
            <div>
                <Table responsive className="table-view" bordered hover>
                    <thead>
                    <tr className="th-view">
                       
                        <th>BusID</th>
                        <th>Card Number</th>
                        <th>Exit</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                      
                    </tr>
                    </thead>
                   
                </Table>

                <Button bsStyle="info" style={{marginLeft:30}} onClick={()=>this.setState({new_show:true})}>Resend</Button>
                <Button style={{marginLeft:20}} bsStyle="info">export
                </Button>
             

            </div>
        );
    }
}