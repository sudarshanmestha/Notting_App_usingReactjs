import { useState } from 'react';


function NoteListItem(props) {
  const incompleteStyle = {}
  const completeStyle = {
    textDecoration: "line-through"
  }

  function handleComplete() {
    props.completeNote(props.index)
  }
  function handleDelete() {
    props.deleteNote(props.index)
  }


  return (
    <li>
      <div>
        <div style={props.note.complete ? completeStyle : incompleteStyle}>
          {props.note.description}</div>
        <button type="button" onClick={handleComplete}>complete</button>
        <button type="button" onClick={handleDelete}>delete</button>
      </div>
    </li>
  )
}



function NoteLists(props) {
  return (
    <ul>
      {props.notes.map((note, i) => {
        return (
          <NoteListItem 
          note={note} 
          key={i} 
          index={i}
          completeNote={props.completeNote}
          deleteNote={props.deleteNote}
          />
        )
      })}
    </ul>
  )
}





function NoteFrom(props) {
  const [description, setDescription] = useState("")
  const [erroMessage, setMessage] = useState(null)
  function handleSubmit(e) {
    e.preventDefault()
    if (description.length > 3){
      props.addNote(description)
      setDescription("")
      setMessage(null)
    } else {
      setMessage("Please enter nore than 3 characters")
    }
    
  }
  return(
    <div>
    {erroMessage && (
      <p>{erroMessage}</p>
    )}
    <form onSubmit={handleSubmit}>
        <input 
        name="description" 
        type="text" 
        value={description}
        onChange={e => setDescription(e.target.value)} />
        <button type="submit">submit</button>
    </form>
    </div>
  )
}






function App() {
  const [notes, setNotes] = useState([
    { description: "Do the laundry", complete: false },
    { description: "wash the car", complete: false },
    { description: "Do the coding", complete: false },

  ])

  function addNote(description) {
    setNotes([
      ...notes,
      {description, complete: false}
    ])
  }


  function completeNote(index){
    setNotes([
      ...notes.slice(0, index),
      {...notes[index], complete:true },
      ...notes.slice(index+1),
    ])
  }
  function deleteNote(index){
    setNotes(notes.filter((_, i) => i !== index))
  }

  return (
    <div>
      <NoteFrom addNote={addNote} />
        <NoteLists notes={notes} 
        completeNote={completeNote}
        deleteNote={deleteNote}
        />
    </div>
  );
}

export default App;
