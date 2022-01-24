import React, { useEffect } from 'react';
import './App.css';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {ChainId, Token, WETH, Fetcher, Route} from '@dynamic-amm/sdk';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/dynamic-amm/dynamic-amm',
  }),
  fetchOptions: {
    mode: 'no-cors',
  },
  cache: new InMemoryCache(),
});

const ETH_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`;
function App() {
  const {
    loading: kncLoading,
    data: ethData,
  } = useQuery(ETH_QUERY, {
    variables: {
      tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
  });
  
  const ethPriceInEth = ethData && ethData.tokens[0].derivedETH;
  


  // // DMM Factory Address if using Ethereum Mainnet
  // const DMMFactoryAddress = '0x833e4083B7ae46CeA85695c4f7ed25CDAd8886dE';
  
  // const USDC = new Token(
  //   ChainId.MAINNET,
  //   '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  //   18,
  // );
  // const pool = Fetcher.fetchPairData(
  //   USDC,
  //   WETH[USDC.chainId],
  //   DMMFactoryAddress,
  // );
  
  // const route = new Route([pool], WETH[USDC.chainId], DMMFactoryAddress);
  
  // // console.log(route.midPrice.toSignificant(6)); // 201.306
  // // console.log(route.midPrice.invert().toSignificant(6)); // 0.00496756


  return (
    <div>
      <br/>
      <div>
        eth price:{' '}
        {kncLoading
          ? 'Loading token data...'
          : // parse responses as floats and fix to 2 decimals
            parseFloat(ethPriceInEth)}
      </div>
      
    </div>
  );
}

export default App;