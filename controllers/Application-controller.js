const express = require("express");
const db = require("../models");
const { stat } = require("fs");
const Application = db.Application;
const Job = db.Job;
const User = db.User;

const createApplication = async (req, res) => {

    try {

        const { resume, coverletter, jobId } = req.body;
        const userId = req.user.id;
        const name = req.user.name;
        const email = req.user.email;

        console.log("Decoded User:", { name, email, userId });

        const JobPost = await Job.findByPk(jobId);

        if (!JobPost) {
            return res.status(404).json({ status: false, message: "Job not found." });
        }


        const createNewApplication = await Application.create({

            name,
            resume,
            coverletter,
            email,
            userId,
            jobId,
            status: 'pending'

        })

        res.status(201).json({ status: true, message: "Application created SuccessFully", application: createNewApplication })


    } catch (error) {
        console.error("Error Creating the application for the JobPost", error)
        res.status(500).json({ status: false, message: "Failed to Create Application" })
    }

}


const getAppApplication = async (req, res) => {

    try {
        const allApplication = await Application.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json({ status: true, message: "Applications fetched Successfully", data: allApplication })

    }
    catch (error) {
        return res.status().json({ message: "Error Occured While Fetching the Application" })
    }

}

const getApplication = async (req, res) => {

    try {

        const userId = req.user.id;

        const jobId = req.params.jobId;


        if (!jobId) {
            return res.status(400).json({ status: false, message: "Job ID is required." });
        }

        const applicationToFetch = await Application.findOne({ where: { userId, jobId }, order: [['createdAt', 'DESC']] });


        if (!applicationToFetch) {
            return res.status(200).json({ status: false, message: "The Application does not Exist", })
        }

        res.status(200).json({ status: true, message: "Application Fetched SuccessFully", data: applicationToFetch })


    } catch (error) {
        console.error("Error fetching your application for the JobPost", error);
        res.status(500).json({ status: false, message: "Failed to fetch the  Application" })
    }

}



const UpdateApplication = async (req, res) => {
    try {

        const email = req.user.email;

        const applicationId = req.params.applicationId;


        const { resume, coverletter } = req.body;

        if (!applicationId) {
            return res.status(400).json({ status: false, message: "The job is not available" })
        }


        const applicationToUpdate = await Application.findOne({ where: { email, id: applicationId } });

        if (!applicationToUpdate) {
            return res.status(200).json({ status: false, message: "Cannot Update the Application. That Application does not Exist" })
        }



        if (applicationToUpdate.status === 'approved') {
            return res.status(400).json({ status: false, message: "Application you are trying to Update has been approved.You cannot Update that application " })
        }


        if (applicationToUpdate.status === 'denied') {
            return res.status(400).json({ status: false, message: "Application you are trying to Update has been denied. You cannnot Update that Application " })
        }

        await applicationToUpdate.update({ resume, coverletter })

        res.status(200).json({ status: true, message: "Application Updated SuccessFully", updatedApplication: applicationToUpdate })

    } catch (error) {
        console.error("Error Updating your application for the JobPost", error);
        res.status(500).json({ status: false, message: "Failed to Update the  Application" })
    }

}
const deleteApplication = async (req, res) => {
    try {
        const email = req.user.email;
        const applicationId = req.params.applicationId;

        const applicationdelete = await Application.findOne({
            where: { id: applicationId, email }
        });

        if (!applicationdelete) {
            return res.status(400).json({
                status: false,
                message: "Application you're trying to delete does not exist."
            });
        }

        if (applicationdelete.status === 'approved') {
            return res.status(400).json({
                status: false,
                message: "Application you are trying to delete has been approved. You cannot delete it."
            });
        }

        await applicationdelete.destroy();

        return res.status(200).json({
            status: true,
            message: "Application deleted successfully."
        });

    } catch (error) {
        console.error("Error occurred while deleting the application", error);
        return res.status(500).json({
            status: false,
            message: "Error occurred while deleting the application"
        });
    }
};



const getApplicationOfUser = async (req, res) => {

    try {
        const applications = await Application.findAll({ include: { model: Job } })

        res.json(applications)

    } catch (error) {
        res.status(500).json({ status: false, message: "Error Occured while fetching the applications" })
    }
}


const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        // Validate status
        if (!['approved', 'denied'].includes(status)) {
            return res.status(400).json({
                status: false,
                message: "Status should be either 'approved' or 'denied'"
            });
        }

        // Find application
        const application = await Application.findOne({ where: { id: applicationId } });

        if (!application) {
            return res.status(404).json({ status: false, message: "Application not found" });
        }

        const previousStatus = application.status;

        // Prevent reversal
        if (previousStatus === "approved" && status === "denied") {
            return res.status(400).json({
                status: false,
                message: "Cannot deny an already approved application"
            });
        }

        if (previousStatus === "denied" && status === "approved") {
            return res.status(400).json({
                status: false,
                message: "Cannot approve an already denied application"
            });
        }

        // Update and save
        application.status = status;
        await application.save();

        // Final response
        res.status(200).json({
            status: true,
            message: `Application status updated to ${status}`,
            application
        });

    } catch (error) {
        console.error("Update status error:", error);
        res.status(500).json({
            status: false,
            message: "Error occurred while updating the status of the application"
        });
    }
};




const fetchApplication = async (req, res) => {

    try {

        const { slug } = req.params;

        // const requiredJobPost = await Job.findOne({ where: { slug } });


        const requiredJobPost = await Job.findOne({
            where: { slug },
            include: [{
                model: Application,
                as: 'applications',  // Ensure the alias matches the association
                required: false,  // To allow fetching job even if no applications exist
            }],
        });

        const applications = requiredJobPost.applications


        if (!requiredJobPost) {
            return res.status(400).json({ status: false, message: "The Job Post You are looking for does not Exist" })
        };


        res.status(200).json({
            status: true,
            message: "Applications fetched successfully",
            job: requiredJobPost,
            applications: applications
        });

    } catch (error) {
        console.log("Error Occured While Fetching all the applications", error);
        res.status(500).json({
            status: false,
            message: "Error occurred while Fetching all the application"
        });

    }

}


async function allApplication(req, res) {

    try {

        const { email } = req.body;

        if (!email) {
            res.status(400).json({ message: "Email Required First" });
        }

        const userWhoSentApplication = await User.findOne({
            where: { email }, include: [{
                model: Application,
                as: 'applications',

                required: false
            }]
        })

        const applications = userWhoSentApplication.applications

        res.status(200).json({
            status: true,
            message: "Applications fetched successfully",
            user: userWhoSentApplication,

        });

    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({
                status: false,
                message: "Error Occured while fetching all the  Applications send by the user "
            })
    }

}


module.exports = { allApplication, fetchApplication, getApplication, UpdateApplication, createApplication, deleteApplication, getApplicationOfUser, updateApplicationStatus }