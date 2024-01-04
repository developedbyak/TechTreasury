"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AuthCredentialsValidator,
    TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";

const Page = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    });

    const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
        // send data to the server
    };

    return (
        <>
            <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center spcae-y-2 text-center">
                        <Image
                            src="/sign-up-logo.png"
                            alt="logo"
                            width={150}
                            height={150}
                            className=" object-cover"
                        />
                        <h1 className="text-xl font-bold">
                            Create an account.
                        </h1>
                        <p className="w-[80%] text-sm">
                            Welcome to TechTreasury. Let&apos;s create your
                            account
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-2 py-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        {...register("email")}
                                        placeholder="you@example.com"
                                        className={cn({
                                            "focus-visible:ring-red-500":
                                                errors.email,
                                        })}
                                    />
                                </div>
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        {...register("password")}
                                        placeholder="password"
                                        className={cn({
                                            "focus-visible:ring-red-500":
                                                errors.password,
                                        })}
                                    />
                                </div>

                                <Button>Sign up</Button>
                            </div>
                        </form>
                        <Link
                            href="/sign-in"
                            className={buttonVariants({
                                variant: "link",
                            })}
                        >
                            Already have an account? Sign-in
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
