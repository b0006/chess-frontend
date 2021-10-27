import React, { useEffect } from 'react';

import { Container } from '../../components/Layout/Container';
import { LobbyMenu } from '../../components/Lobby/LobbyMenu';
import { useFetchDataApi } from '../../hook/useFetchDataApi.hook';
import { userStore } from '../../mobx';
import { Party } from '../../mobx/userStore';

const OnlineLobbyPage: React.FC = () => {
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

  return (
    <Container>
      <LobbyMenu isLoading={isLoading} />
    </Container>
  );
};

export { OnlineLobbyPage };
