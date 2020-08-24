import React, {useState} from "react";
import s from "./MyPosts.module.scss";
import avatar from '../../../assets/images/1421138632_frozen-480x800.jpg'



export const MyPosts = () => {
     const [posts, setPosts] = useState([
         {id: 2, message: 'How are you' },
         {id: 3, message: 'first like' },
         {id: 4, message: 'Yo' },
         {id: 5, message: 'Yo' }
     ])

    const onAddPost = values => {setPosts(posts.concat({message: values.newPostText}))}
    return (
        <div className={s.post}>
            <div className={s.post__title}>Мои сообщения</div>
            <div className={s.posts__main}>
                {posts.map(p =>
                    <div className={s.item}>
                        <img src={avatar}/>
                        <div className ={s.postElement}>{p.message}</div>
                    </div>
                    )}
            </div>
        </div>
    )
}


