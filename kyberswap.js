const axios = require('axios');

const main = async () => {
  const result = await axios.post(
    'https://api.thegraph.com/subgraphs/name/dynamic-amm/dynamic-amm',
    {
      query : 
      `
      {
        tokens(
          where:{
            id: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
          }
          first:10){
          
          id
          name
          symbol
          derivedETH
        }
      }
      `
    }
  )

console.log(result.data.data);
}


main();