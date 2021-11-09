const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// cross origin resource sharing
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT,DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// import the item model
const Item = require("./models/item");

app.get("/api/healthz", async (req, res) => {
    res.status(200).json({message: "OK", appName: process.env.APP_NAME});  
});

app.get("/api/items", async (req, res) => {
    try {
        const item = await Item.find().sort({createdAt: -1});
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json(error);
    }   
});

// create a new item
app.post("/api/items", async (req, res) => {
    
    try {
      const item = new Item({...req.body});
        await item.save();
        res.status(201).json({ 
            message: 'saved', 
            item: { id: item.id, name: item.name }
        });
    } catch (error) {
        res.status(500).json(error);
    }
})

// update item
app.put("/api/items/:id", async (req, res) => {
    try {
        const item = await Item.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json(error);
    }
});


// delete item
app.delete("/api/items/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'not found' });
        }
        await item.remove();
        res.status(200).json({ message: 'deleted' });
    } catch (error) {
        res.status(500).json(error);
    }
})

mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}:27017/${process.env.MONGODB_DATABASE}?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error("FAILED TO CONNECT TO MONGODB");
      console.error(err);
    } else {
      console.log("CONNECTED TO MONGODB!!");
      app.listen(80);
    }
  }
);
