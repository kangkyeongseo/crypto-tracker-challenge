import { useQuery } from "react-query";
import { getCoins, ICoins } from "../api";
import styled from "styled-components";
import CoinList from "./Components/CoinList";
import { Link } from "react-router-dom";

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
  const { data, isLoading } = useQuery<ICoins[]>("coins", getCoins);
  console.log(data);
  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Title>Coin Tracker</Title>
          <Wrapper>
            {data?.slice(0, 100).map((coin) => (
              <Link to={`${coin.id}`} key={coin.id} state={{ name: coin.name }}>
                <CoinList
                  name={coin.name}
                  image={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
              </Link>
            ))}
          </Wrapper>
        </>
      )}
    </>
  );
}

export default Home;
