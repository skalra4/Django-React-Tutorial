import React, { Component } from "react";
import {
    Grid,
    Card,
    Typography,
    IconButton,
    LinearProgress,
} from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Pause from "@mui/icons-material/Pause";
import SkipNext from "@mui/icons-material/SkipNext"

export default class MusicPlayer extends Component {
    constructor(props){
        super(props);
    }

    skipSong() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        };
        fetch("/spotify/skip", requestOptions);
    }

    pauseSong() {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
        };
        fetch("/spotify/pause", requestOptions);
    }

    playSong() {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
        };
        fetch("/spotify/play", requestOptions);
    }

    render() {
        const songProgress = (this.props.time / this.props.duration) * 100;

        return(
            <Card>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        <img src={this.props.image_url} height="100%" width="100%" />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography component="h5" variant="h5">
                            {this.props.title}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle1">
                            {this.props.artist}
                        </Typography>
                        <div>
                            <IconButton onClick={() => {
                                this.props.is_playing ? this.pauseSong() : this.playSong(); 
                            }}>
                                {this.props.is_playing ? <Pause /> : <PlayArrow />}
                            </IconButton>
                            <IconButton onClick={() => this.skipSong()}>
                                {this.props.votes} / {this.props.votes_required}
                                <SkipNext />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
                <LinearProgress variant="determinate" value={songProgress} />
            </Card>
        )
    }
    
}