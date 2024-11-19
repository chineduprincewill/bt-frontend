import { IFileWithMeta } from 'react-dropzone-uploader';
import { Link } from 'react-router-dom';

import { connectionApiSlice } from '../api/connectionApi';
import { userApiSlice } from '../api/userApi';
import { useAppDispatch } from '../state/store';
import { MediaContentMetadata, MediaContentUploadInfo, MediaUploadInfo } from '../types/common';

export function countWords(text: string) {
    const trimmedText = text.trim().replace(/\s+/g, ' ');
    const words = trimmedText.split(' ');
    const wordCount = trimmedText === '' ? 0 : words.length;

    return wordCount;
}

export function getTimeFrom(time: string | Date) {
    const now = new Date();
    const timeInMs = typeof time === 'string' ? new Date(time).getTime() : time.getTime();
    const differenceInMs = now.getTime() - timeInMs;

    if (differenceInMs < 1000 * 60) {
        return 'Just now';
    } else if (differenceInMs < 1000 * 60 * 60) {
        const minutesAgo = Math.floor(differenceInMs / (1000 * 60));
        return `${minutesAgo}m ago`;
    } else {
        const hoursAgo = Math.floor(differenceInMs / (1000 * 60 * 60));
        return `${hoursAgo}h ago`;
    }
}

export async function getMentionsList(
    dispatch: ReturnType<typeof useAppDispatch>,
    username: string,
): Promise<Array<{ display: string; id: string }>> {
    try {
        // Initiate API calls in parallel using Promise.all
        const [connectionsResponse, userListResponse] = await Promise.all([
            dispatch(connectionApiSlice.endpoints.searchConnections.initiate(username)),
            dispatch(userApiSlice.endpoints.searchForUsersWithQuery.initiate({ query: username })),
        ]);

        const connections = new Set<any>(); // Use any for now

        // Process connections list (if successful)
        if (connectionsResponse.isSuccess) {
            connectionsResponse.data.data.forEach((user) => {
                connections.add({
                    display: user.username,
                    id: `${user.profile.id}`,
                });
            });
        }

        const userList = new Set<any>(); // Use any for now

        // Process user list (if successful)
        if ('data' in userListResponse && userListResponse.data.data) {
            userListResponse.data.data.forEach((user) => {
                userList.add({
                    display: user.username,
                    id: `${user.profile.id}`,
                    name: user.username,
                });
            });
        }

        const combinedSet = new Set([...connections, ...userList]);

        return Array.from(combinedSet);
    } catch (error) {
        console.error(error);
        return []; // Return an empty set on error
    }
}

/**
 * Regex for mentions suggestions
 */
const mentionsRegex = /@\[([^\]]+)]\(([^)]+)\)/g; // Match "@[display](id)" format

/**
 * @param redirectLink - redirect link for what user profile the user should redirect to
 * @param shouldReplace - should the link be replaced or not, or stacked on the browser history (replaces if user is already on the @see redirectLink )
 */
export const PostTextConfig = (redirectLink: (username: string, userId: string) => string, shouldReplace: (destination: string) => boolean) => [
    {
        regex: mentionsRegex, // Match "@[display](id)" format
        fn: (key: string, result: string) => (
            <Link
                key={key}
                to={redirectLink(result[1], result[2])}
                className="font-bold text-blue-500"
                onClick={(e) => e.stopPropagation()}
                replace={shouldReplace(redirectLink(result[1], result[2]))}
            >
                {result[1]}
            </Link>
        ),
    },
    {
        regex: /https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(?:\/[^\s]*)?/g, // Match links
        fn: (key: string, result: string) => (
            <a
                key={key}
                className="font-medium text-blue-500"
                href={result[0]}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
            >
                {result[0]}
            </a>
        ),
    },
    {
        regex: /_(.*?)_/g, // Match italic format "_text_"
        fn: (key: string, result: string) => <em key={key}>{result[1]}</em>,
    },
    {
        regex: /\*\*(.*?)\*\*/g, // Match bold format "**text**"
        fn: (key: string, result: string) => <strong key={key}>{result[1]}</strong>,
    },
    {
        regex: /\*(.*?)\*/g, // Match bold format "*text*"
        fn: (key: string, result: string) => <strong key={key}>{result[1]}</strong>,
    },
    {
        regex: /~(.*?)~/g, // Match strikethrough format "~~text~~"
        fn: (key: string, result: string) => <del key={key}>{result[1]}</del>,
    },
    {
        regex: /~~(.*?)~~/g, // Match strikethrough format "~~text~~"
        fn: (key: string, result: string) => <del key={key}>{result[1]}</del>,
    },
    {
        regex: /`(.*?)`/g, // Match inline code format "`code`"
        fn: (key: string, result: string) => <code key={key}>{result[1]}</code>,
    },
    {
        regex: /`(.*?)`/g, // Match monospace format "`text`"
        fn: (key: string, result: string) => <code key={key}>{result[1]}</code>,
    },
    {
        regex: /\n/g, // Match non-breaking space "&nbsp;"
        fn: () => <br />,
    },
];

