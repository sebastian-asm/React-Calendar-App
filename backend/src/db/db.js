import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.log(error);
    throw new Error('Error con la conexión a la base de datos');
  }
};

export default dbConnection;
