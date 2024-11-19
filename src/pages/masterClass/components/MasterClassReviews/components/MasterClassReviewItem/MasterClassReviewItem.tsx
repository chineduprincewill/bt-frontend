import { PostText } from '../../../../../../components/PostEditor/PostText';
import Rating from '../../../../../../components/Rating';


export default function MasterClassReviewItem() {
    return (
        <div className="p-4 flex flex-col gap-4 rounded-[10px] border border-lightGray-6 border-solid">
            <div className="flex gap-5">
                <img src="" alt="user profile icon" className="w-10 h-10 rounded-full" />
                <div className="flex flex-col gap-[10px]">
                    <div className="flex gap-2 items-center">
                        <p className="font-semibold text-black">Oluwatosin Oluboba</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-5"></span>
                        <p className="text-black text-base ">25 Jan</p>
                    </div>
			<Rating value={3} />
                </div>
            </div>
            <PostText text="Blackat stands out as a beacon of empowerment and solidarity within the creative community. Designed specifically for black creatives, it fosters a supportive environment." />
        </div>
    );
}
