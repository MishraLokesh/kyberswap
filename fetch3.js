import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';


new ApolloClient({
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
  console.log(ethPriceInEth);
}