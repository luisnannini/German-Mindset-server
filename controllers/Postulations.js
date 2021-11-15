const fs = require('fs');
const Postulations = require('../models/Postulations');

// See list of postulations
const getPostulations = (req, res) => {
    Postulations.find()
        .then((postulations) => {
            res.status(200).json(postulations);
        })
        .catch((error) => {
            res.status(404).json()
        })
}

// See postulation by Id
const getPostulationById = (req, res) => {
    Postulations.findById(req.params.id_postulation, (error, postulation) => {
        if(!postulation) {
            return res.status(404).json(
                { msg : "Offer not found" }
            ); 
        }
        if (error) {
            return res.status(400).json(error);
        }
        res.status(200).json(postulation);
    }) 
}

// See postulation by Client
const getPostulationByClient = (req, res) => {
    Postulations.find( {id_clients: req.params.id_clients} )
    .then((postulations) => {
        res.status(200).json(postulations);
    })
    .catch((error) => {
        res.status(404).json(
            {msg: `There's no postulation for the client id ${req.params.id_clients}`}
        )
    })
}

// Add Postulation
const addPostulation = (req, res) => {
    const postulation = new Postulations({
        id_postulation: req.body.id_postulation,
        id_clients: req.body.id_clients,
        id_profile: req.body.id_profile,
        description: req.body.description
      });
    
      postulation.save((error) => {
        if (error) {
          return res.status(400).json(error);
        }
        return res.status(201).json(postulation);
      });
}

// Update Postulation
const updatePostulation = (req, res) => {
    Postulations.findByIdAndUpdate(req.params.id_postulation,
        { description : req.body.description },
        { new: true },
        (error, newPostulation) =>  {
            if(error) {
                res.status(400).json(error)
            }
            return res.status(200).json(newPostulation)
    })
}

// Delete Postulation
const deletePostulation = (req, res) => {
    Postulations.findByIdAndDelete(req.params.id_postulation, (error, postulation) => {
        if (!postulation) {
          return res.status(404).json(
              {msg: `There's no postulation with the id ${req.params.id_postulation}`}
            ); 
        }
        if (error) {
          return res.status(400).json(error);
        }
        return res.status(204).send();
      });
}