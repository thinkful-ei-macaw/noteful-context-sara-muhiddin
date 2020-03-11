import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Main from './Components/Main';
import Note from './Components/Note';
import UserContext from './Components/UserContext'

class App extends Component {

state = {
  notes: [],
  folders: []
}

handleDelete = (noteId) => {
  fetch(`http://localhost:9090/notes/${noteId}`,
   { method: 'DELETE',
    headers: { 'content-type': 'application/json' },
   })
  .then(res => res.json())
  .then(notes => {
    this.setState({notes: this.state.notes.filter(note => note.id !== noteId)})
  })
}

componentDidMount() {
  fetch('http://localhost:9090/folders')
  .then(res => res.json())
  .then(folders => {
    fetch('http://localhost:9090/notes')
    .then(res => res.json())
    .then(notes => {
      this.setState({notes: notes, folders: folders})
      
    })
  })
}

render() {

  return (
    <UserContext.Provider value={{
      notesList: this.state.notes,
      foldersList: this.state.folders,
      handleDelete: this.handleDelete
    }}>
    <div className="App">
      <Route exact path="/"   
      render={(props) => (
        <Main 
          notesList = {this.state.notes}
          history={props.history}
        />
      )}
    />
    <Route exact path="/folder/:folderId"   
      render={(props) => (
        <Main 
          foldersList = {this.state.folders}
          notesList = {this.state.notes.filter(note => note.folderId === props.match.params.folderId)}
          history={props.history}
          selectedFolderId = {props.match.params.folderId}
        />
      )}
    />
    <Route exact path="/note/:noteId"   
      render={(props) => {
        let note = this.state.notes.find((note) => note.id === props.match.params.noteId);
        let folder = this.state.folders.find(folder => folder.id === note.folderId);
        return (
        <Note 
          currentFolder = {folder}
          currentNote = {note}
          history={props.history}
        />
      )}}
    />
    </div>
    </UserContext.Provider>
  );
  } 
}

export default App;
