/* ==========================================================================
   ROBOVEDA'26 — STRUCTURED DATA MODULE
   Data Source: Authentic RoboVeda Fest Metadata
   ========================================================================== */

const ROBOVEDA_DATA = {
  festInfo: {
    name: "ROBOVEDA'26",
    edition: "15th Edition",
    theme: "ASCENSION",
    tagline: "From the first machine to the next intelligence.",
    organization: "The Robotics Club - SNIST",
    institution: "Sreenidhi Institute of Science and Technology",
    certification: "ISO 20121:2012 Certified Event",
    address: "SNIST, Yamnampet, Ghatkesar, Telangana, 501301",
    phone: "+91 63019 32007",
    email: "roboveda@sreenidhi.edu.in",
    website: "https://www.theroboticsclubsnist.org/",
    dates: "October 12th - 14th, 2026"
  },

  events: [
    {
      id: "ranaveera",
      num: "01",
      name: "RANAVEERA",
      category: "ROBO WAR",
      shortDesc: "The ultimate combat robotics arena. Heavyweight machine battles engineered for destruction, armor endurance, and strategic dominance.",
      imageBg: "img/Event_Icons/ranaveera_icon_bg.jpeg",
      imageFg: "img/Event_Icons/ranaveera_icon_fg.png",
      rulebook: "RV 25 Rule books/RANAVEERA RV'25.pdf",
      pageUrl: "Ranaveera.html",
      registerUrl: "register.html"
    },
    {
      id: "pushpak",
      num: "02",
      name: "PUSHPAK",
      category: "AERIAL ROBOTICS",
      shortDesc: "High-speed aerial drone obstacle navigation. Precision piloting, aerodynamic control, and altitude stability challenges.",
      imageBg: "img/Event_Icons/drone_icon_bg.jpeg",
      imageFg: "img/Event_Icons/drone_icon_fg.png",
      rulebook: "RV 25 Rule books/PUSPHAK RV 25.pdf",
      pageUrl: "Pushpak.html",
      registerUrl: "register.html"
    },
    {
      id: "yantraa",
      num: "03",
      name: "YANTRAA",
      category: "MANUAL ROBOTICS",
      shortDesc: "Complex mechanical arm design and precision pick-and-place operation under strict time constraints.",
      imageBg: "img/Event_Icons/yantra_icon_bg.jpg",
      imageFg: "img/Event_Icons/yantra_icon_fg.png",
      rulebook: "RV 25 Rule books/YANTRAA RV'25.pdf",
      pageUrl: "Yantraa.html",
      registerUrl: "register.html"
    },
    {
      id: "jaladhmatra",
      num: "04",
      name: "JALADHMATRA",
      category: "AQUA ROBOTICS",
      shortDesc: "Waterborne robotics navigating aqueous obstacles, buoyancy control, and amphibious payload challenges.",
      imageBg: "img/Event_Icons/jaladhmatra_icon_bg.jpg",
      imageFg: "img/Event_Icons/jaladhmatra_icon_fg.png",
      rulebook: "RV 25 Rule books/JALADHMATRA RV'25.pdf",
      pageUrl: "Jaladhmatra.html",
      registerUrl: "register.html"
    },
    {
      id: "yoddha",
      num: "05",
      name: "YODDHA",
      category: "ROBO SUMO",
      shortDesc: "Robotic sumo wrestling. High torque pushing power, ring edge sensing, and aggressive mechanical design.",
      imageBg: "img/Event_Icons/yodha_icon_bg.jpg",
      imageFg: "img/Event_Icons/yodha_icon_fg.png",
      rulebook: "RV 25 Rule books/YODDHA RV'25.pdf",
      pageUrl: "yoddha.html",
      registerUrl: "register.html"
    },
    {
      id: "sarvaagami",
      num: "06",
      name: "SARVAAGAMI",
      category: "ALL TERRAIN",
      shortDesc: "Extreme off-road terrain traversal testing suspension, tread traction, and rugged chassis engineering.",
      imageBg: "img/Event_Icons/sarvagami_icon_bg.jpg",
      imageFg: "img/Event_Icons/sarvagami_icon_fg.png",
      rulebook: "RV 25 Rule books/SARVAAGAMI RV'25.pdf",
      pageUrl: "Sarvagami.html",
      registerUrl: "register.html"
    },
    {
      id: "goalaa",
      num: "07",
      name: "GOALAA",
      category: "ROBO SOCCER",
      shortDesc: "High-energy robot soccer match. Maneuverability, ball control mechanisms, and tactical scoring.",
      imageBg: "img/Event_Icons/gola_icon_bg.jpg",
      imageFg: "img/Event_Icons/golaa_icon_fg.png",
      rulebook: "RV 25 Rule books/GOALAA RV'25.pdf",
      pageUrl: "Goala.html",
      registerUrl: "register.html"
    },
    {
      id: "samanvayi",
      num: "08",
      name: "SAMANVAYI",
      category: "AUTONOMOUS",
      shortDesc: "Fully autonomous maze solving and obstacle negotiation without human teleoperation.",
      imageBg: "img/Event_Icons/samanvayi_icon_bg.jpeg",
      imageFg: "img/Event_Icons/samanvayi_icon_fg.png",
      rulebook: "RV 25 Rule books/SAMANVAYI RV 25.pdf",
      pageUrl: "Samanvayi.html",
      registerUrl: "register.html"
    },
    {
      id: "lakshmanarekha",
      num: "09",
      name: "LAKSHMANAREKHA",
      category: "LINE FOLLOWER",
      shortDesc: "Ultra-fast optical line follower challenge. PID control tuning and rapid sensor calibration.",
      imageBg: "img/Event_Icons/lakshmanrekha_icon_bg.jpeg",
      imageFg: "img/Event_Icons/lakshmanrekha_icon_fg.png",
      rulebook: "RV 25 Rule books/LAKSHMANREKHA RV'25.pdf",
      pageUrl: "Lakshman Rekha.html",
      registerUrl: "register.html"
    },
    {
      id: "gati",
      num: "10",
      name: "GATI",
      category: "SPEED RACE",
      shortDesc: "Pure sprint drag race testing maximum motor rpm, acceleration, and straight-line stability.",
      imageBg: "img/Event_Icons/gati_icon_bg.jpg",
      imageFg: "img/Event_Icons/gati_icon_fg.png",
      rulebook: "RV 25 Rule books/GATI RV'25.pdf",
      pageUrl: "Gati.html",
      registerUrl: "register.html"
    }
  ],

  workshops: [
    {
      title: "DRONE WORKSHOP",
      desc: "Hands-on training on UAV flight controller programming, ESC calibration, and aerodynamic assembly.",
      image: "img/bg-img/drone.png",
      registerUrl: "register.html"
    },
    {
      title: "ROBOTICS & IOT WORKSHOP",
      desc: "Learn embedded C, sensor interfacing, ESP32/Arduino cloud telemetry, and motor driver schematics.",
      image: "img/Images/workshop.jpg",
      registerUrl: "register.html"
    },
    {
      title: "PRADARSHAN (PROJECT EXPO)",
      desc: "National technical project exhibition showcasing novel hardware prototypes, AI innovations, and research models.",
      image: "img/pradarshan.png",
      pageUrl: "projectexpo.html",
      registerUrl: "register.html"
    },
    {
      title: "IDEATHON",
      desc: "Rapid technological problem-solving competition presenting inventive engineering concepts to industry juries.",
      image: "img/bg-img/ideathon.jpg",
      pageUrl: "ideathon.html",
      registerUrl: "register.html"
    }
  ],

  stats: [
    { target: 5000, suffix: "+", label: "Participants" },
    { target: 50, suffix: "+", label: "Institutions & Colleges" },
    { target: 20, suffix: "+", label: "Events & Workshops" },
    { target: 15, suffix: "th", label: "Edition of Excellence" }
  ],

  titleSponsor: {
    name: "Epiroc",
    logo: "./img/Sponsers/epiroc-logo.png",
    url: "https://www.epiroc.com/"
  },

  previousSponsors: [
    { name: "RedBull", logo: "./img/Sponsers/redbull.png" },
    { name: "DRDO", logo: "./img/Sponsers/new_drdo_logo.png" },
    { name: "Monster", logo: "./img/Sponsers/monster.png" },
    { name: "Unacademy", logo: "./img/Sponsers/Unacademy_Logo.png" },
    { name: "Canon", logo: "./img/Sponsers/canon.png" },
    { name: "Cellbay", logo: "./img/Sponsers/Cellbay-Logo.jpg" },
    { name: "OYO", logo: "./img/Sponsers/OYO.png" },
    { name: "KTM", logo: "./img/Sponsers/ktm.png" },
    { name: "SBI", logo: "./img/Sponsers/SBI.webp" }
  ]
};
