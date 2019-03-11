import React from 'react';
import {Table,Grid,Row,Col} from 'react-bootstrap';
export class MyAccount extends React.Component {
    render() {
        return(
            <Grid>
  <Row className="show-grid">
    <Col xs={12} md={6}>
    <Table responsive className="table-view" bordered hover>
                    <thead>
                    <tr className="th-view">
                
                        <th>DID</th>
                        <th>Bus Route</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                   
                </Table>
            
    </Col>
    <Col xs={12} md={2}></Col>
    <Col xs={6} md={3}>
    <Table responsive className="table-view" bordered hover>
                    <thead>
                    <tr className="th-view">
                
                       
                        <th>Bus Route</th>
                        <th>Updated On</th>
                      
                    </tr>
                    </thead>
                   
                </Table>
    </Col>
  </Row>
  </Grid>
                 
              
        );
    }
}