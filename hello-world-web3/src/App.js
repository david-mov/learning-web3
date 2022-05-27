import './App.css';
import { useEffect, useCallback } from 'react'
import {useWeb3React} from '@web3-react/core'
import { connector } from './config/web3'

function App() {

  const {
    activate, 
    active, 
    deactivate, 
    account, 
    error, 
    chainId 
  } = useWeb3React()

  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', true)  
  }, [activate])

  const disconnect = () => {
    deactivate()
    localStorage.removeItem('previouslyConnected')
  }  

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') {
      connect()
    }
  }, [connect])

  if (error) {
    return (
      <p>
        Oops, something went wrong!<br/>
        {error.message}
      </p>
    )
  }

  return (
    <div className="App">

      <h1>Web3 demo app</h1>

      {
        active
        ? (<>
            <button onClick={disconnect}>
              Disconnect Wallet
            </button>
            <p>
              You are connected to the network {chainId} <br/>
              Your account is: {account}
            </p>
          </>)
        : <button onClick={connect}>Connect Wallet</button>
      }

    </div>
  );
}

export default App;
