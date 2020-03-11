import React, { Component } from 'react';
import moment from 'moment';
import '../App.css';
import {Link} from 'react-router-dom';
import UserContext from './UserContext';

class NotesList extends Component {

  static contextType = UserContext;
 
 render() {
  const {handleDelete} = this.context;

   let notesList = this.props.notesList.map(note => {
     return (    
    <li className='noteItem' key={note.id}>
            <Link to={"/note/" + note.id}><h2>{note.name}</h2></Link>
          Date modified:   {moment(note.modified).format('LL')}
          <button className="delete" onClick={() => handleDelete(note.id)}>Delete</button>
        </li>
    )
  })

  return (
    <div className="NotesList">
      <ul>
        {notesList}
      </ul>
    </div>
  );  
  }
}
export default NotesList;
  