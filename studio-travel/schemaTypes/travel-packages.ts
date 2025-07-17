export default {
    name: "travelPackage",
    title: "Travel Package",
    type: "document",
    fields: [
      {
        name: "id",
        title: "Package ID",
        type: "string",
      },
      {
        name: "packageName",
        title: "Package Name",
        type: "string",
      },
      {
        name: "description",
        title: "Description",
        type: "text",
      },
      {
        name: "images",
        title: "Images",
        type: "array",
        of: [{ type: "image" }],
        options: {
          hotspot: true,
        },
      },
      {
        name: "duration",
        title: "Duration (Days)",
        type: "number",
      },
      {
        name: "price",
        title: "Price",
        type: "number",
      },
      {
        name: "locations",
        title: "Locations",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              { name: "locationId", title: "Location ID", type: "string" },
              { name: "locationName", title: "Location Name", type: "string" },
              {
                name: "map",
                title: "Map",
                type: "object",
                fields: [
                  { name: "lat", title: "Latitude", type: "number" },
                  { name: "lng", title: "Longitude", type: "number" },
                ],
              },
              { name: "day", title: "Day", type: "string" }, 
              { name: "title", title: "Title", type: "string" },
              { name: "description", title: "Description", type: "text" },
              {
                name: "mainImage",
                title: "Main Image",
                type: "image",
                options: { hotspot: true },
              },
              {
                name: "activities",
                title: "Activities",
                type: "array",
                of: [{ type: "string" }],
              },
              {
                name: "highlights",
                title: "Highlights",
                type: "array",
                of: [
                  {
                    type: "object",
                    fields: [
                      { name: "title", title: "Title", type: "string" },
                      {
                        name: "image",
                        title: "Image",
                        type: "image",
                        options: { hotspot: true },
                      },
                    ],
                  },
                ],
              },
              { name: "accommodation", title: "Accommodation", type: "string" },
              { name: "mealPlan", title: "Meal Plan", type: "string" },
              { name: "travelTime", title: "Travel Time", type: "string" },
              { name: "transportMode", title: "Transport Mode", type: "string" },
            ],
          },
        ],
      },      
      {
        name: "feedback",
        title: "Feedback",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              { name: "rating", title: "Rating", type: "number", validation: Rule => Rule.min(1).max(5) },
              { name: "userName", title: "User Name", type: "string" },
              { name: "comment", title: "Comment", type: "text" },
              { name: "packageId", title: "Package ID", type: "string" },
              { name: "userId", title: "User ID", type: "string" },
              { name: "email", title: "User Email", type: "string", validation: Rule => Rule.email() }
            ]
          }
        ]
      },
      {
        name: "registerDate",
        title: "Register Date",
        type: "datetime",
      },
      {
        name: "guestCount",
        title: "Guest Count",
        type: "number",
      },
      {
        name: "saleOff",
        title: "Sale Off",
        type: "string",
      },
      {
        name: "vehicles",
        title: "Vehicles",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              {
                name: "vehicleId",
                title: "Vehicle ID",
                type: "string",
              },
              {
                name: "vehicleName",
                title: "Vehicle Name",
                type: "string",
              },
              {
                name: "vehicleType",
                title: "Vehicle Type",
                type: "string",
              },
            ],
          },
        ],
      },
      
    ],
  };
  