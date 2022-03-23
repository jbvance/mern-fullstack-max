import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Max Schwarz',
      image:
        'https://media-exp1.licdn.com/dms/image/C5603AQGXZH9qC6vluA/profile-displayphoto-shrink_800_800/0/1631111854658?e=1653523200&v=beta&t=CfxTliivMwMAN0u52kb40e85t2XlfmxYSaPeaZi2Pvw',
      places: 3
    }
  ];
  return <UsersList items={USERS} />;
};

export default Users;
