import './App.css';
import { useState } from 'react';
import ActionsTable from './components/ActionsTable/ActionsTable';
import AppTable from './components/AppsTable/AppTable';
import ContainerTable from './components/ContainerTable/Container';
import TriggerTable from './components/TriggerTable/TriggerTable';

function App() {

  const [page, setPage] = useState('actions')

  return (
    <div className="app">
      <header className='header'>
        <h1>Tag manager</h1>
        <div className='change-page-btn'>
          <span className='btn-for-page' onClick={() => setPage('actions')}>Actions</span>
          <span className='btn-for-page' onClick={() => setPage('trigger')}>Triggers</span>
          <span className='btn-for-page' onClick={() => setPage('container')}>Containers</span>
          <span className='btn-for-page' onClick={() => setPage('app')}>Apps</span>
        </div>
      </header>
      <body>
        {page === 'actions' ? 
          <>
            <ActionsTable />
          </> : page === 'trigger' ?
          <>
            <TriggerTable /> 
          </> : page === 'app' ?
          <>
            <AppTable /> 
          </> : page === 'container' ?
          <>
            <ContainerTable /> 
          </> : <></>
        }
      </body>
    </div>
  );
}

export default App;
