import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import TabsNavigation from './components/TabsNavigation';


function App() {
  // const [history, setHistory] = useState(false);
  // const [overview, setOverview] = useState(true);

  return (
    <div className="App">
      <Header/>
      <TabsNavigation>
        {/* {history && <HistoryTab/>}
        {overview && <OverviewTab/>} */}
      </TabsNavigation>
    </div>
  );
}

export default App;
