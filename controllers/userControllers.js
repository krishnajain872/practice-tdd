const express = require("express");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    if (!payload) {
      res.status(400).send(
        response = {
          code: 400,
          success: false,
          data: { message: "bad request",payload:undefined },
        }
      );
    } else {
      res.status(201).send(
        response = {
          code: 201,
          success: true,
          data: { message: "user registered successfully", payload },
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
