const express = require('express');
const psychAppointments = require('./data/3-schedule-interview-psychologist');
const interviewsData = require('./data/interviews');

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


//Ver el listado de entrevistas próximas, las cuales puede cancelar. y Ver el listado de entrevistas realizadas con sus resultados.
//Look past and future interviews

app.get("/company-interviews", (req, res)=>{
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
    res.json(filteredInterview)
  }
  res.json({msg:`There's no interview with that query`});
})

//Delete interview with company

app.delete("/company-interviews/:idInterview",(req, res)=>{
  for (let i = 0; i < interviewsData.length; i++) {
    const interview = interviewsData[i];
    if(interview.idInterview == req.params.idInterview){
      interviewsData.splice(i,1)
      res.json({msg: `The interview with the id of ${req.params.idInterview} has been deleted`})
    }
  }
  res.status(400).json({msg: `That interview doesn't exist`})
})

