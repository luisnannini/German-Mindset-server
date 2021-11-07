const express = require('express');
const psychAppointments = require('./data/3-schedule-interview-psychologist');
const companyAppointments = require('./data/4-next-interviews');
const interviewResults = require('./data/5-last-interviews');
const app = express();

const port = process.env.port || 5000;;

app.listen(port, ()=>
console.log("server started on port 5000"))

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Postulante - Reservar, ver y cancelar un turno de entrevista con un Psicólogo de MindSet.

//Look interview

app.get("/psychologist-interviews/:id", (req, res)=>{
  const found = psychAppointments.some(interview => interview.id ===parseInt(req.params.id))
  if (found){
    res.json(psychAppointments.filter(interview => interview.id === parseInt(req.params.id)));
  }else{
    res.status(400).json({msg: `There's not an interview booked with the user id ${req.params.id}`})
  }
})

//Delete Interview

app.delete("/psychologist-interviews/:id",(req, res)=>{
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

app.post("/psychologist-interviews", (req, res)=>{
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


//Ver el listado de entrevistas próximas, las cuales puede cancelar.
//Look interview with company

app.get("/company-interviews/:id", (req, res)=>{
  const found = companyAppointments.some(interview => interview.id ===parseInt(req.params.id))
  if (found){
    res.json(companyAppointments.filter(interview => interview.id === parseInt(req.params.id)));
  }else{
    res.status(400).json({msg: `The user id ${req.params.id} doesn't have an interview with a company`});
  }
})

//Delete interview with company

app.delete("/company-interviews/:id",(req, res)=>{
  const found = companyAppointments.some(interview => interview.id ===parseInt(req.params.id))
  if (found){
    res.json({
    msg: `The interview with the id of ${req.params.id} has been deleted`,
    });
  }else{
    res.status(400).json({msg: `There's not an interview with a company with the user id of ${req.params.id}`})
  }
})

//Ver el listado de entrevistas realizadas con sus resultados.
//Look interviews made

app.get("/interviews-results/:id", (req, res)=>{
  const found = interviewResults.some(interview => interview.id ===parseInt(req.params.id))
  if (found){
    let interview = interviewResults.filter(interview =>interview.id === parseInt(req.params.id))
    res.status(200).json({interview})
  }else{
    res.status(400).json({msg: `The user id ${req.params.id} didn't have an interview with a company`});
  }
})

