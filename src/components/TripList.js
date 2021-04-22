import { Component } from "react";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';


class TripList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trips: [],
            isLoading: true
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
    
        fetch('/trip/list')
          .then(response => response.json())
          .then(data => this.setState({trips: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/trip/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedTrips = [...this.state.trips].filter(i => i.id !== id);
          this.setState({trips: updatedTrips});
        });
    }

    render() {
        
        const {trips, isLoading} = this.state;
    
        if (isLoading) {
          return <p>Loading...</p>;
        }

        const tripList = trips.map(trip => {
            return <tr key={trip.id}>
                <td style={{whiteSpace: 'nowrap'}}>
                  {trip.name}
                </td>
                <td style={{whiteSpace: 'nowrap'}}>
                    {trip.numberOfSpots}
                </td>
                <td style={{whiteSpace: 'nowrap'}}>
                    {trip.price}
                </td>
                <td style={{whiteSpace: 'nowrap'}}>
                    {trip.agency.name}
                </td>
                <td style={{whiteSpace: 'nowrap'}}>
                    {trip.location.city}
                </td>
                <td>
                    <Button variant="contained" color="primary" tag={Link} to={"/trip/" + trip.id}
                          style={{marginRight: 10}}>
                        Edit
                    </Button>
                    <Button variant="contained" color="danger"  onClick={() => this.remove(trip.id)}
                        style={{marginRight: 10}}>
                        Delete
                    </Button>
                </td>
            </tr>
        });
        return <div>
                <Container fluid>
                    <div  className="float-right">
                        <Button color="success" tag={Link} to="/trip/new">Add new trip</Button>
                    </div>
                    <h3>Trip List</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Number of sports</th>
                                <th>Price</th>
                                <th>Agency Name</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tripList}
                        </tbody>
                    </Table>
                </Container>
            </div>
    }
}

export default TripList;