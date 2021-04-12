import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class LocationEdit extends Component {

  emptyItem = {
    city: '',
    streetAddress: '',
    country: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      countryList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const location = await (await fetch(`/country/${this.props.match.params.id}`)).json();
      this.setState({item: location});
    }

    const countryList = await (await fetch(`/country/list`)).json();
    const location = {...this.state.countryList};
    location.countryList = countryList;
    this.setState({countryList});
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

  setCountry(value) {
    let item = { ...this.state.item};
    item.country = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/location' + (item.id ? '/' + item.id : ''), {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/locations');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Group' : 'Add Group'}</h2>;
    const countryList = this.state.countryList;
    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
           <FormGroup>
                <TextField
                        id="outlined-full-width"
                        label="City"
                        placeholder="City"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        name="city" 
                        id="city" 
                        required
                        value={item.city || ''}
                        onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup>
                <TextField
                        id="outlined-full-width"
                        label="Street Address"
                        placeholder="Street Address"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        name="streetAddress" 
                        id="streetAddress" 
                        required
                        value={item.streetAddress || ''}
                        onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Autocomplete
                    options={countryList}
                    getOptionLabel={(option) => option.countryName}
                    fullWidth
                    onChange={(event, value) =>  this.setCountry(value)}
                    renderInput={(params) => <TextField {...params}  required
                                label="Country" variant="outlined" />}
                />
            </FormGroup>
           
            <FormGroup>
                <Button color="primary" type="submit">Save</Button>{' '}
                <Button color="secondary" tag={Link} to="/country/list">Cancel</Button>
            </FormGroup>
        </Form>
      </Container>
      
    </div>
  }
}

export default withRouter(LocationEdit);