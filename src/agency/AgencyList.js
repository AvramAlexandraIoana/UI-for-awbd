import { Component } from "react"
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavbar.js';
import { Link } from 'react-router-dom';


class AgencyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agencies: [],
            isLoading: true
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
    
        fetch('/agency/list')
          .then(response => response.json())
          .then(data => this.setState({agencies: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/agency/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedAgencies = [...this.state.agencies].filter(i => i.id !== id);
          this.setState({agencies: updatedAgencies});
        });
    }

    render() {
        const {agencies, isLoading} = this.state;

        const agencyList = agencies.map(agency => {
            return <tr key={agency.id}>
                <td style={{whiteSpace: 'nowrap'}}>
                  {agency.name}
                </td>
                <td style={{whiteSpace: 'nowrap'}}>
                    {agency.location.city}
                </td>
                <td  style={{whiteSpace: 'nowrap'}}>
                    {agency.location.country.countryName}
                </td>
                <td>
                    <Button variant="contained" color="primary" tag={Link} to={"/agency/" + agency.id}
                          style={{marginRight: 10}}>
                        Edit
                    </Button>
                    <Button variant="contained" color="danger"  onClick={() => this.remove(agency.id)}
                        style={{marginRight: 10}}>
                        Delete
                    </Button>
                </td>
            </tr>
        });
    
        if (isLoading) {
          return <p>Loading...</p>;
        }

        return <div>
            <AppNavbar>
            </AppNavbar>
            <Container fluid>
                <div  className="float-right">
                    <Button color="success" tag={Link} to="/agency/new">Add new agency</Button>
                </div>
                <h3>Agency List</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Country</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agencyList}
                    </tbody>
                </Table>
            </Container>
    </div>
       
    }
}


export default AgencyList;