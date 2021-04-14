import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class TripEdit extends Component {
    emptyItem = {
        name: '',
        numberOfSpots: '',
        price: '',
        location: '',
        agency: ''
      };
    
    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            agencyList: [],
            locationList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
          const location = await (await fetch(`/trip/${this.props.match.params.id}`)).json();
          this.setState({item: location});
        }
    
        const agencyList = await (await fetch(`/agency/list`)).json();
        const locationList = await (await fetch(`/location/list`)).json();
        this.setState({locationList, agencyList});
        console.log(this.state);
    }
    
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        await fetch('/trip' + (item.id ? '/' + item.id : ''), {
          method: (item.id) ? 'PUT' : 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item),
        });
        this.props.history.push('/trip/list');
    }  


    setLocation(value) {
        let item = { ...this.state.item};
        item.location = value;
        this.setState({item});
    }

    setAgency(value) {
        let item = { ...this.state.item};
        item.agency = value;
        this.setState({item});
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Trip' : 'Add Trip'}</h2>;
        const locationList = this.state.locationList;
        const agencyList = this.state.agencyList;
        return <div>
          <AppNavbar/>
          <Container>
            {title}
            <Form onSubmit={this.handleSubmit}>
               <FormGroup>
                    <TextField
                        id="outlined-full-width"
                        label="Name"
                        placeholder="Name"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        name="name" 
                        id="name" 
                        required
                        value={item.name || ''}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                        type="number"
                        id="outlined-full-width"
                        label="Number of Spots"
                        placeholder="Number of Spots"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        name="numberOfSpots" 
                        id="numberOfSpots" 
                        required
                        value={item.numberOfSpots || ''}
                        onChange={this.handleChange}
                    />
                 </FormGroup>
                <FormGroup>
                    <TextField
                        type="number"
                        id="outlined-full-width"
                        label="Price"
                        placeholder="Price"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        name="price" 
                        id="price" 
                        required
                        value={item.price || ''}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Autocomplete
                        value={item.location}
                        options={locationList}
                        getOptionLabel={(option) => option.city}
                        fullWidth
                        onChange={(event, value) =>  this.setLocation(value)}
                        renderInput={(params) => <TextField {...params}  required
                                    label="Location" variant="outlined" />}
                    />
                </FormGroup>
                <FormGroup>
                    <Autocomplete
                        value={item.agency}
                        options={agencyList}
                        getOptionLabel={(option) => option.name}
                        fullWidth
                        onChange={(event, value) =>  this.setAgency(value)}
                        renderInput={(params) => <TextField {...params}  required
                                    label="Agency" variant="outlined" />}
                    />
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/trip/list">Cancel</Button>
                </FormGroup>
            </Form>
          </Container>
          
        </div>
    }

}

export default withRouter(TripEdit);