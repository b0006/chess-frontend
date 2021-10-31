import React, { useEffect } from 'react';

import { Button } from '../../components/Common/Button';
import { Container } from '../../components/Layout/Container';
import { LobbyMenu } from '../../components/Lobby/LobbyMenu';
import { useFetchDataApi } from '../../hook/useFetchDataApi.hook';
import { useWebsocket } from '../../hook/useWebsocket.hook';
import { userStore } from '../../mobx';
import { Party } from '../../mobx/userStore';

const OnlineLobbyPage: React.FC = () => {
  const { sendWsMsg, listenWsMsg } = useWebsocket();
  const { updatePartyList } = userStore;

  const [isLoading, fetchPartyList] = useFetchDataApi<any, Party[]>('/api/chess/', 'GET');

  useEffect(() => {
    const request = async () => {
      const { error, response } = await fetchPartyList();

      if (error || !response) {
        return;
      }

      updatePartyList(response);
    };

    request();
  }, [fetchPartyList, updatePartyList]);

  useEffect(() => {
    listenWsMsg('userTest', (message) => {
      console.log('FROM SERVER', message);
    });
  }, [listenWsMsg]);

  return (
    <Container>
      <LobbyMenu isLoading={isLoading} />
      <Button text="Send test ws" onClick={() => sendWsMsg('userTest', { type: 'cc', data: 'dd' })} />
    </Container>
  );
};

export { OnlineLobbyPage };
