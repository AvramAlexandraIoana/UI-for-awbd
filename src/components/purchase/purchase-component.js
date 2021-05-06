import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TripService from "../../services/trip.service";
import jwt_decode from "jwt-decode";


class Purchase extends Component {
    emptyItem = {
        tripList: []
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.tripList,
            checked: true,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
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

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    render() {
        const {item, checked} = this.state;

        return (
            <FormGroup row>
                  <FormControlLabel
                    control={
                    <Checkbox
                        checked={checked}
                        onChange={this.handleChange}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Primary"
                />
            </FormGroup>
        );
    }
}

export default Purchase;