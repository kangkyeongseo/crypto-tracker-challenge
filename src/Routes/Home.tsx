import { useQuery } from "react-query";
import { getCoins, ICoin } from "../api";
import styled from "styled-components";

const Wrapper = styled.div``;

const Loading = styled.div``;

function Home() {
  const { data, isLoading } = useQuery<ICoin[]>("coins", getCoins);
  return (
    <Wrapper>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          {data?.slice(0, 100).map((coin) => (
            <div key={coin.id}>{coin.name}</div>
          ))}
          |
        </>
      )}
    </Wrapper>
  );
}

export default Home;
