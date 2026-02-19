const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://armukul01_db_user:Mukulmongodb11@clusterprojects.i9fd98w.mongodb.net/?appName=ClusterProjects'

const mongoDB = async() => {
    //     await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, result) => {
    //         if(err) {
    //             console.log("Error connecting to MongoDB: ", err)
    //         }
    //         console.log("Connected to MongoDB successfully!")
    // });
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = mongoDB;