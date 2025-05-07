const express = require("express");
const db = require("../models")
const { stat } = require("fs");
const Job = db.Job;
const { where } = require("sequelize");
const { slugGenerator } = require("../utils/slugGenerator");
const Application = db.Application;

exports.createJobPost = async (req, res) => {

    try {

        const { title, description } = req.body;

        let slug = slugGenerator(title);

        const SameJob = await Job.findOne({ where: { title, description } });

        if (SameJob) {
            return res.status(400).json({ status: false, message: "The Same Job Post already exists. Please try with different title or description" })
        };

        const newJobPost = await Job.create({
            title,
            description,
            slug,


        });

        res.status(201).json({ status: true, message: "The Job Post created SuccessFully", post: newJobPost })

    } catch (error) {
        console.error("Failed to Create Job Post", error);
        res.status(500).json({ status: false, message: "Failed to Create Job Post" })

    }

}


exports.getJobPostBySlug = async (req, res) => {

    try {

        const { slug } = req.params;

        const requiredJobPost = await Job.findOne({ where: { slug } })

        if (!requiredJobPost) {
            return res.status(400).json({ status: false, message: "The Required Blog Post is not available" })
        }

        res.status(201).json({ status: true, message: "The Required Blog fetched SuccessFully", Jobpost: requiredJobPost })

    } catch (error) {
        console.error("Failed to fetch Job Post", error);
        res.status(500).json({ status: false, message: "Failed to fetch Job Post" })

    }

}


exports.updateJobPost = async (req, res) => {

    try {

        const { slug } = req.params;

        const jobToUpdate = await Job.findOne({ where: { slug } });



        //const jobToUpdate = await Job.findOne({ where: { slug: req.params.slug } });

        if (!jobToUpdate) {
            return res.status(400).json({ message: "The Job you are looking to update, does not exists" })
        }

        const { title, description } = req.body;

        const JobtoUpdate = await Job.update({ title, description }, { where: { slug } });

        res.status(201).json({ message: "The Job has been Updated" })

    } catch (error) {
        console.error("Failed to Update Job Post", error);
        res.status(500).json({ status: false, message: "Failed to Update Job Post" })

    }

}
exports.deleteJobPost = async (req, res) => {
    try {
        const { slug } = req.params;
        const { jobId } = req.body;


        const jobToDelete = await Job.findOne({ where: { slug } });
        if (!jobToDelete) {
            return res.status(400).json({ message: "The Job Post you're trying to delete does not exist." });
        }


        const pendingApplications = await Application.findAll({ where: { jobId, status: 'pending' } });

        if (pendingApplications.length > 0) {

            return res.status(400).json({ status: false, message: "You cannot delete the job post while there are pending applications." });
        }

        await Application.destroy({ where: { jobId } });


        await jobToDelete.destroy();

        res.status(200).json({ message: "The Job Post has been deleted successfully." });
    } catch (error) {
        console.error("Failed to Delete Job Post", error);
        res.status(500).json({ status: false, message: "Failed to Delete Job Post" });
    }
};

