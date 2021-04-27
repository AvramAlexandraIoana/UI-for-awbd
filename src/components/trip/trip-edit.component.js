import { Component } from "react";
import AgencyService from "../../services/agency.service";
import TripService from "../../services/trip.service";
import { Link, withRouter } from 'react-router-dom';
import LocationService from "../../services/location.service";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class TripEdit extends Component {
    emptyItem = {
        name: '',
        numberOfSpots: '',
        price: '',
        location: '',
        agency: ''
    }

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
          TripService.getTrip(this.props.match.params.id).then(
            response => {
              this.setState({item: response.data});
            },
            error => {
              this.setState({
                contentError:
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString()
              });
            }
          );
        }

        LocationService.getLocationList().then(
            response => {
                this.setState({locationList: response.data});
            },
            error => {
                this.setState({
                    contentError:
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                });
            }
        )
        AgencyService.getAgencyList().then(
            response => {
                this.setState({agencyList: response.data});
              },
            error => {
                this.setState({
                    contentError:
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                });
            }
        );
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
        if (!item.id) {
            TripService.createNewTrip(item).then(
                response => {
                this.props.history.push('/trip/list');
                },
                error => {
                this.setState({
                    contentError:
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                });
            }
          )
        } else {
            TripService.updateTrip(item).then(
                response => {
                this.props.history.push('/trip/list');
                },
                error => {
                this.setState({
                    contentError:
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                }
            );
            }
          )
        }
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