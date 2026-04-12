import { useState } from 'react';
import './App.css';
import { initialComments } from './data/data';
import type { Comment } from './types/types';
import { DisplayComment } from './components/DisplayComment';

function App() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [showList, setShowList] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const addReply = (comments: Comment[], id: string, newComment: Comment): Comment[] => {
    return comments.map(comment => {
      if(comment.id === id) {
        return {
          ...comment,
          child: [...comment.child, newComment]
        };
      }

      return {
        ...comment,
        child: addReply(comment.child, id, newComment)
      }
    })
  }


  const handleInputAdd = (id: string = '', val: string = '') => {
    const text = val || comment;
    if(!text) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      text,
      child: []
    };

    setComments((prev) => {
      if(!id) {
        return [...prev, newComment];
      }

      return addReply(prev, id, newComment);
    });

    setComment('');
  }


  return (
    <div>
      <input type="text" placeholder='Add comment' value={comment} onChange={(e) => setComment(e.target.value)}/>
      <button onClick={() => handleInputAdd()}>Add Comment</button>
      {comments.length > 0 && <button onClick={() => setShowList(!showList)}>{showList ? 'Hide' : 'Show'}</button>}
      {showList && comments.map(comment => {
        return (
          <div key={comment.id}>
            <DisplayComment id={comment.id} child={comment.child} text={comment.text} style={'20px'} handleInputAdd={handleInputAdd}/>
          </div>
        )
      })}
    </div>
  )
}

export default App;
