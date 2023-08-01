"use client";

import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Icons } from "@/components/ui/icons";
import { BsFillPersonFill as Profile } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ax } from "@/lib/utils";

const Schema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be longer." }),
});

export const AuthDialog: React.FC<{ signUp?: boolean }> = ({ signUp }) => {
    const [error, setError] = useState("");
    const [newUser, setNewUser] = useState(signUp);
    const [disabled, setDisabled] = useState(false);
    const [mailLoading, setMailLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const { register, handleSubmit, reset } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data: z.infer<typeof Schema>) => {
        try {
            setError("");
            setDisabled(true);
            setMailLoading(true);
            const res = await ax.post(newUser ? "/register" : "/login", data);
            console.log(res);
        } catch (err: any) {
            console.log("error: ", err);
            setError(err.response.data.message || "Something went wrong");
        } finally {
            setDisabled(false);
            setMailLoading(false);
        }
    };

    const onGoogle = useGoogleLogin({
        onSuccess: async (google) => {
            try {
                setError("");
                setDisabled(true);
                setGoogleLoading(true);
                console.log(google);
                const res = await ax.post("/google", { token: google.access_token });
                console.log(res);
            } catch (err: any) {
                setError(err.response.data.message || "Something went wrong");
            } finally {
                setDisabled(false);
                setGoogleLoading(false);
            }
        },
        onError: () => setError("Something went wrong"),
    });

    return (
        <Dialog
            onOpenChange={() => {
                setError("");
                reset();
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 flex items-center rounded">
                    Profile
                    <Profile className="h-4 w-4 text-zinc-800" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md outline-none" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <div className="text-center pb-1.5 pt-2.5">
                        <DialogTitle className="tracking-normal mb-1">
                            {newUser ? "Let's get started" : "Welcome back"}
                        </DialogTitle>
                        <DialogDescription>
                            {newUser ? "Create your account to continue." : "Sign in to your account to continue."}
                        </DialogDescription>
                    </div>
                </DialogHeader>
                {error && (
                    <Alert className="p-2.5 bg-red-500 text-white " variant="destructive">
                        <div className="flex items-center gap-2">
                            <Icons.error className="h-4 w-4" />
                            <AlertTitle className="font-normal text-sm mb-0">
                                {error || "Something went wrong."}
                            </AlertTitle>
                        </div>
                    </Alert>
                )}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="john@doe.com" disabled={disabled} {...register("email")} />
                    <Input placeholder="••••••••" type="password" disabled={disabled} {...register("password")} />
                    <Button disabled={disabled}>
                        {mailLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <div />}
                        {newUser ? "Sign Up" : "Sign In"}
                    </Button>
                </form>
                <div className="flex flex-col gap-4">
                    <Button onClick={() => onGoogle()} variant="outline" type="button" disabled={disabled}>
                        {googleLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Icons.google className="mr-2 h-3 w-3" />
                        )}
                        Continue with Google
                    </Button>
                    <div className="flex items-center justify-center space-x-1.5 pt-1.5 pb-2.5">
                        <Label className="text-sm text-zinc-500 p-0">
                            {newUser ? "Already have an account?" : "Don't have an account?"}
                        </Label>
                        <Button
                            disabled={disabled}
                            className="p-0 h-auto"
                            variant="link"
                            onClick={() => {
                                setNewUser(!newUser);
                                reset();
                                setError("");
                            }}
                        >
                            {!newUser ? "Sign Up" : "Sign In"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
