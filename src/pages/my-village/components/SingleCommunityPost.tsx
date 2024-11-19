import DefaultImage from '../../../assets/default-user-image.jpeg';
import LikeButton from '../../../assets/heart.svg';
import SaveIcon from '../../../assets/save-icon.svg';
import { Circle } from '@components/Circle';
import More from '../../../assets/more-circle.svg';
import useCommunity from '../Community/useCommunity';
import { CommunityPost } from '@type/community';
import { formatTheDate } from '@utils/date';

interface Props {
    post: CommunityPost;
}

export default function SingleCommunityPost({ post }: Props) {
    const { communityPosts } = useCommunity();

    const { profile, stats } = post;
    return (
        <div className="w-full md:min-w-[592px] border border-solid border-[#E9E9E9] rounded-xl p-5 space-y-5 bg-white">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <Circle img={DefaultImage} pd={0} height={40} width={40} noMg bg="transparent" borderColor="transparent" noBorder />

                    <div>
                        <p>
                            {post.profile.user.firstName} {post.profile.user.lastName}
                        </p>
                        <p className="text-xs">Product ownder at BlackAt</p>
                    </div>
                </div>

                <p className="text-xs">{formatTheDate(post.postDate)}</p>
            </div>

            <section className="py-4">
                <p>{post.caption}</p>
            </section>

            <div className="flex justify-between ">
                <p className="text-[#838383]">
                    Liked by <span className="font-medium text-black">Temidayo</span> and 12 others
                </p>

                <p className="text-[#838383] text-xs">{post.location}</p>
            </div>

            <div className="flex  justify-between">
                <div className="flex gap-3">
                    <div className="flex gap-1 rounded-3xl px-4 py-2 bg-[#F2F2F2] ">
                        <img src={LikeButton} />
                        <p>Like</p>
                    </div>

                    <div className="flex items-center gap-1 bg-[#F2F2F2] rounded-3xl px-4 py-2">
                        <img src={SaveIcon} className="h-4" />
                        <p>Save</p>
                    </div>
                </div>

                <div>
                    <img src={More} alt="More" />
                </div>
            </div>

            <div>
                <p className="text-blue-500 underline text-sm">Show more comments</p>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Type in your comment"
                    className="placeholder:text-[#6C6C6C] placeholder:text-sm p-3 rounded-3xl w-full bg-[#F1F1F1]"
                />
            </div>
        </div>
    );
}
