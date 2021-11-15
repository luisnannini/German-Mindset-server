const Clients = require('../models/clients');

const getClients = (req, res) => {
  Clients.find()
   .then((clients)=>{
    res.status(200).json(clients)
   })
   .catch((error)=>{
    res.status(400).json(error)
   })
}

const getOneClient = (req, res) => {
  Clients.findById(req.params.id,
  (error,Clients) => {
    if(!Clients) {
      return res.status(404).json({
        msg: `Client with id: ${req.params.id} was not found`
      })
    }
    if(error) {
      return res.status(400).json(error)
    }
    return res.status(200).json(Clients)
  })
}

const updateClient = (req, res) => {
  Clients.findByIdAndUpdate(req.params.id,
    { 
      company_name: req.body.company_name,
      address: req.body.address,
      phone_number: req.body.phone_number,
      email:req.body.email,
      contact: {
        full_name: req.body.contact.full_name,
        phone_number: req.body.contact.phone_number,
        email: req.body.contact.email,
        description: req.body.contact.description,
      }
    },
    { new: true }, 
    (error, updatedClient) => {
      if(!updatedClient) {
        return res.status(404).json({
          msg: `Client with id: ${req.params.id} was not found`
        })
      }
      if(error) {
        return res.status(400).json(error)
      }
      return res.status(200).json(updatedClient)
    }
  )
}

const createClient = (req, res) => {
  const newClient = new Client({
    company_name: req.body.company_name,
      address: req.body.address,
      phone_number: req.body.phone_number,
      email:req.body.email,
      contact: {
        full_name: req.body.contact.full_name,
        phone_number: req.body.contact.phone_number,
        email: req.body.contact.email,
        description: req.body.contact.description,
      }
  })

  newClient.save((error, newClient) => {
    if(error) {
      return res.status(400).json(error)
    }
    return res.status(201).json(newClient)
  })
}

const deleteClient = (req, res) => {
    Clients.findByIdAndDelete(req.params.id, (error, chosenClient) => {
      if (!chosenClient) {
        return res.status(404).json(`Client with id ${req.params.id} was not found`);
      } if (error) {
        return res.status(400).json(error);
      }
      return res.status(204).send(`Client with id ${req.params.id} was remove successfully`);
    });
  };

module.exports = {
  getClients,
  getOneClient,
  createClient,
  updateClient,
  deleteClient
}