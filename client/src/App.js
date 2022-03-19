import './App.css';
import styled from 'styled-components';
import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import Dashboard from './components/Dashboard';
// import Decks from './components/Decks';
// import Hands from './components/Hands';
// import CardInput from './components/CardInput';
// import Test from './components/Test';

function App() {
  return <Container>
    <Navbar />
    {/* <Decks /> */}
    {/* <Hands /> */}
    {/* <CardInput /> */}
    {/* <Test /> */}
  </Container>
}

const Container = styled.div`
    // display:flex;
    // height: 96vh;
`;

export default App;