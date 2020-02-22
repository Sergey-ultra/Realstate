import React from "react";
import Posts from "./posts/Posts";
import s from "./MyPosts.module.css";

const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Posts message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef();

    let add = () => {
        props.dispatch({type: 'ADD-POST'});
    }
    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: text});
    }

    return (
        <div className={s.postsBlock}>
            <h3> My posts </h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              ref={newPostElement}
                              value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={add}> Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}

            </div>
        </div>
    )
};

export default MyPosts;