import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavbar.js';
import { Link } from 'react-router-dom';


class CountryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            isLoading: true
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
    
        fetch('/country/list')
          .then(response => response.json())
          .then(data => this.setState({countries: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/country/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedCountries = [...this.state.countries].filter(i => i.id !== id);
          this.setState({countries: updatedCountries});
        });
    }

    render() {
        const {countries, isLoading} = this.state;
    
        if (isLoading) {
          return <p>Loading...</p>;
        }

        const countriesList = countries.map(country => {
            return <tr key={country.id}>
              <td style={{whiteSpace: 'nowrap'}}>
                {country.countryName}
              </td>
              <td>
                <Button variant="contained" color="primary" tag={Link} to={"/country/" + country.id}
                  style={{marginRight: 10}}>
                  Edit
                </Button>
                <Button variant="contained" color="danger"  onClick={() => this.remove(country.id)}>
                   Delete
                </Button>
              </td>
            </tr>
        });

        return (
            <div>
              <AppNavbar/>
              <Container fluid>
                <div className="float-right">
                  <Button color="success" tag={Link} to="/country/new">Add new country</Button>
                </div>
                <h3>Country List</h3>
                <Table className="mt-4">
                  <thead>
                    <tr>
                      <th width="40%">Name</th>
                      <th width="20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countriesList}
                  </tbody>
                </Table>
              </Container>
            </div>
          );


          
    }
}

export default CountryList;
