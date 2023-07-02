// import React, { useEffect, useState } from 'react'
// import  imageUrlBuilder  from '@sanity/image-url'
// import  client  from "../../lib/sanity"
// import styled from 'styled-components'
// import {FaCheck} from 'react-icons/fa'

// const CoinItem = (
//     key,
//     token,
//     sender,
//     selectedToken,
//     setSelectedToken,
//     thirdWebTokens,
//     sanityTokens,
//     setAction
// ) => {

//     const [balance, setBalance] = useState('Fetching...')
//     const [imageUrl, setImageUrl] = useState(null);

//     useEffect(()=>{
//         const getBalance = async () =>{
//             let activeThirdWebToken

//             thirdWebTokens.map(thirdWebToken => {
//                 if(thirdWebToken.address === token.contractAddress){
//                     activeThirdWebToken = thirdWebToken
//         }})

//             const balance = await activeThirdWebToken.balanceOf(sender)

//             return await setBalance(balance.displayValue.split('.')[0])
//         }

//         const getImgUrl = async () =>{
//         const builder = imageUrlBuilder(client).projectId('xwh0hdbg').dataset('production');
//         const imageUrl = builder.image(token?.logo?.asset?._ref).url();
//         setImageUrl(imageUrl);
//         } 
//         getImgUrl()
//         getBalance()
// },[])




//   return (
//     <Wrapper style={{backgroundColor: selectedToken.name === token.name && '#141519',}}> 
//         <Main>
//             <Icon>
//                 <img src={imageUrl} alt=''/>
//             </Icon>
//         </Main>
//     </Wrapper>
//   )
// }

// export default CoinItem

// const Wrapper = styled.div`
//     display: flex;
//     align-items: center;
//     padding: 1rem 0.5rem;
//     border-radius: 0.5rem;
//     margin-bottom: 0.3rem;

//     &:hover{
//         background-color: #0e0f14;
//     }
// `

// const Main = styled.div`
//     flex: 1;
//     display: flex;
//     align-items: center;
// `

// const Icon = styled.div`
//     margin-right: 1rem;
//     height: 1.8rem;
//     width: 1.8rem;
//     border-radius: 50%;
//     overflow: hidden;
//     display: grid;
//     place-items: center;

//     & > img {
//         height: 100%;
//         width: 100%;
//         object-fit: cover;
//     }

// `

// const NameDetails = styled.div``

// const Name = styled.div`
//     font-size: 1.1rem;
//     margin-bottom: 0.2rem;
// `

// const Balance = styled.div``

// const IsSelected = styled.div`
//     margin-left: 0.5rem;
//     color: #3773f5
// `

import React, { useEffect, useState } from "react";
import  styled  from "styled-components";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../lib/sanity";
import { FaCheck } from "react-icons/fa";

const CoinItem = ({
  key,
  token,
  sender,
  selectedToken,
  setSelectedToken,
  thirdWebTokens,
  sanityTokens,
  setAction,
}) => {
  const [balance, setBalance] = useState("Fetching...");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getBalance = async () => {
      let activeThirdWebToken;

      thirdWebTokens.map((thirdWebToken) => {
        if (thirdWebToken.address === token.contractAddress) {
          activeThirdWebToken = thirdWebToken;
        }
      });

      const balance = await activeThirdWebToken.balanceOf(sender);

      return await setBalance(balance.displayValue.split(".")[0]);
    };

    const getImageUrl = async () => {
      const builder = imageUrlBuilder(client)
        .projectId("2zdx3eow")
        .dataset("production");
      const url = builder.image(token?.logo?.asset?._ref).url();
      setImageUrl(url);
    };

    getImageUrl();
    getBalance();
  }, []);

  return (
    <Wrapper
      style={{
        backgroundColor: selectedToken.name === token.name && "#141519",
      }}

      onClick={() => {
        setSelectedToken(token);
        setAction('send')
      }}
    >
      <Main>
        <Icon>
          <img src={imageUrl} alt="" />
        </Icon>
        <NameDetails>
            <Name>
                {token.name}
            </Name>
            <Symbol>
                {token.symbol}
            </Symbol>
        </NameDetails>
      </Main>
      <Balance>{balance} {token.symbol} </Balance>
      <isSelected>
        {Boolean(selectedToken.contractAddress === token.contractAddress) && (<FaCheck style = {{ color: '#3773f5', marginLeft: '0.3rem', marginRight: '0.2rem'}}
            />)}
      </isSelected>
    </Wrapper>
  );
};

export default CoinItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.3rem;

  &:hover {
    background-color: #0e0f14;
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-right: 1rem;
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;

  & > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const NameDetails = styled.div``;

const Name = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
`;

const Balance = styled.div``;

const isSelected = styled.div`
  margin-left: 1rem;
  color: #3773f5;
`;

const Symbol = styled.div`
    color: #888f9b;
    font-size: 0.8rem;
`