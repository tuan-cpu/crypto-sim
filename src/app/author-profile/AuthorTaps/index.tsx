import React from 'react';

//INTERNAL IMPORT
import Style from './AuthorTaps.module.css';

interface Props{
  collectibles: boolean,
  created: boolean,
  like: boolean,
  follower: boolean,
  following: boolean
}

const AuthorTaps: React.FC<Props> = ({collectibles,created,like,follower,following}) => {
  return (
    <div>AuthorTaps</div>
  )
}

export default AuthorTaps