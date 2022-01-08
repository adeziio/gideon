import React, { Component } from 'react';
import './../css/style.css';
import { Container, CircularProgress, Grid, TextField, FormControl, Button } from '@mui/material';
import gideonGif from './../../gif/0001.gif';
import gideonImg from './../../img/0001.png';
import silhouetteImg from './../../img/silhouette.png';
import ReplaceBeforeFetch from '../data/ReplaceBeforeFetch';
import ReplaceAfterFetch from '../data/ReplaceAfterFetch';


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yourMessage: "",
            gideonMessage: "Greetings, my name is Gideon. How may I assist you?",
            chatLogs: [
                {
                    name: "Gideon",
                    message: "Greetings, my name is Gideon. How may I assist you?"
                }
            ],
            showChatLogs: false
        }
    };

    handleMessageChange = (e) => {
        this.setState({
            yourMessage: e.target.value
        })
    }

    handleMessageSubmit = () => {
        if (this.state.yourMessage !== "") {
            this.addToChatLogs({ name: "You", message: this.state.yourMessage }, () => this.setState({ yourMessage: "" }));
            this.massageYourMessage(this.state.yourMessage);
        }
    }

    addToChatLogs = (obj, callback) => {
        this.setState((prevState) => ({
            chatLogs: [...prevState.chatLogs, obj]
        }), callback)
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleMessageSubmit();
        }
    }

    handleShowChatLogs = () => {
        this.setState((prevState) => ({
            showChatLogs: !prevState.showChatLogs
        }));
    }

    fetchBrainShopAIResponse = (msg) => {
        fetch(`https://acobot-brainshop-ai-v1.p.rapidapi.com/get?bid=${process.env.REACT_APP_BRAINSHOP_AI_ID}&key=${process.env.REACT_APP_BRAINSHOP_AI_KEY}&uid=${process.env.REACT_APP_BRAINSHOP_AI_UID}&msg=${msg}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "acobot-brainshop-ai-v1.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
            }
        })
            .then(response => response.json())
            .then(resData => this.massageGideonMessage(resData.cnt))
    }

    massageYourMessage = (msg) => {
        let newMsg = msg;
        ReplaceBeforeFetch.forEach((item) => {
            if (newMsg.toLowerCase().includes(item.before)) {
                newMsg = newMsg.replaceAll(item.before, item.after)
            }
        })
        this.fetchBrainShopAIResponse(newMsg);
    }

    massageGideonMessage = (msg) => {
        let newMsg = msg;
        ReplaceAfterFetch.forEach((item) => {
            if (newMsg.includes(item.before)) {
                newMsg = newMsg.replaceAll(item.before, item.after)
            }
        })
        this.setState({
            gideonMessage: newMsg
        }, () => {
            this.addToChatLogs({ name: "Gideon", message: newMsg })
        })
    }

    render() {
        const { chatLogs, showChatLogs, yourMessage, gideonMessage } = this.state;
        return (
            <>
                <div className='roboto-mono header'>Gide<span><CircularProgress className="loading" color="inherit" /></span>n</div>
                <div>
                    <div className="bot-msg-container">
                        <div className="roboto-mono bot-msg">{gideonMessage}</div>
                    </div>
                    <img alt="default" src={gideonGif} className='bot-display' />
                </div>
                <div className="input-container">
                    <FormControl fullWidth className="input-box">
                        <TextField label="You" variant="outlined" onChange={this.handleMessageChange} onKeyDown={this._handleKeyDown} value={yourMessage} />
                    </FormControl>
                    <Button className="input-btn" variant="contained" onClick={this.handleMessageSubmit}>Enter</Button>
                    <Button className="input-btn" variant="outlined" onClick={this.handleShowChatLogs}>Chat Logs</Button>
                </div>

                {showChatLogs ?
                    <div className="logs-wrapper">
                        <div className="logs-container">
                            <Container fixed>
                                {chatLogs && showChatLogs ? chatLogs.map((item, index) =>
                                    <Grid container spacing={2} margin="1rem">
                                        <Grid item xs={2}>
                                            <img alt="default" src={item.name === "Gideon" ? gideonImg : silhouetteImg} className='pfp left' />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <div className='left'>{`${item.name}:`}</div>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <div className='roboto-mono left'>{item.message}</div>
                                        </Grid>
                                    </Grid>
                                ) : null}
                            </Container>
                            <div style={{ float: "left", clear: "both" }}
                                ref={(el) => { this.messagesEnd = el; }}>
                            </div>
                        </div >
                    </div> : null
                }
            </>
        )
    }

}