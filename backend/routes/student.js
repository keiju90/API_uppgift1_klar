get = (req, res, next) => {
  var query;

  if (req.query.name) {
    query = req.models.Student.findOne({
      "student.name": req.query.name
    })
  } else {
    query = req.models.Student.find();
  }

  query.exec().then((student) => {
    return res.send(student);
  }).catch((error) => 
  next(error));
};


getById = (req, res, next) => {
  req.models.Student.findById(req.params.id).then((student) => {
    return res.send(student);
  }).catch((error) => next(error));
};


post = (req, res, next) => {
  req.models.Student.create(
    {   _id: req.body._id,
        email: req.body.email,
        name: req.body.name,
        address: {
          gata: req.body.address.gata,
          postnummer: req.body.address.postnummer,
          ort: req.body.address.ort
        
      }
    }
  ).then((student) => {
    return res.status(201).send(student);
  }).catch((error) => 
  next(error));
};


deleteById = (req, res, next) => {
  req.models.Student.findByIdAndDelete(req.params.id).then((deleted) => {
    if (deleted)
      return res.send(deleted).status(200);
    res.sendStatus(204);
  }).catch((error) => next(error));
};


module.exports = {
  get,
  post,
  getById,
  deleteById
}