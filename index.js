require('dotenv').config();

const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const app = express();

const protocol = process.env.PROTOCOL || 'http';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const baseUrl = `${protocol}://${host}`;


const checkBalance = (address, callback) => {
  exec(`palomad q bank balances ${address}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return callback(error, null);
    }

    try {
      const result = JSON.parse(stdout);
      const balance = result.balances.find(b => b.denom === "ugrain");
      if (balance) {
        const amount = parseInt(balance.amount, 10) / 1e6;
        return callback(null, amount >= 5);
      }
      return callback(null, false);
    } catch (parseError) {
      return callback(parseError, null);
    }
  });
};


let addresses = [];
try {
  const data = fs.readFileSync('addresses.txt', 'utf8');
  addresses = data.split('\n').filter(line => line.length > 0);
} catch (err) {
  console.error(err);
}

app.get('/', (req, res) => {
  let html = '<h1>Addresses</h1>';
  html += '<ul>';
  addresses.forEach(address => {
    html += `<li><a href="${baseUrl}/${address}">${address}</a></li>`;
  });
  html += '</ul>';
  res.send(html);
});

app.get('/:address', (req, res) => {
  const address = req.params.address;
  checkBalance(address, (err, isBalanceSufficient) => {
    if (err) {
      res.status(500).send('Error checking balance');
    } else {
      res.send(isBalanceSufficient.toString());
    }
  });
});

app.listen(port, 'localhost', () => {
  console.log(`Server listening at ${baseUrl}`);
});
