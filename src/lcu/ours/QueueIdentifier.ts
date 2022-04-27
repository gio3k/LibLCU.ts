/**
 * LobbyQueueId enum
 * Accurate as of 27/04/2022
 * @author lotuspar
 */

enum LobbyQueueId {
  // CLASSIC
  BLIND = 430, // Blind Pick
  DRAFT = 400, // Draft Pick
  RANKED_SOLO_DUO = 420, // Ranked Solo/Duo
  RANKED_FLEX = 440, // Ranked Flex

  // ARAM
  ARAM = 450, // All Random All Mid, ARAM

  // CLASSIC
  COOP_BOTS_INTRO = 830, // Co-Op vs AI - Intro
  COOP_BOTS_BEGINNER = 840, // Co-Op vs AI - Beginner
  COOP_BOTS_INTERMEDIATE = 850, // Co-Op vs AI - Intermediate

  // TFT
  TFT = 1090, // Teamfight Tactics
  TFT_RANKED = 1100, // Ranked Teamfight Tactics
  TFT_HYPER_ROLL = 1130, // Teamfight Tactics (Hyper Roll)
  TFT_DOUBLE_UP = 1150, // Teamfight Tactics (Double Up Workshop)

  // NEXUSBLITZ
  NEXUS_BLITZ = 1300, // Nexus Blitz

  // PRACTICETOOL, CLASSIC
  CUSTOM = -1,
}
export default LobbyQueueId;
