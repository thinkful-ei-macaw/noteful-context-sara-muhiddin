import React, { Component } from 'react';
import moment from 'moment';
import '../App.css';
import {Link} from 'react-router-dom';

class NotesList extends Component {
 
 render() {

   let notes = this.props.notesList.map(note => {
     return (    
    <li className='noteItem' key={note.id}>
            <Link to={"/note/" + note.id}><h2>{note.name}</h2></Link>
          Date modified:   {moment(note.modified).format('LL')}
          <button className="delete">Delete</button>
        </li>
    )
  })

  return (
    <div className="NotesList">
      <ul>
        {notes}
      </ul>
    </div>
  );  
  }
}
export default NotesList;
  