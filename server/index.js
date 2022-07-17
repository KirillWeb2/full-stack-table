import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from './routes/table.route.js';

const app = express();

const port = process.env.PORT || 4444;
const dbURL = "mongodb+srv://kirill:3--21aq@cluster0.zqjhy.mongodb.net/test-task-table?retryWrites=true&w=majority"

app.use(cors());
app.use(express.json());

app.use('/api', routes)

async function start() {
    try {
        app.listen(port, () => console.log(`Server started ${port} port`));
        
        await mongoose.connect(dbURL, () => console.log('MongoDB connected'));
    } catch (err) {
        console.log(err)
    }
};

start();