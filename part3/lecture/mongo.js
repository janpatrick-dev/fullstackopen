const mongoose = require('mongoose');
const Note = require('./models/note');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://janpatrickdev:${password}@cluster0.p0eedrj.mongodb.net/testNoteApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

// Note.find({ important: true }).then(result => {
//   result.forEach(note => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });

const note = new Note({
  content: 'CSS is hard',
  important: true
});

note.save().then(result => {
  console.log('note saved!');
  mongoose.connection.close();
});