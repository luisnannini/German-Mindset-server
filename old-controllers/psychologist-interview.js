const express = require('express');
const router = express.Router();
const psychAppointments = require('../data/3-schedule-interview-psychologist');

//Postulante - Reservar, ver y cancelar un turno de entrevista con un Psicólogo de MindSet.

//Look interview

router.get("/:id", (req, res)=>{
  const found = psychAppointments.some(interview => interview.id ===parseInt(req.params.id))
  if (found){
    res.json(psychAppointments.filter(interview => interview.id === parseInt(req.params.id)));
  }else{
    res.status(400).json({msg: `There's not an interview booked with the user id ${req.params.id}`})
  }
})

//Delete Interview

router.delete("/:id",(req, res)=>{
  const found = psychAppointments.some(interview => interview.id ===parseInt(req.params.id))
  if (found){
    res.json({
    msg: `The interview with the user id of ${req.params.id} has been deleted`,
    });
  }else{
    res.status(400).json({msg: `There's not an interview with the user id of ${req.params.id}`})
  }
})

//Book an appointment

router.post("/", (req, res)=>{
  const newInterview = {
    id: req.body.id,
    appointmentDay: req.body.appointmentDay,
    appointmentTime: req.body.appointmentTime
  }

  if(!newInterview.id || !newInterview.appointmentDay || !newInterview.appointmentTime){
    return res.status(400).json({msg: "Incomplete Data"});
  }

  const found = psychAppointments.some(interview => interview.id ===parseInt(req.body.id))
  if (found){
    return res.status(400).json({msg: `There's already an interview booked with the user id ${req.body.id}`})
  }

  psychAppointments.push(newInterview);
  res.json({
    msg: `The interview with the user id of ${newInterview.id} has been added`,
    psychAppointments
  })
})

module.exports = router;