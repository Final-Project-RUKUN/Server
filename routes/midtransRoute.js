
const route = require('express').Router()
const axios = require('axios')

route.post('/', (req,res)=>{
    axios({
      // Below is the API URL endpoint
      url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Basic " +
          Buffer.from("SB-Mid-server-FvpTFy-JcmtG9Bw5tS4rW-1E").toString("base64")
        // Above is API server key for the Midtrans account, encoded to base64
      },
      data:
        // Below is the HTTP request body in JSON
        {
          transaction_details: {
            order_id: "order-csb-111",
            gross_amount: req.body.amount
          },
          credit_card: {
            secure: true
          },
          customer_details: {
            first_name: req.body.username
          }
        }
      }).then( snapResponse => { 
        let snapToken = snapResponse.data.token;
        console.log("Retrieved snap token:", snapToken);
        // Pass the Snap Token to frontend, render the HTML page
        res.render('index.ejs',{snapToken});
      })
      .catch(err=>{
        console.log(err.response.data);
      })
    // res.sendFile(path.join(__dirname + '/midtrans/index.html'));
  })

module.exports = route
