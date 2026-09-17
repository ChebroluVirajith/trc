import { EventItem } from '../types';

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'ranaveera',
    number: '01',
    name: 'RANAVEERA',
    category: 'Combat',
    tagline: 'The Ultimate Battle of Heavyweight Combat Robotics',
    shortDesc: 'Experience a high-octane rollercoaster ride of raw mechanical combat. Witness metal-grinding clashes inside the reinforced combat arena.',
    fullDesc: 'Experience a whole new rollercoaster ride of emotions ranging from nail-biting apprehension to unsubdued triumph at our ultimate battle of Robots. Let the vibes of zeal and tension hit you hard as you witness an extravaganza of RANAVEERA unfold at RoboVeda.',
    bannerImage: '/img/Events_Banners/ranveera_banner.jpg',
    iconBg: '/img/Event_Icons/ranaveera_icon_bg.jpeg',
    iconFg: '/img/Event_Icons/ranaveera_icon_fg.png',
    pdfRulebook: '/RV 25 Rule books/RANAVEERA RV\'25 new.pdf',
    arenaVideo: '/img/ranvera_arena.mp4',
    prizePool: 'Cash Prizes & Trophies',
    coordinators: [
      { name: 'Nikhil', role: 'Head', phone: '+91 9063010713', image: '/img/RV 25 board/ranveera h1.jpg' },
      { name: 'Thanush', role: 'Head', phone: '+91 9704712473', image: '/img/RV 25 board/ranaveera h2.jpg' },
      { name: 'Pradyot', role: 'Co-ordinator', phone: '+91 7386889698', image: '/img/RV 25 board/ranaveera c1.jpg' },
      { name: 'Afif', role: 'Co-ordinator', phone: '+91 8688402513', image: '/img/RV 25 board/ranaveera c2.jpg' }
    ],
    registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    tags: ['Combat Arena', 'Pneumatics', 'High Torque', 'Reinforced Chassis'],
    schedule: 'Day 1 & Day 2',
    location: 'Main Combat Arena'
  },
  {
    id: 'pushpak',
    number: '02',
    name: 'PUSHPAK',
    category: 'Aerial',
    tagline: 'Aerial Navigation, UAV Dynamics & Flight Agility',
    shortDesc: 'Pilot your multicopter drone through a multi-dimensional obstacle course testing precision aerodynamic control, stability, and speed.',
    fullDesc: 'Take to the skies in PUSHPAK! Drone pilots demonstrate ultimate control over elevation, yaw, pitch, and roll while traversing through tight rings, elevation shifts, and precision payload drops under strict time constraints.',
    bannerImage: '/img/Events_Banners/pushpak_banner.jpg',
    iconBg: '/img/Event_Icons/drone_icon_bg.jpeg',
    iconFg: '/img/Event_Icons/drone_icon_fg.png',
    pdfRulebook: '/RV 25 Rule books/PUSPHAK RV 25.pdf',
    prizePool: 'Cash Prizes & Certificates',
    coordinators: [
      { name: 'Pushpak Lead', role: 'Head', phone: '+91 6301932007' }
    ],
    registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    tags: ['UAV', 'Multirotor', 'Obstacle Course', 'Flight Controller'],
    schedule: 'Day 2',
    location: 'Open Air Grounds'
  },
  {
    id: 'sarvaagami',
    number: '03',
    name: 'SARVAAGAMI',
    category: 'Autonomous',
    tagline: 'All-Terrain Rover Navigation & Extreme Obstacle Traversal',
    shortDesc: 'Engineered for unpredictable wilderness. Command your all-terrain rover across rocky scree, sand pits, steep ramps, and bridge traverses.',
    fullDesc: 'Sarvaagami challenges engineers to build rovers capable of tackling varied, punishing terrains. Suspensions, high-friction treads, and torque distribution are tested to their limits as machines conquer rigorous engineered obstacles.',
    bannerImage: '/img/Events_Banners/sarvagami.jpg',
    iconBg: '/img/Event_Icons/sarvagami_icon_bg.jpg',
    iconFg: '/img/Event_Icons/sarvagami_icon_fg.png',
    pdfRulebook: '/RV 25 Rule books/SARVAAGAMI RV\'25.pdf',
    prizePool: 'Cash Prizes & Awards',
    coordinators: [
      { name: 'Sarvaagami Lead', role: 'Head', phone: '+91 6301932007' }
    ],
    registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    tags: ['All-Terrain', 'Rocker-Bogie', 'High Torque', 'Suspension'],
    schedule: 'Day 1 & Day 2',
    location: 'Outdoor All-Terrain Pit'
  },
  {
    id: 'yoddha',
    number: '04',
    name: 'YODDHA',
    category: 'Combat',
    tagline: 'Sumo Ring Confrontation & Pushing Power',
    shortDesc: 'Two machines enter the circular dohyo ring; only one stays. Test grip, mass, traction, and strategic offensive wedges.',
    fullDesc: 'YODDHA is the classic robotic confrontation where bots duel to push each other out of an elevated circular ring. Agility, torque-to-weight ratio, and low-profile wedges make all the difference in this fast-paced collision challenge.',
    bannerImage: '/img/Events_Banners/yodha_banner.jpg',
    iconBg: '/img/Event_Icons/yodha_icon_bg.jpg',
    iconFg: '/img/Event_Icons/yodha_icon_fg.png',
    pdfRulebook: '/RV 25 Rule books/YODDHA RV\'25.pdf',
    prizePool: 'Cash Prizes & Trophies',
    coordinators: [
      { name: 'Yoddha Lead', role: 'Head', phone: '+91 6301932007' }
    ],
    registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    tags: ['Robo Sumo', 'Dohyo Ring', 'High Traction', 'Wedge Design'],
    schedule: 'Day 1',
    location: 'Central Arena Stage'
  },
  {
    id: 'lakshmanarekha',
    number: '05',
    name: 'LAKSHMANAREKHA',
    category: 'Autonomous',
    tagline: 'Precision Autonomous Line Follower with Complex Grid Traversal',
    shortDesc: 'Autonomous optical sensor tracking along sharp curves, discontinuous lines, inversions, and multi-path grid networks.',
    fullDesc: 'An intense test of algorithm design and optical sensor fusion. Autonomous line followers must decode intricate tracks with speed, zero off-track penalties, acute hairpin turns, and dynamic lighting variations.',
    bannerImage: '/img/Events_Banners/lakshmanrekha_banner.jpg',
    iconBg: '/img/Event_Icons/lakshmanrekha_icon_bg.jpeg',
    iconFg: '/img/Event_Icons/lakshmanrekha_icon_fg.png',
    pdfRulebook: '/RV 25 Rule books/LAKSHMANREKHA RV\'25 new.pdf',
    prizePool: 'Cash Prizes & Mementos',
    coordinators: [
      { name: 'Lakshmanarekha Lead', role: 'Head', phone: '+91 6301932007' }
    ],
    registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    tags: ['PID Controller', 'IR Sensor Array', 'Line Following', 'Microcontroller'],
    schedule: 'Day 2',
    location: 'Robotics Lab Corridor'
  },
  {
    id: 'gati',
    number: '06',
    name: 'GATI',
    category: 'Speed',
    tagline: 'High-Velocity Track Racing & Formula Robotics',
    shortDesc: '"Power and speed acts as hands and feet". Bolt down the speedway, master hairpins, and clock the fastest lap time on the circuit.',
    fullDesc: '"Power and speed acts as hands and feet". Witness this great quote by Ralph Waldo Emerson in the event Gati at RoboVeda. Unveil the hidden racer within you and bolt up unleashing speed on the track. Perfection is the key to success. Taking the right turns at the right time inclines you to the path of victory.',
    bannerImage: '/img/Events_Banners/gati_banner.jpg',
    iconBg: '/img/Event_Icons/gati_icon_bg.jpg',
    iconFg: '/img/Event_Icons/gati_icon_fg.png',
    pdfRulebook: '/RV 25 Rule books/GATI RV\'25.pdf',
    prizePool: 'Cash Prizes & Speed Trophy',
    coordinators: [
      { name: 'Sai Varun', role: 'Head', phone: '+91 6301932007', image: '/img/RV 25 board/Gati h1.jpg' }
    ],
    registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    tags: ['Track Racing', 'Differential Drive', 'Speed Lap', 'Low Center of Gravity'],
    schedule: 'Day 1 & Day 2',
    location: 'Speedway Circuit'
  },
  {
    id: 'goalaa',
    number: '07',
    name: 'GOALAA',
    category: 'Speed',
    tagline: 'Robo-Soccer Tournament: Strategy, Ball Control & Goal Scoring',
    shortDesc: 'Fast-paced 1v1 and 2v2 robotic soccer. Maneuver the ball across the turf, evade defenders, and execute pinpoint strikes into the net.',
    fullDesc: 'A thrilling high-energy robotic football showdown! Competitors maneuver customized bots to dribble, tackle, defend, and shoot goals in an enclosed football arena with penalty kicks and tactical overtimes.',
    bannerImage: '/img/Events_Banners/golaa_banner.jpg',
    iconBg: '/img/Event_Icons/gola_icon_bg.jpg',
    iconFg: '/img/Event_Icons/golaa_icon_fg.png',
    pdfRulebook: '/RV 25 Rule books/GOALAA RV\'25 new.pdf',
    prizePool: 'Cash Prizes & Football Trophy',
    coordinators: [
      { name: 'Goalaa Lead', role: 'Head', phone: '+91 6301932007' }
    ],
    registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    tags: ['Robo Soccer', 'Ball Handling', 'Dribbler Mechanism', 'Fast Maneuver'],
    schedule: 'Day 2',
    location: 'Turf Stadium'
  },
  {
    id: 'yantraa',
    number: '08',
    name: 'YANTRAA',
    category: 'Mechanism',
    tagline: 'Heavy Payload Gripping, Multi-Axis Pick & Place Arm',
    shortDesc: 'Articulated robotic manipulators engineered for precision sorting, lifting payloads, and stacking modular engineering units.',
    fullDesc: 'Yantraa evaluates kinematic precision and payload carrying capacity. Robotic arms with custom end-effectors must lift, transport, and accurately assemble complex items across designated loading bays within record time.',
    bannerImage: '/img/Events_Banners/yantraa_banner.jpeg',
    iconBg: '/img/Event_Icons/yantra_icon_bg.jpg',
    iconFg: '/img/Event_Icons/yantra_icon_fg.png',
    pdfRulebook: '/RV 25 Rule books/YANTRAA RV\'25.pdf',
    prizePool: 'Cash Prizes & Mementos',
    coordinators: [
      { name: 'Yantraa Lead', role: 'Head', phone: '+91 6301932007' }
    ],
    registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    tags: ['Robotic Arm', 'End-Effector', 'Kinematics', 'Servo Gripper'],
    schedule: 'Day 1',
    location: 'Mechanism Bay'
  },
  {
    id: 'samanvayi',
    number: '09',
    name: 'SAMANVAYI',
    category: 'Autonomous',
    tagline: 'Multi-Agent Cooperative Robotics & Synchronized Teamwork',
    shortDesc: 'Two robots collaborate simultaneously—one navigating, one manipulating—to accomplish intricate combined mission objectives.',
    fullDesc: 'The true mark of modern industrial automation: cooperative robotics. Samanvayi demands two distinct robotic units working in flawless sync over wireless telemetry to solve joint navigation and material handling challenges.',
    bannerImage: '/img/Events_Banners/samanvayi.jpg',
    iconBg: '/img/Event_Icons/samanvayi_icon_bg.jpeg',
    iconFg: '/img/Event_Icons/samanvayi_icon_fg.png',
    pdfRulebook: '/RV 25 Rule books/SAMANVAYI RV\'25new.pdf',
    prizePool: 'Cash Prizes & Certificates',
    coordinators: [
      { name: 'Samanvayi Lead', role: 'Head', phone: '+91 6301932007' }
    ],
    registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    tags: ['Multi-Agent', 'Swarm Logic', 'Wireless Telemetry', 'Cooperation'],
    schedule: 'Day 2',
    location: 'Autonomous Arena'
  },
  {
    id: 'jaladhmatra',
    number: '10',
    name: 'JALADHMATRA',
    category: 'Aquatic',
    tagline: 'Underwater & Surface Amphibious Robotics Challenge',
    shortDesc: 'Hydrodynamic propulsion, waterproof sealing, and buoyancy control in deep aquatic tanks with submerged mission gates.',
    fullDesc: 'Dive into underwater robotics! Jaladhmatra pits aquatic rovers and submarines against water resistance, buoyancy balancing, and submerged gate navigation while retrieving submerged tokens.',
    bannerImage: '/img/Events_Banners/jalad_banner.jpg',
    iconBg: '/img/Event_Icons/jaladhmatra_icon_bg.jpg',
    iconFg: '/img/Event_Icons/jaladhmatra_icon_fg.png',
    pdfRulebook: '/RV 25 Rule books/JALADHMATRA RV\'25.pdf',
    prizePool: 'Cash Prizes & Aquatic Trophy',
    coordinators: [
      { name: 'Jaladhmatra Lead', role: 'Head', phone: '+91 6301932007' }
    ],
    registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    tags: ['Aquatic ROV', 'Hydrodynamics', 'Waterproof Enclosure', 'Buoyancy'],
    schedule: 'Day 2',
    location: 'Aquatic Tank Arena'
  },
  {
    id: 'projectexpo',
    number: '11',
    name: 'PRADARSHAN (PROJECT EXPO)',
    category: 'Innovation',
    tagline: 'Flagship Hardware Prototype & Engineering Innovation Showcase',
    shortDesc: 'Showcase working hardware prototypes, embedded systems, patented concepts, and industrial robotics before esteemed jury panels.',
    fullDesc: 'Pradarshan is the premier project exhibition platform at RoboVeda. Students and tech enthusiasts demonstrate their innovative working prototypes across IoT, Robotics, Automation, Healthcare, Defense, and Green Tech to industry judges.',
    bannerImage: '/img/pradarshan.png',
    iconBg: '/img/Event_Icons/yantra_icon_bg.jpg',
    iconFg: '/img/pradarshan.png',
    prizePool: 'Cash Grants & Incubation Opportunities',
    coordinators: [
      { name: 'Expo Convener', role: 'Head', phone: '+91 6301932007' }
    ],
    registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    tags: ['Hardware Prototype', 'IoT & Embedded', 'Jury Evaluation', 'Incubation'],
    schedule: 'Day 1 & Day 2',
    location: 'Exhibition Hall'
  },
  {
    id: 'ideathon',
    number: '12',
    name: 'IDEATHON',
    category: 'Innovation',
    tagline: 'Engineering Problem-Solving & Disruptive Tech Pitch',
    shortDesc: 'Pitch revolutionary solutions to real-world industrial and societal engineering bottlenecks. Turn abstract concepts into structured blueprints.',
    fullDesc: 'A battle of visionary minds. Pitch your technological concepts, feasibility models, and architectural blueprints for next-gen automation, autonomous systems, and sustainability before venture and academic mentors.',
    bannerImage: '/img/bg-img/ideathon.jpg',
    iconBg: '/img/Event_Icons/drone_icon_bg.jpeg',
    iconFg: '/img/bg-img/ideathon.jpg',
    prizePool: 'Cash Prizes & Mentorship',
    coordinators: [
      { name: 'Ideathon Lead', role: 'Head', phone: '+91 6301932007' }
    ],
    registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    tags: ['Pitch Deck', 'Problem Solving', 'Tech Architecture', 'Disruption'],
    schedule: 'Day 1',
    location: 'Seminar Auditorium'
  },
  {
    id: 'drone-workshop',
    number: '13',
    name: 'DRONE DYNAMICS WORKSHOP',
    category: 'Workshop',
    tagline: 'Comprehensive Hands-On UAV Aerodynamics, Assembly & Piloting',
    shortDesc: 'Build, configure, calibrate, and pilot a multirotor drone from raw components with expert guidance from certified UAV engineers.',
    fullDesc: 'Get your hands dirty with real hardware! From brushless ESC calibration to flight controller programming (Betaflight), gyro tuning, RF receiver binding, and live piloting in an indoor flight cage.',
    bannerImage: '/img/bg-img/drone.png',
    iconBg: '/img/Event_Icons/drone_icon_bg.jpeg',
    iconFg: '/img/bg-img/drone.png',
    prizePool: 'Certified UAV Training Certificate + Kit Takeaway',
    coordinators: [
      { name: 'Workshop Lead', role: 'Head', phone: '+91 6301932007' }
    ],
    registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    tags: ['Hands-on Kit', 'Flight Dynamics', 'Betaflight Config', 'Certified Training'],
    schedule: 'Day 1 & Day 2',
    location: 'Aero Lab'
  },
  {
    id: 'robotics-iot-workshop',
    number: '14',
    name: 'ROBOTICS & IOT WORKSHOP',
    category: 'Workshop',
    tagline: 'Microcontrollers, Sensor Fusion, Cloud MQTT & Motor Drivers',
    shortDesc: 'Master embedded robotics architecture, real-time telemetry streaming, Wi-Fi/Bluetooth control, and automated sensor response loops.',
    fullDesc: 'A powerhouse hands-on masterclass diving deep into embedded microcontroller systems, actuator drivers, sensor integration (Ultrasonic, IMU, IR), wireless IoT command pipelines, and building autonomous robotic nodes.',
    bannerImage: '/img/Images/workshop.jpg',
    iconBg: '/img/Event_Icons/yodha_icon_bg.jpg',
    iconFg: '/img/Images/workshop.jpg',
    prizePool: 'Verified Certification & Project Kit',
    coordinators: [
      { name: 'IoT Lead', role: 'Head', phone: '+91 6301932007' }
    ],
    registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
    tags: ['Microcontrollers', 'IoT Telemetry', 'Actuator Control', 'Hands-on Projects'],
    schedule: 'Day 1 & Day 2',
    location: 'IoT Innovation Hub'
  }
];
