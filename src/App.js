
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Talk from './Components/Pages/Talk';
import Responce from './Components/Pages/Responce';
import NotRes from './Components/Pages/NotRes';
import Conditions from './Components/Pages/Conditions';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
// import { Connector } from 'mqtt-react-hooks';




export default function App() {
  return (
    <BrowserRouter>
    {/* <Connector brokerUrl="wss://test.mosquitto.org:1884"></Connector> */}
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Talk />}>
          </Route>
          <Route path="Responce" element={<Responce />}>
          </Route>
          <Route path='NotRes' element={<NotRes />}>
          </Route>
          <Route path='Conditions' element={<Conditions />}>
          </Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
