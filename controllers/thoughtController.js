const User = require('../model/User');
const Thought = require('../model/Thought');

//need to export our module

module.exports = {
    //run your get for thoughts

        getThoughts(req,res){
            Thought.find().then((thoughts)=> res.status(2002).json(thoughts)).catch((err)=> res.status(500).json(err));
        },
        singleThought(req,res){
            //           make sure to use params
            Thought.findOne({_id:req.params.id}).then((thought)=> 
            !thought ? res.status(404).json({message:'Not found'}) : res.status(200).json(thought)
            )
            .catch((err)=> res.status(500).json(err));
    },
    createThought(req,res){
        Thought.create(req.body).then((thought)=>{
            return User.findOneAndUpdate({username: thought.username}, {$addToSet: {thoughts: thought._id}},{new:true});
        })
        .then((user)=>
        !user
        ? res.status(404).json({message:'Not found',}) : res.json('Created')
        )
        .catch((err)=>{
            console.error(err);
            return res.status(400).json(err);
        })
    },
    
}