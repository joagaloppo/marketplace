"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>{children}</GoogleOAuthProvider>;
};

export default GoogleProvider;
