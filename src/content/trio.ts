export type MediaAsset = { src: string; alt: string; label: string };

const placeholder = (label: string, alt: string): MediaAsset => ({ src: "", alt, label });

/** Official TRIO first-look key art. */
export const firstLookArt: MediaAsset = {
  src: "/images/TRIO landscape.png",
  alt: "TRIO official first look poster — Bible Way Galaxy presents a J³ film",
  label: "OFFICIAL FIRST LOOK",
};

/** Official transparent TRIO title logo. */
export const trioLogo = {
  src: "/images/trio-logo.png",
  alt: "TRIO",
  width: 852,
  height: 750,
} as const;

export const trioContent = {
  branding: {
    logo: trioLogo,
  },
  film: {
    title: "TRIO",
    studio: "BIBLE WAY GALAXY",
    creators: "J³",
    creatorLine: "A J CUBE FILM",
    tagline: "WHEN THE WORLD CHOOSES TO BOW,\nTHREE MEN CHOOSE TO STAND.",
    inspiration: "Inspired by Daniel 3 × Revelation 13",
    releaseStatus: "COMING SOON",
    releaseDate: "",
    teaserUrl: "https://www.youtube.com/embed/UMXzCSEDjmw?autoplay=1&rel=0",
    copyright: "TRIO © 2026 Bible Way Galaxy",
  },
  navigation: [
    { label: "STORY", href: "#story" },
    { label: "WORLD", href: "#world" },
    { label: "VISION", href: "#vision" },
    { label: "FUNDING & CONTRIBUTION", href: "#funding" },
    { label: "BEHIND TRIO", href: "#behind" },
    { label: "THE THREE", href: "#the-three" },
    { label: "WATCH", href: "#watch" },
  ],
  ctas: { watch: "WATCH THE TEASER", explore: "EXPLORE TRIO" },
  intro: {
    presenter: "BIBLE WAY GALAXY PRESENTS",
    system: "WELCOME TO THE WORLD OF TRIO",
    skip: "SKIP INTRO",
  },
  heroMedia: firstLookArt,
  poster: firstLookArt,
  story: {
    label: "01 / THE STORY",
    heading: "A WORLD HAS CHOSEN TO BOW.\nTHREE MEN CHOOSE TO STAND.",
    synopsis: [
      "In a world where obedience is no longer requested but engineered, a new order measures loyalty through identity, access and surrender.",
      "Three men are faced with a single demand: bow with everyone else—or stand together for the God they refuse to deny.",
    ],
    beats: ["THE WORLD BOWED.", "THREE DIDN’T.", "THE SYSTEM NOTICED."],
    media: {
      src: "/images/IMG_7435.JPG",
      alt: "Official story still from TRIO",
      label: "OFFICIAL STORY STILL",
    },
  },
  world: {
    label: "02 / THE WORLD",
    heading: "ENTER THE WORLD\nOF TRIO",
    copy: "Every system has rules.\nEvery rule demands obedience.",
    cards: [
      {
        title: "DOMINOR",
        subtitle: "When a man demands the worship that belongs to God alone",
        code: "CLASSIFIED / FILE 01",
        description: "The corporate authority at the center of a world built on total compliance.",
        details: [
          "In TRIO, Dominor represents the biblical Antichrist in Revelation 13, Dominor embodies counterfeit divinity and absolute worldly power. Through Operation D6, he seeks to unite the world under one system, demanding not merely obedience, but worship. His name evokes *dominion* — the desire to rule and control all.",
        ],
        media: {
          src: "/images/WORLD/DOMINOR 2.JPG",
          alt: "Dominor",
          label: "DOMINOR",
        },
      },
      {
        title: "OPERATION D6",
        subtitle: "",
        code: "MANDATE & SYSTEM / FILE 02",
        description:
          "The state protocol combining Act 138A with the D6 economic system—an absolute identity and financial grid controlling who may buy, sell, work, and survive.",
        details: [
          "Operation D6 is Dominor’s ultimate blueprint for global domination, developed under 6S6 Global, his multinational corporation. The name *D6* stands for *Dominor 6*, with the number six symbolically echoing the mark of the Beast 666 in biblical prophecy of Revelation 13. Through the D6 implant, Dominor seeks to control identity, finances, and access to the global economy — transforming technological advancement into an instrument of absolute control. What begins as a promise of progress becomes a demand for submission: accept the system, worship Dominor, or be excluded from society.",
        ],
        media: {
          src: "/images/WORLD/OPERATION D6.jpg",
          alt: "Operation D6",
          label: "OPERATION D6",
        },
      },
      {
        title: "THE TRIO",
        subtitle: "SHADRACH, MESHACH & ABED",
        code: "ACCESS RESTRICTED / FILE 03",
        description: "Three men whose refusal exposes the limit of a system built to own belief.",
        details: [
          "Three individuals united by one conviction: their allegiance belongs to God alone. Inspired by the biblical account in Daniel 3, they stand against Dominor’s demand for absolute submission, refusing to bow to a false god even when threatened with death. In a world where survival demands conformity, their unwavering faith becomes an act of defiance. They may stand alone against the world, but they will never stand apart from their God — proving that true faith never bows to a false god.",
        ],
        media: {
          src: "/images/WORLD/TRIO 2.png",
          alt: "THE TRIO",
          label: "The three central figures",
        },
      },
    ],
  },
  characters: {
    label: "06 / THE THREE",
    heading: "THREE MEN. ONE GOD. ONE STAND.",
    phrases: ["THREE MEN.", "ONE GOD.", "ONE STAND."],
    people: [
      {
        name: "JESHURUN PAUL",
        role: "Writer & Director",
        details: [
          "Jeshurun Paul is a filmmaker passionate about visual storytelling and exploring the Christian faith through cinema. Through TRIO, he offers a contemporary retelling of a timeless biblical account, exploring the cost of unwavering faith in a world that demands conformity. As screenplay and dialogue writer, director, executive producer, and editor, he shapes the film from its earliest words to its final cut.",
        ],
        image: {
          src: "/images/J3 - 1.png",
          alt: "Jeshurun Paul — Writer & Director",
          label: "JESHURUN PAUL",
        },
      },
      {
        name: "JABIN SAMUEL",
        role: "Music Producer",
        details: [
          "Jabin Samuel plays a significant role in shaping TRIO, contributing to its musical identity as well as its script and ideation. As music producer, he helps establish the film’s sonic atmosphere and emotional intensity, while his creative input contributes to the story’s development. He also portrays Meshak, bringing one of the film’s central characters to life on screen.",
        ],
        image: {
          src: "/images/J3 - 2.png",
          alt: "Jabin Samuel — Music Producer",
          label: "JABIN SAMUEL",
        },
      },
      {
        name: "JEREMY GLADSON",
        role: "Creative Manager",
        details: [
          "Jeremy Gladson contributes to both the creative and logistical sides of TRIO. As Creative Manager, he oversees on-set coordination, props, rentals, and production support, helping ensure the team and its resources come together effectively. He also portrays Abed, bringing one of the film’s central characters to life on screen.",
        ],
        image: {
          src: "/images/J3 - 3.png",
          alt: "Jeremy Gladson — Creative Manager",
          label: "JEREMY GLADSON",
        },
      },
    ],
  },
  quote: ["THEY CAN CONTROL THE SYSTEM.", "BUT NOT THEIR FAITH."],
  behind: {
    label: "05 / BEHIND TRIO",
    heading: "FROM SCRIPT\nTO SCREEN.",
    copy: "TRIO is an independently produced film shaped through faith, collaboration and ambitious filmmaking.",
    stages: [
      { name: "CONCEPT", completion: 100 },
      { name: "PRODUCTION", completion: 100 },
      { name: "POST PRODUCTION", completion: 40 },
      { name: "FINAL FILM", completion: 70 },
    ],
    // Numeric source-filename order; the supplied shortlist has no image 8.
    images: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
      (fileNumber, index): MediaAsset => ({
        src: `/images/behind-trio/${fileNumber}.webp`,
        alt: `Behind the scenes of TRIO, scene ${index + 1}`,
        label: `Scene ${index + 1}`,
      }),
    ),
  },
  vision: {
    label: "03 / THE VISION",
    heading: "REDEFINING\nCHRISTIAN CINEMA.",
    copy: [
      "TRIO is more than a film; it is a bold vision to redefine Christian cinema for a generation that deserves stories as powerful in their storytelling as they are profound in their faith. Crafted by J³, TRIO brings together cinematic excellence, gripping suspense, thought-provoking world-building, and uncompromising biblical truth to create an experience that transcends conventions and challenges expectations. Rooted in the prophetic imagery of Daniel 3 and Revelation 13, this Christian thriller confronts the cost of conviction in a world that demands conformity, asking a timeless question: When the world chooses to bow, will you stand? With a commitment to innovation, excellence, and Christ-centred storytelling, J³ seeks to push the boundaries of Christian filmmaking—not merely to tell stories about faith, but to bring faith to life through cinema. This is TRIO. This is J³. And this is Christian cinema reimagined.",
    ],
  },
  creators: {
    title: "J³",
    subtitle: "A J³ FILM",
    copy: "Jeshurun, Jabin and Jeremy form a collaborative filmmaking identity united by faith, craft and a shared vision for the screen.",
    names: ["JESHURUN PAUL", "JABIN SAMUEL", "JEREMY GLADSON"],
  },
  trailer: {
    eyebrow: "THE WORLD OF TRIO AWAITS.",
    heading: "ENTER THE WORLD\nOF TRIO.",
    poster: firstLookArt,
  },
  credits: [
    {
      role: "CAST",
      names: [
        "Jeshurun as Shadrach",
        "Jabin as Meshak",
        "Jeremy as Abed",
        "Leon Daniel as Nezzar",
        "Priyan Frank as Felix",
        "Jason Brendan as Victor",
        "Raj Vijay as James",
      ],
    },
    { role: "WRITER & DIRECTOR", names: ["Jeshurun Paul Moses"] },
    { role: "ORIGINAL SCORE", names: ["Jabin Jason Samuel"] },
    { role: "CREATIVE DIRECTION & PRODUCTION MANAGER", names: ["Jeremy Gladson"] },
    { role: "DIRECTOR OF PHOTOGRAPHY", names: ["Richard Davidson"] },
    { role: "FILM WEB DESIGNER", names: ["Roshan Ingershal"] },
    { role: "DI-Colorist", names: ["Agrim Punia"] },
    { role: "EDITING, VFX & PUBLICITY DESIGN", names: ["Jeshurun Paul Moses"] },
    { role: "PRODUCED BY", names: ["Bible Way Galaxy"] },
    { role: "", names: ["FUNDED BY PEOPLE WHO BELIEVED IN OUR MINISTRY"] },
  ],
  finalMessage: ["BIBLE WAY GALAXY", "GLORY TO GOD, BECAUSE HE LIVES!"],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/trio_thechristianfilm/" },
    { label: "YouTube", href: "https://www.youtube.com/@BibleWayGalaxy" },
  ],
} as const;
