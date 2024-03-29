import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    ArrowDownToLine,
    CheckCircle,
    Leaf,
    Star,
    MoveRight,
} from "lucide-react";
import ProductReel from "@/components/ProductReel";

const perks = [
    {
        name: "Instant Delivery",
        Icon: ArrowDownToLine,
        description:
            "Get your assets delivered to your email in seconds and download them right away.",
    },
    {
        name: "Guaranteed Quality",
        Icon: CheckCircle,
        description:
            "Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
    },
    {
        name: "For the Planet",
        Icon: Leaf,
        description:
            "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
    },
    {
        name: "Exclusive Access",
        Icon: Star,
        description:
            "Unlock exclusive content and features with our premium membership. Elevate your experience with special perks and privileges.",
    },
];

export default function Home() {
    return (
        <>
            <MaxWidthWrapper>
                <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                    <h1 className="text-4xl font-cold tracking-tight text-gray-900 sm:text-6xl font-semibold">
                        Your marketplace for high-quality{" "}
                        <span className="text-green-600">digital assets</span>.
                    </h1>
                    <p className="mt-6 max-w-prose text-muted-foreground font-semibold text-sm">
                        Welcome to EcoFY. Every asset on our platform is
                        verified by our team to ensure our highest quality
                        standards.
                    </p>
                    <div className=" flex flex-col sm:flex-row gap-4 mt-6">
                        <Link href="/products" className={buttonVariants()}>
                            Browse Trending
                        </Link>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            Our Quality Promise{" "}
                            <MoveRight className=" w-[70%] h-[70%] hidden md:flex" />
                        </Button>
                    </div>
                </div>

                {/* TODO: List products  */}
                <ProductReel
                    query={{ sort: "desc", limit: 4 }}
                    href="/products?sort=recent"
                    title="Brand new"
                />
            </MaxWidthWrapper>

            <section className="border-t border-gray-200 bg-gray-50">
                <MaxWidthWrapper className="py-20">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                        {perks.map((perk) => (
                            <div
                                key={perk.name}
                                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center p-4"
                            >
                                <div className="md:flex-shrink-0 flex justify-center">
                                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-900">
                                        {<perk.Icon className="w-1/3 h-1/3" />}
                                    </div>
                                </div>

                                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                                    <h3 className="text-base font-medium text-gray-900">
                                        {perk.name}
                                    </h3>
                                    <p className="mt-3 text-sm text-muted-foreground">
                                        {perk.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
}
