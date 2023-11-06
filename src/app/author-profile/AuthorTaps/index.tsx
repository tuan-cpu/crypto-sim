import React, {useState} from 'react';

//INTERNAL IMPORT
import Style from './AuthorTaps.module.css';
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from 'react-icons/ti';

interface Props{
  setCollectibles: any,
  setCreated: any,
  setLike: any,
  setFollower: any,
  setFollowing: any
}

const AuthorTaps: React.FC<Props> = ({setCollectibles,setCreated,setLike,setFollower,setFollowing}) => {
  const [openList, setOpenList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState("Most Recent");
  const listArray = [
    "Created By Admin",
    "Most Appreciated",
    "Most Discussed",
    "Most Viewed"
  ];
  const openTab = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    const input = e.target as HTMLElement;
    const btnText = input.innerText;
    if(btnText == "Collectibles"){
      setCollectibles(true);
      setCreated(false);
      setLike(false);
      setFollower(false);
      setFollowing(false);
      setActiveBtn(1);
    }else if(btnText == "Created"){
      setCollectibles(false);
      setCreated(true);
      setLike(false);
      setFollower(false);
      setFollowing(false);
      setActiveBtn(2);
    }else if(btnText == "Liked"){
      setCollectibles(false);
      setCreated(false);
      setLike(true);
      setFollower(false);
      setFollowing(false);
      setActiveBtn(3);
    }else if(btnText == "Following"){
      setCollectibles(false);
      setCreated(false);
      setLike(false);
      setFollower(false);
      setFollowing(true);
      setActiveBtn(4);
    }else if(btnText == "Follower"){
      setCollectibles(false);
      setCreated(false);
      setLike(false);
      setFollower(true);
      setFollowing(false);
      setActiveBtn(5);
    }
  }
  const openDropDown = () =>{
    setOpenList(!openList);
  }
  return (
    <div className={Style.authorTaps}>
      <div className={Style.authorTaps_box}>
        <div className={Style.authorTaps_box_left}>
          <div className={Style.authorTaps_box_left_btn}>
            <button onClick={(e)=>openTab(e)} className={`${activeBtn == 1 ? Style.active:""}`}>
              Collectibles
            </button>
            <button onClick={(e)=>openTab(e)} className={`${activeBtn == 2 ? Style.active:""}`}>
              Created
            </button>
            <button onClick={(e)=>openTab(e)} className={`${activeBtn == 3 ? Style.active:""}`}>
              Liked
            </button>
            <button onClick={(e)=>openTab(e)} className={`${activeBtn == 4 ? Style.active:""}`}>
              Following
            </button>
            <button onClick={(e)=>openTab(e)} className={`${activeBtn == 5 ? Style.active:""}`}>
              Follower
            </button>
          </div>
        </div>
        <div className={Style.authorTaps_box_right}>
          <div className={Style.authorTaps_box_right_para} onClick={()=>openDropDown()}>
            <p>
              {selectedMenu}
            </p>
            {openList? <TiArrowSortedUp/>: <TiArrowSortedDown/>}
          </div>
          {openList && (
            <div className={Style.authorTaps_box_right_list}>
              {listArray.map((element,index)=>(
                <div key={index+1} className={Style.authorTaps_box_right_list_item} onClick={()=>setSelectedMenu(element)}>
                  <p>
                    {element}
                  </p>
                  <span>{selectedMenu == element && <TiTick/>}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthorTaps