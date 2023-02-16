const mongoose = require('mongoose');
const express = require("express");

const user = require('../Models/User');
const UserRating = require('../Models/UserRating');

const addUserRating = async (req,res) => { 
            try{

                const {userId,userRating} = req.body;
                const addRating =await UserRating.create({userId,userRating,"courseId":req.query.CourseId});
                console.log(addRating);
                res.status(200).json(addRating);
            
            }
            catch(error){
                res.status(400).json({error:error.message});
            }

            }; 

const saveUserRating = async (req,res) => { 
            try{

                const userId= req.query.traineeId;
                const courseId = req.query.courseId;
                const userRating = req.body.userRating;
                const currentRating =await UserRating.find({"userId":userId,courseId:courseId},{});
                console.log(currentRating)
                if(currentRating==null||currentRating==""||currentRating==[])
                {
                    const updatedRating = await UserRating.create({userId,userRating,courseId:req.query.courseId});
                    console.log(updatedRating)
                    res.status(200).json(updatedRating);

                }
                else
                {
                    const delet = await UserRating.deleteMany({"userId":userId,courseId:courseId})
                    const updatedRating = await UserRating.create({userId,userRating,courseId:req.query.courseId});
                    console.log(updatedRating)
                    res.status(200).json(updatedRating);
                }
                
            }
            catch(error){
                res.status(400).json({error:error.message});
            }

            }; 


module.exports = {addUserRating,saveUserRating};