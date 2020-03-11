import React, { Component } from 'react';
import UserContext from './UserContext';
import '../App.css';

class FolderSidebar extends Component {
  static contextType = UserContext;

  render() {
    const {foldersList} = this.context;
    
  let folders = foldersList.map(folder => {
    return (
      <div className={this.props.selectedFolderId === folder.id ?
          "folderSelected folderItem" : "folderItem"} onClick={() =>
            {this.props.history.push('/folder/'+ folder.id)}}
            key={folder.id}>{folder.name}</div>
    )
  })
  

  return (
    <div className="FolderSidebar">
      {folders} 
    </div>
  );
  }
}
export default FolderSidebar;
