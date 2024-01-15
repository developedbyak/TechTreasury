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
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const isSeller = searchParams.get("as") === "seller";
    const origin = searchParams.get("origin");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    });

    const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
        onError: (err) => {
            if (err.data?.code === "CONFLICT") {
                toast.error("This email is already in use. Sign in instead?");
                return;
            }

            if (err instanceof ZodError) {
                toast.error(err.issues[0].message);
                return;
            }

            toast.error("Something went wrong. Please try again.");
        },
        onSuccess: ({ sentToEmail }) => {
            toast.success(`Verification email sent to ${sentToEmail}.`);
            router.push("/verify-email?to=" + sentToEmail);
        },
    });

    const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
        // send data to the server
        mutate({ email, password });
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
                            Sign in to your account.
                        </h1>
                        <p className="w-[80%] text-sm">
                            Welcome to TechTreasury. Let&apos;s login to your
                            account
                        </p>
                        <Link
                            href="/sign-up"
                            className={buttonVariants({
                                variant: "link",
                            })}
                        >
                            Don&apos;t have an account? Sign-up
                        </Link>
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
                                    {errors?.email && (
                                        <p className="text-sm text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        {...register("password")}
                                        type="password"
                                        placeholder="password"
                                        className={cn({
                                            "focus-visible:ring-red-500":
                                                errors.password,
                                        })}
                                    />
                                    {errors?.password && (
                                        <p className="text-sm text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                <Button>Sign in</Button>
                            </div>
                        </form>

                        <div className=" relative">
                            <div
                                aria-hidden="true"
                                className=" absolute inset-0 flex items-center"
                            >
                                <span className="w-full border-t" />
                            </div>
                            <div className=" relative flex justify-center text-xs uppercase">
                                <span className=" bg-background px-2 text-muted-foreground ">
                                    or
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
