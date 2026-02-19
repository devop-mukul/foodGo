const mongoose = require('mongoose')

const mongoDB = async() => {
    //     await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, result) => {
    //         if(err) {
    //             console.log("Error connecting to MongoDB: ", err)
    //         }
    //         console.log("Connected to MongoDB successfully!")
    // });
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
        const fetchedData = await mongoose.connection.db
            .collection("food_items")
            .find({})
            .toArray();
        // console.log(fetchedData);
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1); // Exit the process with an error code
    }
};

module.exports = mongoDB;