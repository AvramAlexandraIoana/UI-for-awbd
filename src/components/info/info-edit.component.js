
import React, {Component, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {uploadImage} from "../../actions/uploadActions";
import { Link, withRouter } from 'react-router-dom';
import InfoService from "../../services/info.service";
import {  Form } from 'reactstrap';

import Resizer from "react-image-file-resizer";



class InfoEdit extends Component {
    emptyItem = {
        imagePreview: null,
        imageData: null,
        imageName: null,
        image: null,
        description: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };

        this.handleUploadClick = this.handleUploadClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleUploadClick(event) {
        let file = event.target.files[0];
        const imageData = new FormData();
        imageData.append('imageFile', file);
        let item = {...this.state.item};
        item.imageData = imageData;
        item.imagePreview =  URL.createObjectURL(file);
        item.imageName = file.name;
        this.setState({item});
    }

    
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
        console.log(item);
    }

   
    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        InfoService.upload(item).then(
        response => {
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

    render() {
        const {item} = this.state;
        return (
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={
                                        item.imagePreview !== null ?
                                            item.imagePreview :
                                            "https://th.bing.com/th/id/Rc910111ff6eb2721d4aec15e8f10f0bd?rik=uEaFcYINVsKVbg&pid=ImgRaw"}
                                />
                            </CardActionArea>
                        </Card>
                        <Form onSubmit={this.handleSubmit}>
                            <input
                                accept="image/*"
                                id="upload-profile-image"
                                type="file"
                                onChange={this.handleUploadClick}
                            />
                            <label htmlFor="upload-profile-image">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                >
                                    Change Image
                                </Button>
                            </label>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                required
                                value={item.description || ''}
                                onChange={this.handleChange} 
                                variant="outlined"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Upload Image
                            </Button>
                        </Form>
                        <Typography>{item.imageName === null ? "Select An Image To Upload" : "Image Uploaded. Saved as " + item.imageName}</Typography>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}


export default withRouter(InfoEdit);