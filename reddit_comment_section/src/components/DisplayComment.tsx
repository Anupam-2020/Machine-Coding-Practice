import { useState } from "react";
import type { Comment } from "../types/types";


export function DisplayComment({ id, text, child, style, handleInputAdd}: { id: string, text: string, child: Comment[], style: string, handleInputAdd: (id: string, inp: string) => void }) {
    const [showList, setShowList] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [input, setInput] = useState('');

    const handleCloseInput = () => {
        setShowInput(false);
        setInput('');
    }

    const handleAddComment = () => {
        handleInputAdd(id, input);
        setShowInput(!showInput)
        setInput('');
    }
    
    return (
        <div style={{marginLeft: style}} key={id}>
            <span>{text}</span>
            {child.length > 0 && <button onClick={() => setShowList(!showList)}>{showList ? 'Hide' : 'Show'}</button>}
            <button onClick={handleAddComment}>{showInput ? 'Add' : 'Reply'}</button>
            {showInput && (<><input onChange={(e) => setInput(e.target.value)} type="text" placeholder="Reply..." value={input}/> <button onClick={handleCloseInput}>Close</button></>)}
            {showList && child.length !== 0 ? child.map(comm => <DisplayComment id={comm.id} text={comm.text} child={comm.child} style={'20px'} handleInputAdd={handleInputAdd}/>) : null}
        </div>
    )
}