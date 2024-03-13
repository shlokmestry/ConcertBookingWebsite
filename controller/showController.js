import showModel from "../models/showModel.js";
import { nanoid } from "nanoid";
import { StatusCodes } from "http-status-codes";

import mongoose from "mongoose";
import day from "dayjs";

let shows = [
  { id: nanoid(), show_artist: "beetle", show_Timing: "front-end" },
  { id: nanoid(), show_artist: "pinkfloyd", show_Timing: "back-end" },
];

export const getAllShows = async (req, res) => {
  const shows = await showModel.find({ createdBy: req.user.userId });
  res.status(200).json({ shows });
};

export const createShow = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const { show_artist, show_Timing } = req.body;

  const show = await showModel.create({ show_artist, show_Timing });
  res.status(201).json({ shows });
};

export const getShow = async (req, res) => {
  console.log(req.user);
  const { id } = req.params;
  const show = await showModel.findById(id);

  res.status(StatusCodes.OK).json({ show });
};

export const editShow = async (req, res) => {
  const { id } = req.params;
  const editedShow = await showModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ message: "Show modified", show: editedShow });
};

export const deleteShow = async (req, res) => {
  const { id } = req.params;
  const removeShow = await showModel.findByIdAndDelete(id);

  res.status(200).json({ message: "Show deleted", show: removeShow });
};

export const showStats = async (req, res) => {
  let stats = await showModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$show_Timing", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    morning: stats.morning || 0,
    noon: stats.noon || 0,
    evening: stats.evening || 0,
  };
  let monthlyShows = [
    {
      date: " May 5",
      count: 3,
    },
    {
      date: " June 5",
      count: 2,
    },
    {
      date: " July 5",
      count: 5,
    },
  ];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyShows });
};
