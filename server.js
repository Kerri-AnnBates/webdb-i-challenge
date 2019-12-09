const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

// GET request
server.get('/', (req, res) => {
   db('accounts').from("accounts")
      .then(accounts => {
         res.status(200).json(accounts);
      })
      .catch(error => {
         res.status(500).json({ message: "Error getting accounts" });
      })
});

// GET by id
server.get('/:id', (req, res) => {
   const dataId = req.params.id;
   // Need validation...

   db('accounts').where({ id: dataId })
      .then(account => {
         res.status(200).json(account);
      })
      .catch(error => {
         res.status(500).json({ message: "Account could not be retrieved." });
      })
});

// POST request
server.post("/", (req, res) => {
   const postData = req.body;

   if (postData.name && postData.budget) {

      db('accounts').insert(postData, "id")
         .then(post => {
            res.status(201).json(post);
         })
         .catch(error => {
            res.status(500).json({ message: "Account could not be added" });
         })

   } else {
      res.status(400).json({ message: "Please enter a name and budget." });
   }
});

//DELETE request
server.delete('/:id', (req, res) => {
   const dataId = req.params.id;

   // Need to validate id....

   db('accounts').where({ id: dataId }).del()
      .then(count => {
         res.status(200).json(count);
      })
      .catch(error => {
         res.status(500).json({ message: "Account could not be deleted." });
      })
})

// PUT request
server.put('/:id', (req, res) => {
   const dataId = req.params.id;
   const updates = req.body;

   if (updates.name || updates.budget) {
      
      db('accounts').where({id: dataId}).update(updates)
         .then(count => {
            res.status(200).json(count);
         })
         .catch(error => {
            res.status(500).json({ message: "Problem updating account." });
         });

   } else {
      res.status(400).json({ message: "Please enter a name or budget." });
   }

})

module.exports = server;