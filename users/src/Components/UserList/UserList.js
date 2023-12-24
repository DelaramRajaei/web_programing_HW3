import { useEffect, useState } from 'react';
import axios from 'axios';

import User from '../User/User';

const UserList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([])

    useEffect(() => {
        setIsLoading(true);
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => response.data)
            .then(users => {
                setIsLoading(false);
                setUsers(users);
            })
            .catch(err => {
                console.error(err);
            });
        return () => {
        }
    }, []);
    const loading = isLoading ? <span>Loading...</span> : <></>;
    const usersArray = users.map(user => <User key={user.id} email={user.email} phone={user.phone} website={user.website} name={user.name}></User>)
    return <div className='container'>
        {loading}
        {usersArray}
    </div>
}

export default UserList;