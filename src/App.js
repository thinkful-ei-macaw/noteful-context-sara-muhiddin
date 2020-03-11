import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Main from './Components/Main';
import Note from './Components/Note';
import store from './store';
import UserContext from './Components/UserContext'

class App extends Component {

state = {
  notes: store.notes,
  folders: store.folders
}



render() {

  return (
    <UserContext.Provider value={{
      notesList: this.state.notes,
      foldersList: this.state.folders,
    }}>
    <div className="App">
      <Route exact path="/"   
      render={(props) => (
        <Main 
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
