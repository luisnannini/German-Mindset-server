const express = require('express');
const router = express.Router();
const interviewsData = require('../data/interviews');

//Ver el listado de entrevistas próximas, las cuales puede cancelar. y Ver el listado de entrevistas realizadas con sus resultados.
//Look past and future interviews

router.get("/", (req, res)=>{
  const idUser = req.query.id;
  const time = req.query.time;

  if(idUser == undefined && time == undefined){
    return res.json(interviewsData)
  }

  let filteredInterview = interviewsData;

  if (idUser){
    const foundUser = filteredInterview.some(interview => interview.idUser ===parseInt(idUser))
    if (foundUser){
      filteredInterview = filteredInterview.filter(interview => interview.idUser === parseInt(idUser));
    }else{
      res.status(400).json({msg: `The user id ${idUser} doesn't have an interview with a company`});
    }
  }

  const today = new Date().getTime();

  if (time == "past"){
    filteredInterview = filteredInterview.filter((dateTime)=>{
      return Date.parse(dateTime.date)<=today
    })
  }else if(time == "future"){
    filteredInterview = filteredInterview.filter((dateTime)=>{
      return Date.parse(dateTime.date)>=today
    })
  }
  if(filteredInterview[0] != undefined){
    return res.json(filteredInterview)
  }
  return res.json({msg:`There's no interview with that query`});
})

//Delete interview with company

router.delete("/:idInterview",(req, res)=>{
  for (let i = 0; i < interviewsData.length; i++) {
    const interview = interviewsData[i];
    if(interview.idInterview == req.params.idInterview){
      interviewsData.splice(i,1)
      res.json({msg: `The interview with the id of ${req.params.idInterview} has been deleted`})
    }
  }
  res.status(400).json({msg: `That interview doesn't exist`})
})

module.exports = router;