import { } from 'dotenv/config';
import { runServer } from "./src/api/server";

import mongoose from 'mongoose';

const MONGODB_CONFIG = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

const init = () => {
    mongoose.connect(process.env.MONGO_URI, MONGODB_CONFIG)
        .then(() => console.log('MongoDB connected.'))
        .then(() => runServer())
        .catch(err => console.log(err));
};

init();
