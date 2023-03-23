import NoteContext from "./noteContext";
import {useState} from "react";
const NoteState=(props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes,setNotes] = useState(notesInitial) 
    // const s1 = {
    //     "name":"Harry",
    //     "class":"5b"
    // }

    // const [state,setState] = useState(s1);

    // const update = () =>{
    //     setTimeout(()=>{
    //         setState({
    //             "name":"Larry",
    //             "class":"10b"
    //         })
    //     },1000);
    //}
    const getNotes = async() =>{
        //TODO: API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }


    const addNote = async(title,description,tag) =>{
        //TODO: API CALL
        const response = await fetch(`${host}/api/notes/addnote`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({title,description,tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note))//for pushing notes
    }

    const deleteNote = async (id) =>{

        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{//this id is note id we want to delete
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });
        const json =  response.json();
        console.log(json);

        // console.log("Deleting the note"+id);
        const newNotes = notes.filter((abc)=>{return abc._id!==id})//abc=note because notes consist note object
        //If the _id property of the current note is not equal to the id argument, the filter() method will keep that element in the array. Otherwise, it will remove it.
        setNotes(newNotes)
    }

    const editNote = async (id,title,description,tag)=>{
        //Api Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{//this id is note id we want to delete
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))//makes a deep copy of notes and saved to newNotes we do this bcoz react doesnt allowed to change the state using same array object i.e.note
        //Login to edit in client
        for (let index = 0;index < newNotes.length;index++){
            const element = newNotes[index];
            if(element._id === id){//we use index for rendering instanly on client side like if we update the second notes then only the second notes to be updated instantly
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        // <NoteContext.Provider value={{state,update}}>
        //     {props.children}
        // </NoteContext.Provider>
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;