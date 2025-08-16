import styled from "styled-components";
import ThreeScene from "./components/ThreeScene";
import Portfolio from "./components/Portfolio";
import GlobalStyles from "./styles/GlobalStyles";

const AppContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <ThreeScene />
        <Portfolio />
      </AppContainer>
    </>
  );
}

export default App;
