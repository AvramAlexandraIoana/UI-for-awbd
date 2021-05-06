import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TripService from "../../services/trip.service";
import jwt_decode from "jwt-decode";
import { Button, ButtonGroup, Container, Table , FormGroup} from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link, withRouter } from 'react-router-dom';
import { Form} from 'reactstrap';
import UserService from "../../services/user.service";


class Purchase extends Component {


    constructor(props) {
        super(props);
        this.state = {
            trips: [],
            userTrips: [],
            open: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
            const decodeUser = jwt_decode(user.accessToken);
            this.setState({
                userRoles: decodeUser.roles
            });
            }

            console.log(user);

            this.setState({isLoading: true});
        
            TripService.getTripList().then(
                response => {
                    this.setState({trips: response.data, isLoading: false});
                    let tripList = [ ...this.state.trips];
                    for (let i = 0; i < tripList.length; i++) {
                        tripList[i].checked = false;
                    }
                    this.setState({trips: tripList});
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

            UserService.getUserById(parseFloat(this.props.match.params.id)).then(
                response => {
                    this.setState({userTrips: response.data.trips, isLoading: false});
                    let tripList = [ ...this.state.trips];
                    let userTrips = [ ...this.state.userTrips];
                    console.log(tripList);
                    for (let i = 0; i < userTrips.length; i++) {
                        let findTripIndex = tripList.findIndex((trip) => {
                            return trip.id === userTrips[i].id;
                        });
                        console.log(findTripIndex);
                        if (findTripIndex != -1) {
                            tripList[findTripIndex].checked = true;
                            document.getElementById(findTripIndex).click();
                        }

                    }

                    this.setState({trips: tripList});

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
        }
    }

    handleChange(event) {
        const index = event.target.name;
        let updatedTrips = [...this.state.trips];
        updatedTrips[index].checked = event.target.checked;
        console.log(updatedTrips);
        this.setState({trips: updatedTrips});
    }

    // Submit
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        let sendObject = {
            id: parseFloat(this.props.match.params.id),
            tripIds: []
        };

        for (let i = 0; i < this.state.trips.length; i++) {
            if (this.state.trips[i].checked) {
                sendObject.tripIds.push(this.state.trips[i].id);
            }
        }
        UserService.addUserTrip(sendObject.id, sendObject).then(
            response => {
                this.props.history.push('/trip/list');
            },
            error => {
              this.setState({
                content:
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString()
              });
            }
          );
    }

    handleClickOpen() {
       this.setState({open: true});
       console.log(this.state);
    }

    handleClose()  {
        this.setState({open: false});
        console.log(this.state);
    }


    render() {
        const {trips, open} = this.state;
        const tripList = trips.map((trip, key) => {
            return (
                <FormGroup>
                    <FormControlLabel
                        className="trip-line"
                        control={
                        <Checkbox
                            checked={trip.checked}
                            onChange={this.handleChange}
                            name={key}
                            id={key}
                            color="primary"
                        />
                        }
                        label={trip.name}
                    />
                    <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                        View trip details
                    </Button>
                </FormGroup>
                
                )
        });
        return (
            <Container>
                <h3>Buy a trip</h3>
                <Form onSubmit={this.handleSubmit}>
                    {tripList}
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/country/list">Cancel</Button>
                    </FormGroup>
                </Form>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );
    }
}

export default Purchase;