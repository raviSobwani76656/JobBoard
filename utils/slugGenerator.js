const slugify = require("slugify");
const express = require("express")


exports.slugGenerator = (title) => {

    return slugify(title, { lower: true, strict: true });

}