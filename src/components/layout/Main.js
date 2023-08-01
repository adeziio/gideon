import React, { useState, useEffect, useRef } from 'react';
import '../css/style.css';
import { Container, CircularProgress, Grid, TextField, FormControl, Button, Card, CardActionArea, CardMedia, Link } from '@mui/material';
import gideonGif from '../gif/0001.gif';
import gideonImg from '../img/0001.png';
import silhouetteImg from '../img/silhouette.png';
import { fetchChatBot } from '../api/api';
import parse from 'html-react-parser';


const Main = (props) => {
    const [auth, setAuth] = useState(false);
    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [isLoadingMsg, setIsLoadingMsg] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        setChatLog(
            [
                {
                    name: "Gideon",
                    message: "Enter the password to proceed."
                }
            ]
        )
    }, [])

    const handleMessageSubmit = async () => {
        if (auth) {
            if (input !== "") {
                setIsLoadingMsg({ isLoadingMsg: true });
                addToChatLog({ name: "You", message: input });
                setInput("")
                let chatBot = await fetchChatBot(input);
                if (chatBot) {
                    addNewGideonMessage(chatBot['output']);
                }
                else {
                    addNewGideonMessage("Sorry, Gideon is offline.")
                }
            }
        }
        else {
            if (input !== "") {
                setIsLoadingMsg({ isLoadingMsg: true });
                addToChatLog({ name: "You", message: input });
                setInput("")
                if (input === "orange") {
                    setAuth(true);
                    addNewGideonMessage("Greetings, how may I assist you?")
                }
                else {
                    addNewGideonMessage("Sorry, incorrect password.")
                }
            }
        }

        ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    const addNewGideonMessage = (msg) => {
        setIsLoadingMsg(false);
        addToChatLog({ name: "Gideon", message: displayMessage(msg) });
    }

    const addToChatLog = (newObj) => {
        setChatLog(prevChatLog => [...prevChatLog, newObj]);
    }

    const handleMessageChange = (e) => {
        setInput(e.target.value);
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleMessageSubmit();
        }
    }

    const displayMessage = (msg) => {
        if (msg.includes("https://")) {
            return (
                <Link href={msg} underline="none" target="_blank">
                    <Card sx={{ height: "auto", width: "100%", maxWidth: "400px", display: "inline-block" }} elevation={5} >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                width="100%"
                                image={msg}
                                alt=""
                            />
                        </CardActionArea>
                    </Card>
                </Link>
            )
        }
        else {
            return (parse(msg))
        }
    }

    return (
        <>
            <div className='roboto-mono header' onClick={() => window.location.reload()}>
                G<span><img alt="default" src={gideonGif} className='bot-display' /></span>de<span><CircularProgress className="loading" color="inherit" /></span>n
            </div>
            <div className="logs-container" ref={ref}>
                <Container fixed >
                    {chatLog ? chatLog.map((item, index) =>
                        <Grid container spacing={2} ref={ref}>
                            <Grid item xs={2}>
                                <img style={{ width: "2rem" }} alt="default" src={item.name === "Gideon" ? gideonImg : silhouetteImg} />
                                {item.name === "Gideon" ?
                                    <div style={{ fontWeight: "bold", color: "#1976d2" }}>{`${item.name}:`}</div>
                                    : <div style={{ fontWeight: "bold" }}>{`${item.name}:`}</div>}
                            </Grid>
                            <Grid item xs={8}>
                                {item.name === "Gideon" ?
                                    <div className='roboto-mono' style={{ color: "#1976d2" }}>{item.message}</div>
                                    : <div className='roboto-mono'>{item.message}</div>
                                }
                            </Grid>
                        </Grid>
                    ) : null}
                </Container>
            </div >
            {isLoadingMsg ? <CircularProgress className="loading" color="inherit" /> : null}
            <div className="input-container">
                <FormControl fullWidth>
                    <TextField sx={{ marginBottom: "1rem" }} label="You" variant="outlined" onChange={handleMessageChange} onKeyDown={_handleKeyDown} value={input} />
                </FormControl>
                <Button fullWidth sx={{ padding: "1rem" }} variant="contained" onClick={handleMessageSubmit}>Enter</Button>
            </div>
        </>
    )
}

export default Main;