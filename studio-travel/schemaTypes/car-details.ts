import { Rule } from "@sanity/types";

export default {
  name: "carRental",
  title: "Car Rental",
  type: "document",
  fields: [
    {
      name: "carId",
      title: "Car ID",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "vehicleName",
      title: "Vehicle Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "perDayRent",
      title: "Per Day Rent Price",
      type: "number",
      validation: (Rule: Rule) => Rule.required().min(0),
    },
    {
      name: "utilities",
      title: "Vehicle Utilities",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "utilityName",
              title: "Utility Name",
              type: "string",
            },
            {
              name: "icon",
              title: "Icon",
              type: "image",
              options: { hotspot: true },
            },
          ],
        },
      ],
    },
    {
      name: "seatingCapacity",
      title: "Seating Capacity",
      type: "number",
      validation: (Rule: Rule) => Rule.min(1).required(),
    },
    {
      name: "luggageCapacity",
      title: "Luggage Capacity (Number of Bags)",
      type: "number",
      validation: (Rule: Rule) => Rule.min(0).required(),
    },
    {
      name: "gearType",
      title: "Gear Type",
      type: "string",
      options: {
        list: [
          { title: "Manual", value: "manual" },
          { title: "Automatic", value: "automatic" },
        ],
      },
    },
    {
      name: "description",
      title: "Car Description",
      type: "text",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "policies",
      title: "Policies",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    },
    {
      name: "cardImage",
      title: "Card Display Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "feedback",
      title: "Feedback",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "rating",
              title: "Rating",
              type: "number",
              validation: (Rule: Rule) => Rule.min(1).max(5).required(),
            },
            {
              name: "userName",
              title: "User Name",
              type: "string",
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: "comment",
              title: "Comment",
              type: "text",
            },
            {
              name: "carId",
              title: "Car ID",
              type: "string",
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: "userId",
              title: "User ID",
              type: "string",
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};
