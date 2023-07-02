'use client'
// don't need the below Image
// import Image from 'next/image'

import styled from 'styled-components'
import { useWeb3 } from '@3rdweb/hooks'
import Dashboard from './Dashboard'

//don't need the below styles
// import styles from './page.module.css'

export default function Home() {
  // wrapping the whole app in the thirdweb for authentication
  // this will also let us access the authentication related code to be accessible from any directory of the project
  
  const {address, connectWallet} = useWeb3();

  return(
        <Wrapper>
          {address ? (
              <Dashboard address={address} />
            ) : (
            <WalletConnect>
              <Button onClick = {() => connectWallet('injected')}>
                Connect Wallet
              </Button>
              <Details>
                You need Chrome to be <br /> able to run this app.
              </Details>
            </WalletConnect>
            )}
        </Wrapper>
  )

}


const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  max-width: 100vw;
  background-color: #0a0b0d;
  color: white;
  display: grid;
  place-items: center;
`

const WalletConnect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Button = styled.div`
  border: 1px solid #282b2f;
  padding: 0.8rem;
  font-size: 1.3 rem;
  font-weight: 500;
  border-radius: 0.4rem;
  background-color: #3773f5;
  color: #000;
  

  &:hover {
    cursor: pointer;
  }
`

const Details = styled.div`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
  color: #282b2f;
`
