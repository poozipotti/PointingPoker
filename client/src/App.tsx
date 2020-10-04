import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./themes";
import { InfoPanel } from "./layouts/InfoPanel";
import { PointButtons } from "./layouts/PointButtons";
import { VotingStatus } from "./layouts/VotingStatus";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

//this isn't very secure!!
const useGetId = () => {
  const [id] = useState(Math.floor(Math.random() * 10000).toString());
  return id;
};

type updateFunc<T> = (newVal: {
  userId: string;
  socketName: string;
  newValue: T;
}) => void;

interface userMap {
  [userId: string]: { username: string };
}

type userIdentity = (users:userMap) => userMap;

const useServerUpdate = <T extends unknown>({
  initialState,
  socketName,
  userId,
  userField,
  setUsers,
}: {
  initialState: T;
  socketName: string;
  userId: string;
  userField?: string;
  setUsers?: (usersUpdate:userIdentity) => void;
}) => {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    socket.on(`${socketName}_updated`, (data: { userId: string; value: T }) => {
      if (data.userId === userId) {
        setState(data.value);
      } else if (userField && setUsers) {
        //update our state with other user States
        setUsers((users) => ({
          ...users,
          [data.userId]: {
            ...(users[data.userId] || {}),
            [userField]: data.value,
          },
        }));
      }
    });
  }, [socketName, userId, userField,setUsers]);
  return [
    state,
    (newVal: { newValue: T }) => {
      socket.emit(socketName, {
        value: newVal.newValue,
        userId: userId,
      });
    },
  ] as [T, updateFunc<T>];
};

export const AppContainer = styled.div`
  background-color: ${(props) => props.theme.light};
  display: grid;
  grid-template: 100% / 2fr 1fr;
  width: 90%;
  grid-column-gap: 300px;
  margin: auto;
`;

function App() {
  const myId = useGetId();
  const [users, setUsers] = useState<userMap>({});
  const [username, setUsername] = useServerUpdate<undefined | string>({
    initialState: "",
    socketName: "username",
    userId: myId,
    userField: 'username',
    setUsers: setUsers
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <div>
            <InfoPanel
              roomName="Test Room"
              username={username}
              changeUsername={(e) =>
                setUsername({
                  socketName: "username",
                  newValue: e.target.value,
                  userId: myId,
                })
              }
            />
            <PointButtons
              pointValues={[0.5, 1, 2, 5, 8, 9, 15]}
              style={{ marginTop: "150px" }}
            />
          </div>
          <div>
            <VotingStatus
              voters={Object.values(users).reduce(
                (userMap, user) => ({
                  ...userMap,
                  [user.username]: { status: false },
                }),
                {}
              )}
              style={{ marginTop: "5rem" }}
            />
          </div>
        </AppContainer>
      </ThemeProvider>
    </>
  );
}

export default App;
