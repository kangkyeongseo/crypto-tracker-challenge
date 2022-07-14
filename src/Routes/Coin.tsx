import { useQuery } from "react-query";
import { useLocation, useParams, Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { getCoinInfo, getCoinTicker, ICoinInfo, ICointickers } from "../api";

const Title = styled.h1`
  display: block;
  text-align: center;
  padding: 30px;
`;

const Loading = styled.div``;

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: black;
  padding: 10px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: white;
  padding: 30px 10px;
  border-radius: 30px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  span:first-child {
    margin-bottom: 10px;
    font-size: 20px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
  color: white;
`;

const Supply = styled(Head)``;

const Taps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Tap = styled.div`
  width: 100%;
  background-color: white;
  margin: 0px 5px;
  padding: 10px 30px;
  border-radius: 30px;
  text-align: center;
`;

interface IState {
  name: string;
}

function Coin() {
  const { coinId } = useParams();
  const location = useLocation();
  const state = location.state as IState;
  const { data: infoData, isLoading: infoLoading } = useQuery<ICoinInfo>(
    ["info", coinId],
    () => getCoinInfo(coinId!)
  );
  const { data: tickerData, isLoading: tickerLoading } = useQuery<ICointickers>(
    ["ticker", coinId],
    () => getCoinTicker(coinId!)
  );
  const loading = infoLoading || tickerLoading;
  return (
    <>
      <Title>
        {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
      </Title>
      <Wrapper>
        {loading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            <Head>
              <Content>
                <span>Rank</span>
                <span>{infoData?.rank}</span>
              </Content>
              <Content>
                <span>Symbol</span>
                <span>{infoData?.symbol}</span>
              </Content>
              <Content>
                <span>price</span>
                <span>{tickerData?.quotes.USD.price.toFixed(3)}</span>
              </Content>
            </Head>
            <Description>{infoData?.description}</Description>
            <Supply>
              <Content>
                <span>Total Supply</span>
                <span>{tickerData?.total_supply}</span>
              </Content>
              <Content>
                <span>Max Supply</span>
                <span>{tickerData?.max_supply}</span>
              </Content>
            </Supply>
            <Taps>
              <Tap>
                <Link to="price">Price</Link>
              </Tap>
              <Tap>
                <Link to="chart">Chart</Link>
              </Tap>
            </Taps>
            <Outlet />
          </>
        )}
      </Wrapper>
    </>
  );
}

export default Coin;
