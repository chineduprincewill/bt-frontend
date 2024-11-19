import './VideoPlayer.style.scss';

import { forwardRef, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { twMerge } from 'tailwind-merge';

import Forward15icon from '../../assets/forward-15s.svg';
import PauseIcon from '../../assets/pause-icon.svg';
import PlayIcon from '../../assets/play-icon.svg';
import Rewind15Icon from '../../assets/rewind-15s.svg';
import SettingsIcon from '../../assets/settings-icon.svg';
import VolumeMuted from '../../assets/volume-muted.svg';
import VolumeUnmuted from '../../assets/volume-unmuted.svg';
import { formatTime } from '../../utils/utils';

interface IVideoProps {
    url?: string;
    className?: string;
}

interface IVideoRefProps {
    pause: () => void;
}

export const VideoPlayer = forwardRef<IVideoRefProps, IVideoProps>(({ url, className = '' }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const playerRef = useRef<ReactPlayer>(null);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);

        if (!isPlaying) {
            if (playerRef.current?.getDuration() === currentTime) {
                // Check if video ended
                setCurrentTime(0); // Reset current time to beginning
            }
            playerRef.current!.seekTo(currentTime); // Seek to current time
        }
    };

    const handleSeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTime(event.target.valueAsNumber);
        playerRef.current!.seekTo(event.target.valueAsNumber);
    };

    const handleRewind = () => {
        const newTime = Math.max(currentTime - 15, 0); // Clamp rewind to 0 seconds
        setCurrentTime(newTime);
        playerRef.current!.seekTo(newTime);
    };

    const handleForward = () => {
        const newTime = Math.min(currentTime + 15, playerRef.current!.getDuration()); // Clamp forward to video duration
        setCurrentTime(newTime);
        playerRef.current!.seekTo(newTime);
    };

    const handleMute = () => {
        setIsMuted((prev) => !prev);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isPlaying) {
                setCurrentTime(playerRef.current!.getCurrentTime());
            }
        }, 100); // Update current time every 100ms

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [isPlaying]);

    return (
        <div className={twMerge('video-player w-full', className)}>
            <div className="relative w-full bg-black h-max rounded-[20px] overflow-hidden">
                <ReactPlayer
                    url={url ? url : 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4'}
                    className="aspect-video rounded-20px] overflow-hidden"
                    height={'100%'}
                    width={'100%'}
                    onProgress={(progress) => setCurrentTime(progress.played * playerRef.current!.getDuration())} // Update current time on progress
                    playing={isPlaying}
                    muted={isMuted}
                    ref={playerRef}
                />
            </div>

            <div className="p-4 mt-5">
                {/* <------------Progress Time ------------>*/}
                <div className="flex justify-between w-full">
                    <span className="font-medium text-xs text-[#333]">{formatTime(currentTime)}</span>
                    <span className="font-medium text-xs text-[#333]">{formatTime(playerRef.current?.getDuration() || 0)}</span>
                </div>

                {/* <-----------Progress bar ------------>*/}
                {/* <div className="mt-3 w-full rounded-full bg-[#B3B3B366]">
                    <div className="bg-[#E16757] h-1 rounded-full w-1/2"></div>
                </div> */}
                <input
                    className="w-full"
                    type="range"
                    min={0}
                    max={playerRef.current?.getDuration() || 0}
                    value={currentTime}
                    onChange={handleSeekChange}
                />

                {/* <-----------Controls ------------>*/}
                <div className="flex items-center justify-between w-full mt-3">
                    <img src={isMuted ? VolumeMuted : VolumeUnmuted} alt="Mute video " className="w-8 h-8" role="button" onClick={handleMute} />
                    <div className="flex items-center gap-4">
                        <img src={Rewind15Icon} alt="Rewind video " className="w-8 h-8" role="button" onClick={handleRewind} />
                        <img src={isPlaying ? PauseIcon : PlayIcon} alt="Pause video " className="w-8 h-8" role="button" onClick={handlePlayPause} />
                        <img src={Forward15icon} alt="Forward video 15s " className="w-8 h-8" role="button" onClick={handleForward} />
                    </div>
                    <img src={SettingsIcon} alt="Video Settings " className="w-8 h-8" role="button" />
                </div>
            </div>
        </div>
    );
});
