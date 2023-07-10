
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
import {SocketProvider} from './Context/SocketContext'

// const URL = process.env.PORT === 'production' ? undefined : 'http://localhost:5000';

const SocketURL = 'https://hubo3.domainenroll.com'




export default function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
      <SocketProvider url = {SocketURL}>
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
        </SocketProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
