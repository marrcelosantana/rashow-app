import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ArrowUpRight } from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import LogoImg from "@assets/white-logo.svg";
import PlayerImg from "@assets/player.png";

import { MatchCard } from "@components/MatchCard";
import { PlayerCard } from "@components/PlayerCard";
import { Avatar } from "@components/Avatar";

import { MatchDTO } from "@models/MatchDTO";
import { PlayerDTO } from "@models/PlayerDTO";

import { api } from "@services/api";

import {
  CardsContainer,
  Container,
  Header,
  HiddenItem,
  Highlight,
  HighlightImage,
  HighlightText,
  Info,
  InfoText,
  Link,
  LinkText,
} from "./styles";

export function Home() {
  const [matches, setMatchs] = useState<MatchDTO[]>([]);
  const [players, setPlayers] = useState<PlayerDTO[]>([]);

  const navigator = useNavigation<AppNavigatorRoutesProps>();

  async function fetchMatches() {
    try {
      const response = await api.get("/matches");
      setMatchs(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchPlayers() {
    try {
      const response = await api.get("/players");
      setPlayers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(
    useCallback(() => {
      fetchMatches();
      fetchPlayers();
    }, [])
  );

  return (
    <Container>
      <Header>
        <HiddenItem />
        <LogoImg />
        <Avatar uri="https://github.com/marrcelosantana.png" />
      </Header>

      <Highlight colors={["#0a84ff", "#0ac4ff"]}>
        <HighlightText>
          Gerencie seus{"\n"}rachas com{"\n"}facilidade e jogue{"\n"}com paixão!
        </HighlightText>
        <HighlightImage source={PlayerImg} />
      </Highlight>

      <Info>
        <InfoText>Meu histórico de partidas</InfoText>
        <Link onPress={() => navigator.navigate("historic")}>
          <LinkText>Mais Detalhes</LinkText>
          <ArrowUpRight size={15} color="#0a84ff" weight="bold" />
        </Link>
      </Info>

      <CardsContainer>
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 24 }}
          renderItem={({ item }) => <MatchCard match={item} />}
        />
      </CardsContainer>

      <Info>
        <InfoText>Jogadores cadastrados</InfoText>
        <Link onPress={() => navigator.navigate("players")}>
          <LinkText>Mais Detalhes</LinkText>
          <ArrowUpRight size={15} color="#0a84ff" weight="bold" />
        </Link>
      </Info>

      <CardsContainer>
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 24 }}
          renderItem={({ item }) => <PlayerCard player={item} />}
        />
      </CardsContainer>
    </Container>
  );
}
