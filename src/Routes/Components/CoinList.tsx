import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px 10px;
  border-radius: 35px;
  margin-bottom: 10px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 50px;
  margin-right: 10px;
`;

const Title = styled.h3``;

const Arrow = styled.span`
  margin-right: 20px;
`;

interface IPropType {
  name: string;
  image: string;
}

function CoinList({ name, image }: IPropType) {
  return (
    <Wrapper>
      <Col>
        <Icon src={image} />
        <Title>{name}</Title>
      </Col>
      <Col>
        <Arrow>▶︎</Arrow>
      </Col>
    </Wrapper>
  );
}

export default CoinList;
