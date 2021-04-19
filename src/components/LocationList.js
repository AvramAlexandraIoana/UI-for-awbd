
import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavbar.js';
import { Link } from 'react-router-dom';
import App from '../App.js';

class LocationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            isLoading: true
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
    
        fetch('/location/list')
          .then(response => response.json())
          .then(data => this.setState({locations: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/location/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedLocations = [...this.state.locations].filter(i => i.id !== id);
          this.setState({locations: updatedLocations});
        });
    }

    render() {

        const {locations, isLoading} = this.state;
    
        if (isLoading) {
          return <p>Loading...</p>;
        }

        const locationList = locations.map(location => {
            return <tr key={location.id}>
                <td style={{whiteSpace: 'nowrap'}}>
                  {location.city}
                </td>
                <td style={{whiteSpace: 'nowrap'}}>
                    {location.streetAddress}
                </td>
                <td>
                    <Button variant="contained" color="primary" tag={Link} to={"/location/" + location.id}
                          style={{marginRight: 10}}>
                        Edit
                    </Button>
                    <Button variant="contained" color="danger"  onClick={() => this.remove(location.id)}
                        style={{marginRight: 10}}>
                        Delete
                    </Button>
                    <Button variant="info" color="info"  tag={Link} to={"/location/info/" + location.id}>
                        Info
                    </Button>
                </td>
            </tr>
        });

    
        return <div>
            <AppNavbar>
            </AppNavbar>
            <Container fluid>
                <div  className="float-right">
                    <Button color="success" tag={Link} to="/location/new">Add new location</Button>
                </div>
                <h3>Location List</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Streed Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locationList}
                    </tbody>
                </Table>
            </Container>
        </div>
      }

}


export default LocationList;