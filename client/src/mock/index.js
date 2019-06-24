import uuid from "uuid";
const listings = [
  {
    type: 'jobs',
    companies: [
      {
        id: uuid(),
        name: "SlimTrader",
        email: "slimtrader@gmail.com",
        category: "IT",
        location: "123 V.I Lagos",
        jobs: [
          {
            id: uuid(),
            title: "software-dev",
            description: "Business Details must be between 20 to 1000 characters",
            experience: "2 years"
          },
          {
            id: uuid(),
            title: "PM",
            description: "Business Details must be between 20 to 1000 characters",
            experience: "2 years"
          }
        ]
      },
      {
        id: uuid(),
        name: "interswitch",
        email: "interswitch@gmail.com",
        category: "finance",
        location: "40 V.I Lagos",
        jobs: [
          {
            id: uuid(),
            title: "software-dev",
            description: "Business Details must be between 20 to 1000 characters",
            experience: "2 years"
          },
          {
            id: uuid(),
            title: "HR",
            description: "Business Details must be between 20 to 1000 characters",
            experience: "2 years"
          }
        ]
      }
    ]
  },
  {
    type: 'candidates',
    allcandidates: [
      {
        id: uuid(),
        name: "Pascal",
        email: "pascal@gmail.com",
        education: "UI",
        location: "123 V.I Lagos",
        experience: [
          {
            id: uuid(),
            title: "HR",
            company: "HFP",
            description: "Business Details must be between 20 to 1000 characters"
          }
        ],
        about: "Business Details must be between 20 to 1000 characters"
      },
      {
        id: uuid(),
        name: "Alfred",
        email: "interswitch@gmail.com",
        education: "stanford",
        location: "40 V.I Lagos",
        experience: [
          {
            id: uuid(),
            title: "HR",
            company: "HFP",
            description: "Business Details must be between 20 to 1000 characters"
          }
        ],
        about: "Business Details must be between 20 to 1000 characters",
      }
    ]
  }
]


export default listings;
