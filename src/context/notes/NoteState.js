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
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxM2ZiNzFkMTkyMmFkMGQ1ZTMxZmIzIn0sImlhdCI6MTY3OTAzOTM0M30.tIHLB24pJWOXqSW_5zJp_MT5IZPPmrC32KIfmW_nfbs"
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
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxM2ZiNzFkMTkyMmFkMGQ1ZTMxZmIzIn0sImlhdCI6MTY3OTAzOTM0M30.tIHLB24pJWOXqSW_5zJp_MT5IZPPmrC32KIfmW_nfbs"
            },
            body: JSON.stringify({title,description,tag})
        });
        // const json =  response.json();

        console.log("Adding a new note")
        const note = {
            "_id": "641430dc872cd39da7616883",
            "user": "6413fb71d1922ad0d5e31fb3",
            "title": title,
            "description": description,
            "tag": tag,
            "__v": 0  
        };
        setNotes(notes.concat(note))//for pushing notes
    }

    const deleteNote = async (id) =>{

        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxM2ZiNzFkMTkyMmFkMGQ1ZTMxZmIzIn0sImlhdCI6MTY3OTAzOTM0M30.tIHLB24pJWOXqSW_5zJp_MT5IZPPmrC32KIfmW_nfbs"
            },
        });
        const json =  response.json();
        console.log(json);

        console.log("Deleting the note"+id);
        const newNotes = notes.filter((abc)=>{return abc._id!==id})//abc=note because notes consist note object
        //If the _id property of the current note is not equal to the id argument, the filter() method will keep that element in the array. Otherwise, it will remove it.
        setNotes(newNotes)
    }

    const editNote = async (id,title,description,tag)=>{
        //Api Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxM2ZiNzFkMTkyMmFkMGQ1ZTMxZmIzIn0sImlhdCI6MTY3OTAzOTM0M30.tIHLB24pJWOXqSW_5zJp_MT5IZPPmrC32KIfmW_nfbs"
            },
            body: JSON.stringify({title,description,tag})
        });
        const json =  response.json();

        //Login to edit in client
        for (let index = 0;index < notes.length;index++){
            const element = notes[index];
            if(element._id === id){
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
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