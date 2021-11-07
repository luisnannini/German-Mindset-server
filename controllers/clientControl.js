const clients = require('../data/clients.json');

//Create a new client
//Generate new id for Client
function generateId(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

const newClient = (req, res) => {
    const clientNew = {
      id: generateId(100,200),
      first_name: req.body.first_name,
      address: req.body.address,
      phone_number: req.body.phone_number,
      contact: req.body.contact,
      jobs_offers: req.body.jobs_offers,
    }
    //Check the information
    if(!clientNew.first_name || !clientNew.address ||
      !clientNew.phone_number || !clientNew.contact ||
      !clientNew.jobs_offers){
      return res.status(400).json({ msg: 'Try again, some fields are incomplete'});
    } else {
      clients.push(clientNew);
      res.send(200, {clients})
    }
} 
//Edit the client
const clientUpdate = (req, res) => {
    const found = clients.find(client => client.id === parseInt(req.params.id));
    if (found) {
      const clientUpdated = req.body;
      clients.forEach(client => {
        if(client.id === parseInt(req.params.id)){
          client.first_name = clientUpdated.first_name ? clientUpdated.first_name : client.first_name,
          client.address = clientUpdated.address ? clientUpdated.address : client.address,
          client.phone_number = clientUpdated.phone_number ? clientUpdated.phone_number : client.phone_number,
          client.contact = clientUpdated.contact ? clientUpdated.contact : client.contact,
          client.jobs_offers = clientUpdated.jobs_offers ? clientUpdated.jobs_offers : client.jobs_offers,
          res.json({ msg: 'Member updated', client})
        }});
    } else {
      res.send('User not found');
    }
};
//Delete client
const deleteClient = (req, res) => {
    const found = clients.find(client => client.id === parseInt(req.params.id));
    if (found) {
      res.json(clients.filter(client => client.id !== parseInt(req.params.id)));
    } else {
      res.send('User not found');
    }
}
//Show the list of Clients
const listClients = (req,res) =>{
    res.json(clients);
}

module.exports = {
    listClients: listClients,
    deleteClient: deleteClient,
    clientUpdate: clientUpdate,
    newClient: newClient,
    generateId: generateId
};
  