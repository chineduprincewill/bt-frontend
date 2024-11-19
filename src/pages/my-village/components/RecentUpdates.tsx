import React from 'react';

export default function RecentUpdates() {
    return (
        <div className="rounded-xl flex-shrink-0 border-solid border space-y-5 border-[#E9E9E9] p-5 w-full max-w-[366px]">
            <h3 className="font-medium text-[#020202]">Recent Updates</h3>
            <div className="space-y-5 ">
                <p className="text-[#5B5B5B]">
                    <span className="font-medium text-black">@dayofolajin</span> just joined this village
                </p>
                <p className="text-[#5B5B5B]">
                    <span className="font-medium text-black">@dayofolajin</span> just joined this village
                </p>
                <p className="text-[#5B5B5B]">
                    <span className="font-mediu text-black">@emmanuelumukoro</span> shared an image
                </p>
                <p className="text-[#5B5B5B]">
                    {' '}
                    <span className="text-black">@dayofolajin</span> just joined this village
                </p>
                <p className="text-[#5B5B5B]">
                    <span className="font-medium text-black">@dayofolajin</span> just joined this village
                </p>
                <p className="text-[#5B5B5B]">
                    <span className="font-medium">@dayofolajin</span>wants to join this community
                </p>
            </div>

            <button className="bg-black rounded-3xl px-5 py-2 text-white">Action</button>
        </div>
    );
}
