const User = require('../models/User');
//remember your differences in req.body and req.params. Always mess that up
const Thought = require('../models/Thought');
module.exports = {
        getUsers (req,res){
            User.find().then((users)=>res.status(200).json(users)).catch((err)=>{res.status(500).json(err)});
        },
        singleUser(req,res){
                User.findOne({_id:req.params.userId}).populate('thoughts').populate('friends').then((user)=>
                !user ? res.status(404).json({message:'Not found'}) : res.json(user)
            )
            .catch((err)=>res.status(600).json(err));
        },
            createUser (req,res){
                User.create(req.body).then((user)=>res.json(user)).catch((err)=>res.status(500).json(err));
            },
            deleteUser(req,res){
                //params here 
                User.findOneAndDelete({_id:req.params.id}).then((user)=>
                !user ? res.status(404) : res.json(user)
                )
                .catch((err)=>{ console.log(err);
                res.status(500).json(err)});
            },
            updateUser (req,res){
                //req.params & body for the set here 
                //forgot to
                User.findOneAndUpdate({_id:req.params.id}, {$set:req.body}, {new:true}).then((user)=>!user ? res.status(404).json : res.status(200).json(user)).catch((err)=> res.status(500).json(err));
            },
            addFriend(req,res){
                User.findOneAndUpdate({_id:req.params.userId}, {$addToSet:{friends:req.params.friendId}}, {new:true})
                .then((user)=>
                !user
                ? res.status(404).json({message:'Not found'})
                : res.json(user)
                )
                .catch((err)=>res.status(500).json(err));
            },
                deleteFriend (req,res){
                    User.findOneAndUpdate(
                        {_id:req.params.userId},
                        {$pull:{friends:req.params.friendId}}, {new: true}
                    )
                }
}