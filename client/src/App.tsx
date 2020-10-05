import React, { useState, useEffect, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./themes";
import { InfoPanel } from "./layouts/InfoPanel";
import { PointButtons } from "./layouts/PointButtons";
import { VotingStatus } from "./layouts/VotingStatus";
import io from "socket.io-client";
import { Button } from "./components/Button";

const socket = io("http://localhost:5000");

//this isn't very secure!!
const useGetId = () => {
  const [id] = useState(Math.floor(Math.random() * 10000).toString());
  return id;
};

type updateFunc<T> = (newVal: T) => void;

interface userMap {
  [userId: string]: {
    username: string;
    vote?: number;
    showVote?: boolean;
    shouldSkip?:boolean;
  };
}

type userIdentity = (users: userMap) => userMap;

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
  setUsers?: (usersUpdate: userIdentity) => void;
}) => {
  const [state, setState] = useState(initialState);
  const updateFN = useCallback((newVal: T) => {
    socket.emit(socketName, {
      value: newVal,
      userId: userId,
    });
  }, []);

  useEffect(() => {
    socket.on(`${socketName}_updated`, (data: { userId: string; value: T }) => {
      if (userId === data.userId) {
        setState(data.value);
      }
      if (userField && setUsers) {
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
  }, [socketName, userId, userField, setUsers]);

  return [state, updateFN] as [T, updateFunc<T>];
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
  const [, setShowVote] = useServerUpdate({
    initialState: false,
    socketName: "show_vote",
    userId: myId,
    userField: "showVote",
    setUsers: setUsers,
  });
  const [shouldSkip, setShouldSkip] = useServerUpdate({
    initialState: false,
    socketName: "set_skip",
    userId: myId,
    userField: "shouldSkip",
    setUsers: setUsers,
  });
  const [username, setUsername] = useServerUpdate<undefined | string>({
    initialState: "",
    socketName: "username",
    userId: myId,
    userField: "username",
    setUsers: setUsers,
  });
  const [vote, setVote] = useServerUpdate<undefined | number>({
    initialState: undefined,
    socketName: "vote",
    userId: myId,
    userField: "vote",
    setUsers: setUsers,
  });
  useEffect(() => {
    console.log();
    socket.on("reset_votes", () => {
      setVote(undefined);
      setShowVote(false);
    });
  }, [setShowVote, setVote]);
  useEffect(() => {
    socket.on("request_sync", () => {
      if (users) {
        socket.emit("sync_clients", { users: users, userId: myId });
      }
    });
    socket.on("send_sync_data", (data: { users: userMap; userId: string }) => {
      if (data.userId !== myId && data.users) {
        setUsers(data.users);
      }
    });
    return () => {
      socket.off("request_sync");
      socket.off("send_sync_data");
    };
  }, [myId, users]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <div>
            <InfoPanel
              roomName="Test Room"
              username={username}
              changeUsername={(e) => setUsername(e.target.value)}
              shouldSkip={shouldSkip}
              setShouldSkip={() => setShouldSkip(!shouldSkip)}
            />
            <PointButtons
              pointValues={[0.5, 1, 2, 5, 8, 9, 15]}
              style={{ marginTop: "150px" }}
              selectedValue={vote}
              onChange={setVote}
            />
          </div>
          <div>
            <VotingStatus
              voters={Object.values(users).reduce(
                (userMap, user) => ({
                  ...userMap,
                  [user.username]: {
                    status: user.shouldSkip ? null : user.vote,
                    voteValue:
                      Object.values(users).filter((user) => user.showVote)
                        .length > 0 && user.vote,
                  },
                }),
                {}
              )}
              style={{
                marginTop: "5rem",
                height: "80vh",
                overflowY: "scroll",
              }}
            />
            <div style={{ display: "flex" }}>
              <Button
                onClick={() => {
                  setShowVote(true);
                }}
                intent="SECONDARY"
              >
                Show Votes
              </Button>
              <Button
                intent="PRIMARY"
                onClick={() => {
                  socket.emit("reset_votes");
                }}
              >
                Clear Votes
              </Button>
            </div>
          </div>
        </AppContainer>
      </ThemeProvider>
    </>
  );
}

export default App;
