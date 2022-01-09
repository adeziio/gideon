import React, { Component } from 'react';
import './../css/style.css';
import { Container, CircularProgress, Grid, TextField, FormControl, Button } from '@mui/material';
import gideonGif from './../../gif/0001.gif';
import gideonImg from './../../img/0001.png';
import silhouetteImg from './../../img/silhouette.png';
import ReplaceBeforeFetch from '../data/ReplaceBeforeFetch';
import ReplaceAfterFetch from '../data/ReplaceAfterFetch';
import { fetchBrainShopAI, fetchLocation, fetchWeatherData } from './../api/api';
import parse from 'html-react-parser';


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yourMessage: "",
            gideonMessage: "",
            chatLog: [],
            showChatLog: false
        }
    };

    componentDidMount = () => {
        this.setState({
            gideonMessage: "Greetings, my name is Gideon. How may I assist you?",
            chatLog: [
                {
                    name: "Gideon",
                    message: "Greetings, my name is Gideon. How may I assist you?"
                }
            ],
        })
    }

    handleMessageSubmit = async () => {
        if (this.state.yourMessage !== "") {
            this.addToChatLog({ name: "You", message: this.state.yourMessage }, () => this.setState({ yourMessage: "" }));
            let newYourMsg = this.massageMessage(ReplaceBeforeFetch, this.state.yourMessage);
            if (newYourMsg.toLowerCase().includes("weather")) {
                if (newYourMsg.toLowerCase().includes("in")) {
                    newYourMsg = newYourMsg.substring(newYourMsg.indexOf("in") + 3);
                    let weather = await fetchWeatherData(newYourMsg);
                    let newGideonMsg = `The weather is ${weather.current.condition.text} in ${weather.location.name}, ${weather.location.region} ${weather.location.country}`;
                    this.addNewGideonMessage(newGideonMsg);
                }
                else {
                    let yourLocation = await fetchLocation();
                    let weather = await fetchWeatherData(yourLocation.zipCode);
                    let newGideonMsg = `The weather is ${weather.current.condition.text} at your location in ${weather.location.name}, ${weather.location.region} ${weather.location.country}`;
                    this.addNewGideonMessage(newGideonMsg);
                }
            }
            else if (newYourMsg.toLowerCase().includes("my current location") ||
                newYourMsg.toLowerCase().includes("my location") ||
                newYourMsg.toLowerCase().includes("where am i") ||
                newYourMsg.toLowerCase().includes("where do i live")
            ) {
                let yourLocation = await fetchLocation();
                let newGideonMsg = `You are located in ${yourLocation.city}, ${yourLocation.state} ${yourLocation.countryISO3}`;
                this.addNewGideonMessage(newGideonMsg);
            }
            else if (newYourMsg.toLowerCase().includes("ip")) {
                let yourLocation = await fetchLocation();
                let newGideonMsg = `Your ip address is ${yourLocation.ip}`;
                this.addNewGideonMessage(newGideonMsg);
            }
            else {
                let brainShopAIRes = await fetchBrainShopAI(newYourMsg);
                let newGideonMsg = this.massageMessage(ReplaceAfterFetch, brainShopAIRes.cnt);
                this.addNewGideonMessage(newGideonMsg);
            }
        }
    }

    addNewGideonMessage = (msg) => {
        this.setState({
            gideonMessage: msg
        }, () => {
            this.addToChatLog({ name: "Gideon", message: msg });
        })
    }

    addToChatLog = (obj, callback) => {
        this.setState((prevState) => ({
            chatLog: [...prevState.chatLog, obj]
        }), callback)
    }

    handleMessageChange = (e) => {
        this.setState({
            yourMessage: e.target.value
        })
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleMessageSubmit();
        }
    }

    handleShowChatLog = () => {
        this.setState((prevState) => ({
            showChatLog: !prevState.showChatLog
        }));
    }

    massageMessage = (dataList, msg) => {
        let newMsg = msg;
        dataList.forEach((item) => {
            if (newMsg.toLowerCase().includes(item.before) || newMsg.includes(item.before)) {
                newMsg = newMsg.replaceAll(item.before, item.after);
            }
        })
        return newMsg;
    }

    render() {
        const { chatLog, showChatLog, yourMessage, gideonMessage } = this.state;

        return (
            <>
                <div className='roboto-mono header' onClick={() => window.location.reload()}>Gide<span><CircularProgress className="loading" color="inherit" /></span>n</div>
                <div>
                    <div className="bot-msg-container">
                        <div className="roboto-mono bot-msg">{parse(gideonMessage)}</div>
                    </div>
                    <img alt="default" src={gideonGif} className='bot-display' />
                </div>
                <div className="input-container">
                    <FormControl fullWidth className="input-box">
                        <TextField label="You" variant="outlined" onChange={this.handleMessageChange} onKeyDown={this._handleKeyDown} value={yourMessage} />
                    </FormControl>
                    <Button className="input-btn" variant="contained" onClick={this.handleMessageSubmit}>Enter</Button>
                    <Button className="input-btn" variant="outlined" onClick={this.handleShowChatLog}>Chat Log</Button>
                </div>

                {showChatLog ?
                    <div className="logs-wrapper">
                        <div className="logs-container">
                            <Container fixed>
                                {chatLog && showChatLog ? chatLog.map((item, index) =>
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