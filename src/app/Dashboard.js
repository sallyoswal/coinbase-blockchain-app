import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Main from '../../components/Main'
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar'
import {ThirdwebSDK} from '@3rdweb/sdk'
import {ethers} from 'ethers';


// const sdk = new ThirdwebSDK(
//     new ethers.Wallet(
//         process.env.NEXT_PUBLIC_METAMASK_KEY,
//         ethers.getDefaultProvider(
//             'https://sepolia.infura.io/v3/')
//     )
// )

var provider = ethers.providers.getDefaultProvider("https://sepolia.infura.io/v3/2f0625233e9d47ef9c14be112fa0d095");
// var provider = ethers.providers.getDefaultProvider("https://sepolia.infura.io/v3/7Q7WI7N679KKVJ4JSZ45Z1D85FUM52HPHU");
const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.NEXT_PUBLIC_METAMASK_KEY,
        provider
    )
);



const Dashboard = ({address}) => {
    const[sanityTokens, setsanityTokens] = useState ([]);
    const[thirdWebTokens, setThirdWebTokens] = useState ([]);

    useEffect(() => {
        const getSanityAndThirdWebTokens = async () => {
            
                const coins = await fetch ("https://xwh0hdbg.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D'coins'%5D%20%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%2C%0A%7D")
                const sanityTokens = (await coins.json()).result
                setsanityTokens(sanityTokens)
        
                setThirdWebTokens( sanityTokens.map(token => sdk.getTokenModule(token.contractAddress)) )
        }

        return getSanityAndThirdWebTokens()
    }, [])

    return (
        <Wrapper>
            <Sidebar/>
            <MainContainer>
                <Header walletAddress={address} sanityTokens={sanityTokens} thirdWebTokens={thirdWebTokens}/>
                <Main walletAddress={address} sanityTokens={sanityTokens} thirdWebTokens={thirdWebTokens}/>
            </MainContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    background-color: #0a0b0d;
    color: white;
`

const MainContainer = styled.div`
    flex: 1;
`

export default Dashboard