import { useQuery } from "react-query";
import { useLocation, useParams, Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { getCoinInfo, getCoinTicker, ICoinInfo, ICointickers } from "../api";

const Header = styled.h1`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const HomeBtn = styled.div`
  background-color: black;
  padding: 10px;
  border-radius: 50%;
  svg {
    width: 25px;
    fill: white;
  }
`;

const ModeBtn = styled(HomeBtn)``;

const Loading = styled.div``;

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: black;
  padding: 10px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

const Supply = styled(Head)`
  grid-template-columns: repeat(2, 1fr);
`;

const Taps = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
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
      <Header>
        <HeaderContent>
          <HomeBtn>
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" />
              </svg>
            </Link>
          </HomeBtn>
        </HeaderContent>
        <HeaderContent>
          <Title>
            {state?.name ? state.name : loading ? "" : infoData?.name}
          </Title>
        </HeaderContent>
        <HeaderContent>
          <ModeBtn>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z" />
            </svg>
          </ModeBtn>
        </HeaderContent>
      </Header>
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
            <Outlet context={{ coinId }} />
          </>
        )}
      </Wrapper>
    </>
  );
}

export default Coin;
