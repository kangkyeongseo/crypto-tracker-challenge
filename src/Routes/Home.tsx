import { useQuery } from "react-query";
import { getCoins, ICoin } from "../api";
import styled from "styled-components";
import CoinList from "./Components/CoinList";

const Title = styled.h1`
  display: block;
  text-align: center;
  padding: 30px;
`;

const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  border-radius: 35px;
  padding: 20px 10px;
`;

const Loading = styled.div``;

function Home() {
  const { data, isLoading } = useQuery<ICoin[]>("coins", getCoins);
  console.log(data);
  return (
    <>
      <Title>Coin Tracker</Title>
      <Wrapper>
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            {data?.slice(0, 100).map((coin) => (
              <CoinList
                key={coin.id}
                name={coin.name}
                image={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
              />
            ))}
            |
          </>
        )}
      </Wrapper>
    </>
  );
}

export default Home;
