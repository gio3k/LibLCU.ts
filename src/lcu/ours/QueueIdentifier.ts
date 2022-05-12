/**
 * QueueIdentifier enum
 * Accurate as of 27/04/2022
 * @author lotuspar
 */

enum QueueIdentifier {
  // CLASSIC
  DRAFT = 400, // Draft Pick
  RANKED_SOLO_DUO = 420, // Ranked Solo/Duo
  BLIND = 430, // Blind Pick
  RANKED_FLEX = 440, // Ranked Flex

  // ARAM
  ARAM = 450, // All Random All Mid, ARAM

  // CLASSIC
  CLASH = 700, // Clash

  // CLASSIC
  COOP_BOTS_INTRO = 830, // Co-Op vs AI - Intro
  COOP_BOTS_BEGINNER = 840, // Co-Op vs AI - Beginner
  COOP_BOTS_INTERMEDIATE = 850, // Co-Op vs AI - Intermediate

  // TFT
  TFT = 1090, // Teamfight Tactics
  TFT_RANKED = 1100, // Ranked Teamfight Tactics
  TFT_TUTORIAL = 1110, // Teamfight Tactics Tutorial
  TFT_HYPER_ROLL = 1130, // Teamfight Tactics (Hyper Roll)
  TFT_DOUBLE_UP = 1150, // Teamfight Tactics (Double Up Workshop)

  // NEXUSBLITZ
  NEXUS_BLITZ = 1300, // Nexus Blitz

  // TUTORIAL_MODULE_[1-3]
  TUTORIAL_MODULE_1 = 2000, // Tutorial Part 1
  TUTORIAL_MODULE_2 = 2010, // Tutorial Part 2
  TUTORIAL_MODULE_3 = 2020, // Tutorial Part 3

  // PRACTICETOOL, CLASSIC
  CUSTOM = -1,
}

export enum DiscontinuedQueueIdentifier {
  // CLASSIC
  CLASSIC_BLIND_3X3 = 460, // Unknown Blind Pick 3v3 (presumably Twisted Treeline)
  CLASSIC_RANKED_FLEX_3X3 = 470, // Ranked Flex (Twisted Treeline)

  // ASSASSINATE
  ASSASSINATE_BLOOD_MOON = 600,

  // DARKSTAR
  DARKSTAR = 610,

  // CLASSIC
  CLASSIC_COOP_BOTS_INTRO_3X3 = 810,
  CLASSIC_COOP_BOTS_BEGINNER_3X3 = 820,
  CLASSIC_COOP_BOTS_INTERMEDIATE_3X3 = 800,

  // ARAM
  ARAM_COOP_BOTS = 860, // ARAM 5v5 Bots

  // URF
  URF_ARURF = 900, // All Random Ultra Rapid Fire

  // ASCENSION
  ASCENSION = 910, // Ascension

  // KINGPORO
  KINGPORO = 920,

  // CLASSIC (?)
  CLASSIC_ARAM_BILGEWATER = 930, // Butcher's Bridge ARAM

  // SIEGE
  NEXUS_SIEGE = 940,

  // DOOMBOTSTEEMO
  DOOMBOTSTEEMO_LEVEL100GAUNTLET = 950,
  DOOMBOTSTEEMO_TEEMOING = 960,

  // STARGUARDIAN
  STARGUARDIAN_INVASION_NORMAL = 980, // Invasion (Normal)
  STARGUARDIAN_INVASION_ONSLAUGHT = 990, // Invasion (Onslaught)

  // PROJECT
  PROJECT_OVERCHARGE = 1000,

  // SNOWURF
  SNOWURF_ARURF = 1010,

  // ONEFORALL
  ONEFORALL = 1020,

  // ODYSSEY
  ODYSSEY_INTRO = 1030, // Odyssey (Intro)
  ODYSSEY_CADET = 1040, // Odyssey (Cadet)
  ODYSSEY_CREWMEMBER = 1050, // Odyssey (Crewmember)
  ODYSSEY_CAPTAIN = 1060, // Odyssey (Captain)
  ODYSSEY_ONSLAUGHT = 1070, // Odyssey (Onslaught)

  // TFT
  TFT_1X0 = 1091, // ?
  TFT_2X0 = 1092, // ?
  TFT_SIMULATION = 1111, // ?
  TFT_RANKED_DOUBLE_UP = 1160,

  // GAMEMODEX (presumably old Nexus Blitz)
  GAMEMODEX = 1200, // Nexus Blitz

  // NEXUSBLITZ
  NEXUSBLITZ = 1300, // Nexus Blitz

  // ULTBOOK
  ULTBOOK = 1400, // Ultimate Spellbook

  // URF
  URF = 1900, // Ultra Rapid Fire

  // TFT (maybe used but can't confirm)
  TFT_CUSTOM = 3000,
  TFT_HYPER_ROLL_CUSTOM = 3010,
}

export default QueueIdentifier;
