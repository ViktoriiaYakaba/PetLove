import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FriendsItem from '../friendsItem/FriendsItem'; 
import { fetchFriends } from '../../redux/friends/operation'; 
import { selectFriends, selectIsLoadingFriends, selectIsErrorFriends } from '../../redux/friends/selectors';
import style from './FriendsList.module.scss';

const FriendsList = () => {
    const dispatch = useDispatch();
    const friends = useSelector(selectFriends);
    const isLoading = useSelector(selectIsLoadingFriends);
    const isError = useSelector(selectIsErrorFriends);

    useEffect(() => {
        dispatch(fetchFriends());
    }, [dispatch]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading friends.</div>;

    return (
        <ul className={style.friendsList}> 
            {friends.map((friend) => (
                <li key={friend._id}> 
                    <FriendsItem friend={friend} /> 
                </li>
            ))}
        </ul>
    );
}

export default FriendsList;
