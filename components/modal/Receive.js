import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {BiCopy} from 'react-icons/bi'
import {FaCheck} from 'react-icons/fa'
import  imageUrlBuilder  from '@sanity/image-url';
import  client  from "../../lib/sanity"


const Receive = ({setAction, selectedToken, walletAddress}) => {

    const[imageUrl, setImageUrl] = useState(null)
    const[copied, setCopied] = useState(false)

    useEffect(() => {
        console.log(selectedToken);
        const builder = imageUrlBuilder(client).projectId('xwh0hdbg').dataset('production');
        const imageUrl = builder.image(selectedToken?.logo?.asset?._ref).url();
        setImageUrl(imageUrl);
      }, [selectedToken]);

  return (
    <Wrapper>
        <Content>
            <QRContainer>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${walletAddress}`} alt=''/>
            </QRContainer>
            <Divider/>
            <Row>
                <CoinSelectList>
                    <Icon>
                        <img src={imageUrl} alt=""/>
                    </Icon>
                    <CoinName>{selectedToken.name}</CoinName>
                </CoinSelectList>
            </Row>
            <Divider/>
            <Row>
                <div>
                    <Title>{selectedToken.symbol}</Title>
                    <Address>{walletAddress}</Address>
                </div>
                <CopyButton onClick={()=>{
                    navigator.clipboard.writeText(walletAddress)
                    setCopied(true)
                }}>{copied ? <FaCheck style = {{ color: '#27ad75'}}/> : <BiCopy/>}</CopyButton>
            </Row>
        </Content>
    </Wrapper>
  )
}

export default Receive

const Wrapper = styled.div`
    height: 100%;
`

const Content = styled.div`
    border: 1px solid #282b2f;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
`

const QRContainer = styled.div`
    flex: 1;
    display: grid;
    place-items: center;
`

const Divider = styled.div`
    border-bottom: 1px solid #2822bf;
`

const Row = styled.div`
    display: flex;
    width: 100%;
    padding: 1rem;
    align-items: center;
    justify-content: space-between;
    color: #8a919e;
    font-size: 1.2rem;
`
const Icon = styled.div`
    margin-right: 1rem;
    height: 1.8rem;
    width: 1.8rem;
    border-radius: 50%;
    overflow: hidden;
    display: grid;
    place-items: center;

    & > img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`

const CoinSelectList = styled.div`
    display: flex;
    flex: 1.3;
    height: 100%;

    &:hover {
        cursor: pointer;
    }
`
const CoinName = styled.div`
    flex: 1;
    border: none;
    background: none;
    outline: none;
    color:white;
    font-size: 1.2rem;
    text-wrap: wrap;
    margin-right: 0.5rem;
`
const Title= styled.div`
    color: white;
    margin-bottom: 0.5rem;
`

const Address = styled.div`
    font-size :0.8rem;
`
const CopyButton = styled.div`
    cursor: pointer;
`

