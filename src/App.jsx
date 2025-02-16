
import Mainsection from './Mainsection';
import Header from './Header';

const App = () => {
  return (
    <div>
      <Header/>
      <Mainsection className='main'>
        <p>1/15</p>
        <p>Question?</p>
      </Mainsection>
    </div>
  );
};

export default App;
