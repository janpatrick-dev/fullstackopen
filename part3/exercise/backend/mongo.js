const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://janpatrickdev:${password}@cluster0.p0eedrj.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const contactSchema = mongoose.Schema({
  name: String,
  number: String
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length < 5) {
  Contact.find({}).then((contacts) => {
    console.log('phonebook:');
    contacts.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`);
    });
    mongoose.connection.close();
  });
  return;
}

const contact = new Contact({
  name: process.argv[3],
  number: process.argv[4]
});

contact.save().then(result => {
  console.log(`added ${result.name} number ${result.number} to phonebook`);
  mongoose.connection.close();
});