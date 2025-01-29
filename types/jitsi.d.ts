/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

declare module "JitsiMeetJS" {
  const init: () => Promise<void>;
  const createLocalTracks: (options: any) => Promise<any[]>;
  const JitsiConnection: any;
  const events: any;
  const version: string;
  export default JitsiMeetJS;
}

export {};
