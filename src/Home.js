import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CSS from './App.css';
import {
  Button,
  Switch,
  Table, Thead, Tbody, Tr, Th, Td
} from '@chakra-ui/react';

const Home = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api');
      setJsonData(response.data);
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  const handleSwitchChange = async (userId, attend) => {
    try {
      await axios.patch(`http://localhost:3010/users/${userId}`, {
        attend: !attend,
      });

      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleAllAttend = async () => {
    try {
      await axios.patch('http://localhost:3010/users/attendall', {
        attend: true,
      });

      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleAllAbsent = async () => {
    try {
      await axios.patch('http://localhost:3010/users/absentall', {
        attend: false,
      });

      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <>
      <nav>
        <img src="" alt="" />
        <Button
        // onClick={roulette}
        colorScheme='blue'>ルーレット</Button>
        <a href="/Admin">Admin</a>
      </nav>



      <Button
        onClick={handleAllAttend}
        colorScheme='blue'
        variant='outline'
      >
        全て出席へ変更
      </Button>
      <Button
        onClick={handleAllAbsent}
        colorScheme='red'
        variant='outline'
      >
        全て欠席へ変更
      </Button>
      {jsonData && jsonData.users && (
        <Table variant='striped' colorScheme='blue'>
          <Thead>
            <Tr>
              <Th>#id</Th>
              <Th>#name</Th>
              <Th>#attend</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jsonData.users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td><a href={'/users/' + user.id}>{user.name}</a></Td>
                <Td>
                  <Switch
                    isChecked={user.attend}
                    onChange={() => handleSwitchChange(user.id, user.attend)}
                    colorScheme='blue'
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};

export default Home;