export function replaceMentions(text: string, addedMentions: Record<string, string>) {
    console.log({ text, addedMentions });
    return Object.entries(addedMentions).reduce((updatedText, [key, value]) => {
        return updatedText.replace(key, `${value} `);
    }, text);
}
export const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.ceil(seconds % 60);

    // Handle cases for less than 1 hour
    if (hours === 0) {
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Format with hours if present
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Converts an object to Formdata format and returns it
 *
 */
export const ParseFormData = (data: Record<string, any>) => {
    const formData = new FormData();

    for (const key in data) {
        const fieldData: any = data[key];

        if (Array.isArray(fieldData)) {
            fieldData.forEach((element) => {
                formData.append(key, element);
            });
            continue;
        }
        formData.append(key, fieldData);
    }

    return formData;
};
export async function getMediaMetadata(files: File[]): Promise<MediaContentMetadata[]> {
    const metadataPromises: Promise<MediaContentMetadata>[] = [];

    for (const file of files) {
        const url = URL.createObjectURL(file);
        const contentType = file.type.startsWith('image')
            ? 'image'
            : file.type.startsWith('video')
            ? 'video'
            : file.type.startsWith('application/pdf')
            ? 'pdf'
            : file.type.startsWith('application/msword')
            ? 'docx'
            : file.type.startsWith('application/msword')
            ? 'doc'
            : 'docx';

        if (contentType === 'video') {
            metadataPromises.push(
                new Promise((resolve) => {
                    const video = document.createElement('video');
                    video.src = url;
                    video.addEventListener('loadedmetadata', () => {
                        resolve({
                            content: { url, contentType, duration: video.duration },
                            file,
                        });
                    });
                }),
            );
        } else {
            metadataPromises.push(
                Promise.resolve({
                    content: { url, contentType },
                    file,
                }),
            );
        }
    }

    return Promise.all(metadataPromises);
}

export function transformFileMetaToMediaContent(files: MediaContentMetadata[], additionalFields: Record<string, any> = {}): MediaContentUploadInfo {
    const content = {
        contents: files.map((file) => {
            if ('duration' in file.content) {
                return {
                    mimeType: file.file.type,
                    fileName: file.file.name,
                    fileSizeInBytes: file.file.size,
                    durationInSeconds: file.content.duration,
                    ...file.extra,
                };
            } else {
                return { mimeType: file.file.type, fileName: file.file.name, fileSizeInBytes: file.file.size, ...file.extra };
            }
        }),
    };

    return { ...content, ...additionalFields };
}

export function transformSingleFileMetaToMediaContent(file: MediaContentMetadata, additionalFields: Record<string, any> = {}): MediaUploadInfo {
    if (!file) return null;

    const content: { mimeType: string; fileName: string; fileSizeInBytes: number; durationInSeconds?: number } = {
        mimeType: file.file.type,
        fileName: file.file.name,
        fileSizeInBytes: file.file.size,
    };

    if (file.content && 'duration' in file.content) {
        content.durationInSeconds = file.content.duration;
    }

    return { ...content, ...additionalFields };
}

export function dropzoneBgColor(isDragActive: boolean, isDragReject: boolean) {
    if (isDragActive && isDragReject) return '#EA2E49';
    if (isDragActive) return '#76CD26';
    return '#F2F2F2';
}

export function generateLightColor(text: string) {
    // Hash the text to generate a base value
    const hash = hashString(text);

    // Extract three integer values for red, green, and blue channels (0-255)
    const red = hash & 0xff;
    const green = (hash >> 8) & 0xff;
    const blue = (hash >> 16) & 0xff;

    // Ensure all color values are above 127 for a lighter color
    const lightenedRed = Math.max(red, 128);
    const lightenedGreen = Math.max(green, 128);
    const lightenedBlue = Math.max(blue, 128);

    // Convert the adjusted color values to a hexadecimal string
    const colorHex = `#${lightenedRed.toString(16).padStart(2, '0')}${lightenedGreen.toString(16).padStart(2, '0')}${lightenedBlue
        .toString(16)
        .padStart(2, '0')}`;

    return colorHex;
}

// This function is not built-in JavaScript and needs implementation
function hashString(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        hash = (hash << 5) - hash + charCode;
        hash &= hash; // Convert to 32-bit integer
    }
    return hash;
}
