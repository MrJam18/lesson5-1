import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Button, Icon, IconButton, TextField } from '@material-ui/core';
import { useRef } from 'react';
const useStyles = makeStyles({
    list: {
        width: '300px',
        borderRight: '1px solid black',
        zIndex: 1,
        alignSelf: 'stretch',
        padding: 0
    },
    input: {
      display: 'block',
      margin: '15px auto',
    }
})

const ChatList = ({chatList, pushChatList, deleteChat}) => {
  const { chatID } = useParams();
  const classes = useStyles();
  const input = useRef();
  const [addChatToggle, setAddChatToggle] = useState(true);
  const Assistent = ()=> {
      return (
        <div className="chat-list__assistent small-header">Please, select the chat for start messaging</div>
      )
    }
  const AddChatInput = () => {
      return <form className="add-chat-input" onSubmit={addChatHandler}>
        <TextField id="standard-basic" label="Enter chat-name" inputRef={input} className={classes.input} />
        <Button variant="contained" color="primary" onClick={addChatHandler} >
          Submit
        </Button>
      </form>
    }
  const AddChatButton = () => {
      return <div className="container__position_center" onClick = {addChatButtonHandler}>
      <IconButton>
      <Icon style={{ fontSize: 30 }}>add_circle</Icon>
      </IconButton>
      </div>
    }
  const addChatButtonHandler = () => {
    setAddChatToggle(false);
  }
  const addChatHandler = (ev) => {
    ev.preventDefault();
    pushChatList(input.current.value);
    setAddChatToggle(true);
  }
  const deleteChatHandler = (ev) => {
    ev.preventDefault();
    let currentChatID = ev.target.getAttribute('data-id');
    deleteChat(currentChatID);
  }
    return (
      <>
      <div className="container-flex">
      <List component="nav" aria-label="main mailbox folders" className={'chatList ' + classes.list}>
      {chatList.map((chat)=>{
        return (<NavLink to={`/chats/${chat.id}`} key= {chat.id} className='link chat-list__link'>
          <ListItem button selected = {chat.id === chatID ? true : false} >
               <ListItemIcon>
               <img src= {`/img/${chat.img}`} alt={chat.name} className='list-img'/>
               </ListItemIcon>
               <ListItemText primary={chat.name} />
               <i class="fas fa-times chat-list__button_delete" data-id = {chat.id} onClick={deleteChatHandler}></i>
             </ListItem>
             </NavLink>)
      })}
        {addChatToggle ? <AddChatButton /> : <AddChatInput />}
      </List>
      {chatID ? null : <Assistent></Assistent>}
      <Outlet></Outlet>
      </div>
      </>
    );
};


export default ChatList;