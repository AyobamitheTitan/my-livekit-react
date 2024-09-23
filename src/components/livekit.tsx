import {
    LiveKitRoom,
    ParticipantName,
    RoomAudioRenderer,
    isTrackReference,
    useConnectionQualityIndicator,
    VideoTrack,
    ControlBar,
    GridLayout,
    useTracks,
    TrackRefContext,

  } from '@livekit/components-react';
  import { ConnectionQuality, Room, Track } from 'livekit-client';

  import { HTMLAttributes, useState } from 'react';
  
  const CustomizeExample = () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjcwODAyMTUsImlzcyI6IkFQSTNkVnFYNktIeVpQRCIsIm5iZiI6MTcyNzA3NjYxNSwic3ViIjoiRGFyaXVzIGZyZWVtYW4iLCJ2aWRlbyI6eyJjYW5QdWJsaXNoIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuUHVibGlzaFNvdXJjZXMiOlsiY2FtZXJhIiwibWljcm9waG9uZSJdLCJyb29tIjoibmV3IHJvb20iLCJyb29tQWRtaW4iOnRydWUsInJvb21Kb2luIjp0cnVlfX0.FpbraOc_9s3mxJtvVC4rh-ae_n6YSJgEvwPB6FsSMbw"
    // const basic_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjcwODAzNzYsImlzcyI6IkFQSTNkVnFYNktIeVpQRCIsIm5iZiI6MTcyNzA3Njc3Niwic3ViIjoiRGFyaXVzIGZyZWVtYW4iLCJ2aWRlbyI6eyJjYW5QdWJsaXNoIjpmYWxzZSwiY2FuUHVibGlzaERhdGEiOmZhbHNlLCJyb29tIjoibmV3IHJvb20iLCJyb29tSm9pbiI6dHJ1ZX19.XW9LoZTN8mGRQVDz0TMdBGLcLTe1I-wB8nbXqkq28xA"
    const [room] = useState(new Room());
    
    const [connect, setConnect] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const handleDisconnect = () => {
      setConnect(false);
      setIsConnected(false);
    };
  
    return (
      <div  data-lk-theme="default">
        <main >
          <h1 >
            Welcome to Marketz
          </h1>
          {!isConnected && (
            <button onClick={() => setConnect(!connect)}>
              {connect ? 'Disconnect' : 'Connect'}
            </button>
          )}
          <LiveKitRoom
            room={room}
            token={token}
            serverUrl={"wss://first-marketz-9g83dxi6.livekit.cloud"}
            connect={connect}
            onConnected={() => setIsConnected(true)}
            onDisconnected={handleDisconnect}
            audio={true}
            video={true}
          >

            <RoomAudioRenderer />
            {/* Render a custom Stage component once connected */}
            {isConnected && <Stage/>}
            <ControlBar />
          </LiveKitRoom>
        </main>
      </div>
    );
  };
  
  export function Stage() {

    const tracks = useTracks([
      Track.Source.Microphone,
      Track.Source.Microphone,
      Track.Source.ScreenShare,
    ]);
    return (
      <>
        <div >
          <GridLayout tracks={tracks}>
            <TrackRefContext.Consumer>
              {(trackRef) =>
                trackRef && (
                  <div className="my-tile">
                    {isTrackReference(trackRef) ? (
                    <div>
                     <VideoTrack trackRef={trackRef} />
                    <ParticipantName
                      style={{ color: 'blue' }}
                    />
                    <UserDefinedConnectionQualityIndicator />
                  </div>
                    ) : (
                        <div>
                        </div>
                    )}
                  </div>
                )
              }
            </TrackRefContext.Consumer>
          </GridLayout>
        </div>
      </>
    );
  }
  
  export function UserDefinedConnectionQualityIndicator(props: HTMLAttributes<HTMLSpanElement>) {
    /**
     *  We use the same React hook that is used internally to build our own component.
     *  By using this hook, we inherit all the state management and logic and can focus on our implementation.
     */
    const { quality } = useConnectionQualityIndicator();
  
    function qualityToText(quality: ConnectionQuality): string {
      switch (quality) {
        case ConnectionQuality.Poor:
          return 'Poor';
        case ConnectionQuality.Good:
          return 'Good';
        case ConnectionQuality.Excellent:
          return 'Excellent';
        case ConnectionQuality.Lost:
          return 'Reconnecting';
        default:
          return 'No idea';
      }
    }
  
    return <span {...props}> {qualityToText(quality)} </span>;
  }
  
  export default CustomizeExample;