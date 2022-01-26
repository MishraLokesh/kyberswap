import csvwriter from 'csv-writer'
import axios from 'axios';

var res = {};
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
          first:1000){
          
          id
          name
          symbol
          derivedETH
        }
      }
      `
    }
  )

  res = result.data.data.tokens;
  console.log(res)


  var createCsvWriter = csvwriter.createObjectCsvWriter

  const csvWriter = createCsvWriter({

  path: 'data.csv',
  header: [
    // {id: 'id', title: 'ID'},
    {id: 'symbol', title: 'SYMBOL'},
    {id: 'name', title: 'NAME'},
    {id: 'derivedETH', title: 'PRICE'},
  ]
  });

  for (var key in res) {
    if (res[0].hasOwnProperty(key)) {
        console.log(key + " -> " + res[key]);
    }
  }

  csvWriter
  .writeRecords(res)
  .then(()=> console.log('Data uploaded into csv successfully'));

}

main();


