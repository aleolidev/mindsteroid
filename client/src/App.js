import './App.css';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  return <Container>
    <Sidebar />
    <Dashboard />
  </Container>
}

const Container = styled.div`
    display:flex;
    height: 96vh;
`;

export default App;