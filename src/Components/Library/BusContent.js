import React from 'react';
import {Row,Tab,Nav,NavItem,Col} from 'react-bootstrap';
import {Stops} from "./tabs/Stops";
import {Routes} from "./tabs/Routes";
import {BusRouteSD} from "./tabs/BusRouteSD";
import {TransferMonitor2} from "./tabs/TransferMonitor2";
import {TransferMonitor1} from "./tabs/TransferMonitor1";
import {DriverID} from "./tabs/driverID";
import {DriverMonitor} from './tabs/driverMonitor'
export class BusContent extends React.Component {


    render() {
        return(

            <Tab.Container id="tabs-with-dropdown" defaultActiveKey="bus_stops" >
                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="bus_stops">BUS STOPS</NavItem>
                            <NavItem eventKey="bus_route_fare">BUS ROUTE FARE</NavItem>
                            <NavItem eventKey="change_busroutesd">BUS ROUTE SD</NavItem>
                            <NavItem eventKey="change_transfermonitor1">TRANSFER MONITOR 1</NavItem>
                            <NavItem eventKey="change_transfermonitor2">TRANSFER MONITOR 2</NavItem>
                            <NavItem eventKey="change_driverID">DRIVER ID</NavItem>
                            <NavItem eventKey="change_driverMonitor">DRIVER MONITOR</NavItem>
                        </Nav>
                    </Col>


                    <Col sm={12}>
                        <Tab.Content animation>

                            <Tab.Pane eventKey="bus_stops">
                                <Stops stops={this.props.stops} />
                            </Tab.Pane>

                            <Tab.Pane eventKey="bus_route_fare">
                                <Routes routes={this.props.routes} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="change_busroutesd">
                                <BusRouteSD changebusroutesd={this.props.changebusroutesd }/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="change_transfermonitor1">
                                <TransferMonitor1 changetransfermonitor1={this.props.changetransfermonitor1}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="change_transfermonitor2">
                                <TransferMonitor2 changetransfermonitor2={this.props.changetransfermonitor2}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="change_driverID">
                                <DriverID changeDriverID={this.props.changeDriverID}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="change_driverMonitor">
                                <DriverMonitor changeDriverMonitor={this.props.changeDriverMonitor}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}
