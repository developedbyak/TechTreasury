import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
    return (
        <>
            <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center spcae-y-2 text-center">
                        <Image
                            src="/sign-up-logo.png"
                            alt="logo"
                            width={200}
                            height={200}
                            className=" object-cover"
                        />
                        <h1 className="text-2xl font-bold">
                            Create an account
                        </h1>
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
