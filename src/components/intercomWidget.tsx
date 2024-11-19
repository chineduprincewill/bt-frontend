import { useEffect } from "react";
import { useGetLoggedInUserInfoQuery } from "../api/userApi";
import { GetLoggedUserResponse, UserInfoFromApi } from "../api/authApi";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Intercom: any;
    }
}

export const generateHmacSHA256 = (message: string, secret: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const key = encoder.encode(secret);

    return window.crypto.subtle
        .importKey("raw", key, { name: "HMAC", hash: { name: "SHA-256" } }, true, [
            "sign",
        ])
        .then((cryptoKey) => {
            return window.crypto.subtle.sign("HMAC", cryptoKey, data);
        })
        .then((signature) => {
            const arrayBuffer = new Uint8Array(signature);
            const hexString = Array.from(arrayBuffer, (byte) =>
                byte.toString(16).padStart(2, "0")
            ).join("");
            return hexString;
        });
};
const IntercomWidget = () => {
    const { data: logginedUser, } = useGetLoggedInUserInfoQuery(null);

    const secretKey = import.meta.env.VITE_INTERCOM_SECRET_KEY; // secret key (keep safe!)
    useEffect(() => {
        const user: UserInfoFromApi = (logginedUser as GetLoggedUserResponse).data.user;
        if (user && window.Intercom) {
            generateHmacSHA256(user.toString(), secretKey).then(
                (item) => {
                    window.Intercom("boot", {
                        username: user.username,
                        email: user.email,
                        user_id: user.id,
                        created_at: user.createdAt,
                        user_hash: item,
                        customAttributes: {
                            user_role: user.role.name, // User role (admin, user, super_admin)
                        },
                        profile: {
                            displayImage: user.displayImage,
                            phone: user.profile.phone,
                            location: user.profile.location?.value,
                        },
                    });
                }
            );
        }
    }, [logginedUser, secretKey]);

    return <div className="ml-10"></div>;
};

export default IntercomWidget;