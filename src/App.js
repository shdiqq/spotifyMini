import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import {useEffect} from 'react';  
import {reducerCases} from './utils/Constant';
import {useStateProvider} from './utils/StateProvider';
import Spotify from './components/Spotify';

function App() {

  const [{accessToken}, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const accessToken = hash.substring(1).split('&')[0].split('=')[1];
      dispatch({type: reducerCases.SET_ACCESSTOKEN, accessToken});
    }
  }, [accessToken, dispatch]);
  
  if ( accessToken ) {
    return <Spotify />;
  } else {
    return <Login />;
  }
  
}

export default App;