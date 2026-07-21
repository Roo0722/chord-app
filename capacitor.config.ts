import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.junjun.chordbook",
  appName: "Chord Book",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
