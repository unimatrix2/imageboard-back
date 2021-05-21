import { connect } from 'mongoose';

const mongoConnection = (url) => {
	connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
		.then(() => process.stdout.write('Database Connected\n'))
		.catch((err) => process.stdout.write(err));
};

export default mongoConnection;
