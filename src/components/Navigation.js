import React from 'react';
import Link from "next/link";

function Navigation(props) {
    return (
        <div>
            <div
                className="flex flex-col justify-center items-center px-16 py-6 font-medium text-center text-black border-b-2 border-solid border-b-white max-md:px-5">

                <div className="flex flex-wrap gap-10 items-center w-full max-w-[1680px] max-md:max-w-full">

                    <div className="grow self-stretch text-4xl font-semibold uppercase w-[230px]">

                        Brand name

                    </div>

                    <div
                        className="flex flex-wrap gap-10 justify-center items-center self-stretch my-auto text-xl max-md:max-w-full">
                        <Link href={'/'}>
                            <div className="cursor-pointer self-stretch my-auto">Home</div>
                        </Link>
                        <Link href={'/#our'}>
                            <div className="cursor-pointer self-stretch my-auto">About</div>
                        </Link>
                        <Link href={'/#gallery'}>
                            <div className="cursor-pointer self-stretch my-auto">Gallery</div>
                        </Link>
                        <Link href={'/#service'}>
                            <div className="cursor-pointer self-stretch my-auto">Service</div>
                        </Link>
                        <Link href={'/#product'}>
                            <div className="cursor-pointer self-stretch my-auto">Product</div>
                        </Link>
                        <Link href={'/#follow'}>
                            <div className="cursor-pointer self-stretch my-auto">Follow Us</div>
                        </Link>
                    </div>
                    <Link href={'/booking'}>
                        <div
                            className="cursor-pointer flex gap-3 items-center self-stretch px-4 py-3 my-auto text-base uppercase rounded-2xl border border-black border-solid">

                            <div className="self-stretch my-auto">Book now</div>
                        </div>
                    </Link>

                </div>

            </div>
        </div>
    );
}

export default Navigation;
