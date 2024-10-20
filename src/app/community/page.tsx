'use client';
import React, {
    useState,
    useCallback,
    ChangeEvent,
    ChangeEventHandler,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import HeaderOne from '@/components/Header/HeaderOne';
import communityData from '@/data/Community.json';
import Footer from '@/components/Footer/Footer';
import * as Icon from 'phosphor-react';
import Rate from '@/components/Other/Rate';
import CommunityItem from '@/components/Community/CommunityItem';
import initialTestimonialData from '@/data/Testimonial.json';
import { useDropzone } from 'react-dropzone';
import { useUser } from '@clerk/nextjs';
const Community = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [testimonialData, setTestimonialData] = useState<any[]>(
        initialTestimonialData
    );
    const [reviewData, setReviewData] = useState({
        name: '',
        email: '',
        review: '',
    });
    const [files, setFiles] = useState<any>([]);
    const { user } = useUser();
    const [isReplying, setIsReplying] = useState<string | null>(null);

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const convertFilesToBase64 = async () => {
                const base64Files = await Promise.all(
                    acceptedFiles.map(async (file: File) => {
                        const base64 = await convertToBase64(file);
                        return {
                            name: file.name,
                            base64,
                        };
                    })
                );

                setFiles((prevFiles: any[]) => [...prevFiles, ...base64Files]);
            };

            convertFilesToBase64();
        },
        [files]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,

        accept: {
            'image/*': [],
        },
    });

    const removeFile = (name: string) => {
        setFiles((files: File[]) =>
            files.filter((file: { name: string }) => file.name !== name)
        );
    };

    let communityId = searchParams.get('id');
    if (communityId === null) {
        communityId = '1';
    }

    const mainCommunity = communityData[Number(communityId) - 1];

    const handleCommunityClick = (category: string) => {
        // Go to blog detail with category selected
        router.push(`/blog/default?category=${category}`);
    };

    const handleBlogDetail = (id: string) => {
        // Go to blog detail with id selected
        router.push(`/community/detail?id=${id}`);
    };

    const handleInputChange: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (event: ChangeEvent<HTMLInputElement>) => {
        setReviewData({
            ...reviewData,
            [event.target.name]: event.target.value || '',
        });
    };

    const handleReviewSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const reviewDetails = {
            ...reviewData,
            email: `${user?.emailAddresses[0].emailAddress}`,
            images: files.map((file: any) => file.base64),
            id: String(testimonialData.length + 1),
            date: new Date().toLocaleDateString(),
            position: 'Ethical Hacker',
            avatar: user?.imageUrl ?? '',
            address: 'Tokyo, Japan',
            description: reviewData.review,
            star: 4,
            replies: [],
        };

        if (isReplying) {
            // Handle reply submission
            const updatedTestimonialData = testimonialData.map((item) => {
                if (item.id === isReplying) {
                    return {
                        ...item,
                        replies: [...item.replies, reviewDetails],
                    };
                }
                return item;
            });

            setTestimonialData(updatedTestimonialData);
            setIsReplying(null); // Reset the reply state
        } else {
            // Handle new review submission
            const updatedTestimonialData = [reviewDetails, ...testimonialData];
            setTestimonialData(updatedTestimonialData);
        }

        localStorage.setItem('reviewData', JSON.stringify(testimonialData));
        setReviewData({ name: '', email: '', review: '' });
        setFiles([]);
    };

    return (
        <>
            <HeaderOne />
            <div className="blog detail">
                <div className="bg-img 2xl:h-[800px] xl:h-[640px] lg:h-[500px] md:h-[400px] h-[300px]">
                    <Image
                        src={mainCommunity.thumbnail}
                        width={4000}
                        height={3000}
                        alt={mainCommunity.title}
                        priority={true}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container">
                    <div className="blog-content flex items-center justify-center lg:pt-20 md:pt-14 pt-10">
                        <div className="main xl:basis-5/6">
                            <div className="blog-tag bg-primary text-white py-1.5 px-2.5 text-label inline-block">
                                {mainCommunity.category}
                            </div>
                            <div className="heading3 mt-3">
                                {mainCommunity.title}
                            </div>
                            <div className="author flex items-center gap-4 mt-4">
                                <div className="avatar w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src={mainCommunity.avatar}
                                        width={200}
                                        height={200}
                                        alt="avatar"
                                        priority={true}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-variant1">
                                        {mainCommunity.author}
                                    </div>
                                    <div className="line w-px h-4 bg-outline"></div>
                                    <div className="text-variant1">
                                        {mainCommunity.date}
                                    </div>
                                </div>
                            </div>
                            <div className="content mt-7">
                                <div className="body2">
                                    {mainCommunity.shortDesc}
                                </div>
                                <div className="body2 mt-0">
                                    {mainCommunity.description}
                                </div>
                                <div className="heading4 md:mt-8 mt-5">
                                    Blackberry Farm and Mountain
                                </div>
                                <div className="body2 mt-3">{`A Wanderful best seller even before social distancing was a ‘thing’ - Blackberry Farm has only escalated in popularity this past year and for great reason! Located on 4,200 acres in the gorgeous foothills of the Smoky Mountains, outside of Knoxville, TN, this Relais & Chateaux resort is known for their mouthwatering farm-to-table cuisine (and infamous wine cellar). With only 68 rooms, including many free-standing suites, cottages and multi-bedroom homes, the resort was made for socially distant honeymoons, anniversaries, milestone birthdays and multi-generational family retreats alike.`}</div>
                                <div className="quote-block md:mt-8 mt-5 py-8 md:px-10 px-8 bg-surface border-l-4 border-primary rounded-xl">
                                    <div className="heading5">
                                        {String.raw`"`}Sweet Treats: Wanderful
                                        Journeys clients get 15% off rates at
                                        both Blackberry Farm and Mountain , plus
                                        Virtuoso amenities such as $100 spa
                                        credit for your stay!{String.raw`"`}
                                    </div>
                                    <div className="text-button text-variant1 flex items-center gap-3 mt-4">
                                        <span className="w-4 h-px bg-variant1"></span>
                                        Nelson Mandela
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-[30px] md:mt-8 mt-5">
                                    {mainCommunity.images.map((item, index) => (
                                        <Image
                                            key={index}
                                            src={item}
                                            width={3000}
                                            height={2000}
                                            priority={true}
                                            alt={item}
                                            className="w-full rounded-3xl"
                                        />
                                    ))}
                                </div>
                                <div className="heading4 md:mt-8 mt-5">
                                    Belmond El Encanto
                                </div>
                                <div className="body2 mt-3">{`When you can’t make it to the French or Italian Riviera - the American Riviera will more than do! Perched above Santa Barbara with the most dreamy panoramic Pacific views, Belmond El Encanto is another client favorite just made for social distancing. The property is dotted with charming bungalows, the most instagramable pool and serene breakfast views. With so much client interest, I had to check out what all the hype was about for myself this past Fall - and what a magical stay it was!`}</div>
                                <div className="body2 mt-3">{`This National Geographic Unique Lodge of the World, nestled outside of Big Sky, Montana, is a client favorite year-round. Lone Mountain Ranch has 27 historic cabins throughout the property, and is an outdoor paradise for families, friends and couples alike. In winter, dining at farm-to-table Horn & Cantle Restaurant is a culinary treat after days skiing at Big Sky, ice climbing, dog sledding or snowmobiling nearby. Long summer days are filled with horseback rides, hiking or exploring nearby Yellowstone National Park. See for yourself why clients keep returning again and again!`}</div>
                            </div>
                            <div className="action flex items-center justify-between flex-wrap gap-5 md:mt-8 mt-5">
                                <div className="left flex items-center gap-3 flex-wrap">
                                    <p>Tag:</p>
                                    <div className="list flex items-center gap-3 flex-wrap">
                                        <div
                                            className={`tags bg-surface py-2 px-4 text-label cursor-pointer duration-300 hover:bg-primary hover:text-white`}
                                            onClick={() =>
                                                handleCommunityClick('glamping')
                                            }
                                        >
                                            glamping
                                        </div>
                                        <div
                                            className={`tags bg-surface py-2 px-4 text-label cursor-pointer duration-300 hover:bg-primary hover:text-white`}
                                            onClick={() =>
                                                handleCommunityClick('camping')
                                            }
                                        >
                                            camping
                                        </div>
                                        <div
                                            className={`tags bg-surface py-2 px-4 text-label cursor-pointer duration-300 hover:bg-primary hover:text-white`}
                                            onClick={() =>
                                                handleCommunityClick(
                                                    'activities'
                                                )
                                            }
                                        >
                                            activities
                                        </div>
                                    </div>
                                </div>
                                <div className="right list-social flex items-center gap-3 flex-wrap">
                                    <p>Share:</p>
                                    <div className="list flex items-center gap-3 flex-wrap">
                                        <Link
                                            href={'https://www.facebook.com/'}
                                            target="_blank"
                                            className="bg-surface w-10 h-10 flex items-center justify-center rounded-full duration-300 hover:bg-primary hover:text-white"
                                        >
                                            <div className="icon-facebook"></div>
                                        </Link>
                                        <Link
                                            href={'https://www.instagram.com/'}
                                            target="_blank"
                                            className="bg-surface w-10 h-10 flex items-center justify-center rounded-full duration-300 hover:bg-primary hover:text-white"
                                        >
                                            <div className="icon-instagram"></div>
                                        </Link>
                                        <Link
                                            href={'https://www.twitter.com/'}
                                            target="_blank"
                                            className="bg-surface w-10 h-10 flex items-center justify-center rounded-full duration-300 hover:bg-primary hover:text-white"
                                        >
                                            <div className="icon-twitter"></div>
                                        </Link>
                                        <Link
                                            href={'https://www.youtube.com/'}
                                            target="_blank"
                                            className="bg-surface w-10 h-10 flex items-center justify-center rounded-full duration-300 hover:bg-primary hover:text-white"
                                        >
                                            <div className="icon-youtube"></div>
                                        </Link>
                                        <Link
                                            href={'https://www.pinterest.com/'}
                                            target="_blank"
                                            className="bg-surface w-10 h-10 flex items-center justify-center rounded-full duration-300 hover:bg-primary hover:text-white"
                                        >
                                            <div className="icon-pinterest"></div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="next-pre grid sm:grid-cols-2 md:mt-8 mt-5 py-6 border-y border-line relative">
                                {communityId === '1' ? (
                                    <>
                                        <div
                                            className="left cursor-pointer xl:pr-[140px] sm:pr-[60px]"
                                            onClick={() =>
                                                handleBlogDetail(
                                                    String(communityData.length)
                                                )
                                            }
                                        >
                                            <div className="text-button text-variant2 duration-300">
                                                Previous
                                            </div>
                                            <div className="title heading6 duration-300 mt-2">
                                                {
                                                    communityData[
                                                        communityData.length - 1
                                                    ].title
                                                }
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="left cursor-pointer xl:pr-[140px] sm:pr-[60px]"
                                            onClick={() =>
                                                handleBlogDetail(
                                                    communityData[
                                                        Number(communityId) - 2
                                                    ].id
                                                )
                                            }
                                        >
                                            <div className="text-button text-variant2 duration-300">
                                                Previous
                                            </div>
                                            <div className="title heading6 duration-300 mt-2">
                                                {
                                                    communityData[
                                                        Number(communityId) - 2
                                                    ].title
                                                }
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="h-[60px] w-px bg-outline absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-sm:hidden"></div>
                                {Number(communityId) ===
                                    communityData.length ? (
                                    <>
                                        <div
                                            className="right sm:text-right cursor-pointer xl:pl-[140px] sm:pl-[60px] max-sm:mt-6"
                                            onClick={() =>
                                                handleBlogDetail('1')
                                            }
                                        >
                                            <div className="text-button text-variant2 duration-300">
                                                Next
                                            </div>
                                            <div className="title heading6 duration-300 mt-2">
                                                {communityData[0].title}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="right sm:text-right cursor-pointer xl:pl-[140px] sm:pl-[60px] max-sm:mt-6"
                                            onClick={() =>
                                                handleBlogDetail(
                                                    communityData[
                                                        Number(communityId)
                                                    ].id
                                                )
                                            }
                                        >
                                            <div className="text-button text-variant2 duration-300">
                                                Next
                                            </div>
                                            <div className="title heading6 duration-300 mt-2">
                                                {
                                                    communityData[
                                                        Number(communityId)
                                                    ].title
                                                }
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="list-comment md:mt-[60px] mt-8">
                                <div className="heading flex items-center justify-between flex-wrap gap-4">
                                    <div className="heading4">03 Comments</div>
                                    <div className="right flex items-center gap-3">
                                        <label
                                            htmlFor="select-filter"
                                            className=""
                                        >
                                            Sort by:
                                        </label>
                                        <div className="select-block relative">
                                            <select
                                                id="select-filter"
                                                name="select-filter"
                                                className="text-button py-2 pl-3 md:pr-14 pr-10 rounded-lg bg-white border border-line"
                                                defaultValue={'Sorting'}
                                            >
                                                <option
                                                    value="Sorting"
                                                    disabled
                                                >
                                                    Sorting
                                                </option>
                                                <option value="newest">
                                                    Newest
                                                </option>
                                                <option value="5star">
                                                    5 Star
                                                </option>
                                                <option value="4star">
                                                    4 Star
                                                </option>
                                                <option value="3star">
                                                    3 Star
                                                </option>
                                                <option value="2star">
                                                    2 Star
                                                </option>
                                                <option value="1star">
                                                    1 Star
                                                </option>
                                            </select>
                                            <Icon.CaretDown
                                                size={12}
                                                className="absolute top-1/2 -translate-y-1/2 md:right-4 right-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="list-review">
                                    {testimonialData.slice(0, 3).map((item) => (
                                        <div
                                            className="item mt-7"
                                            key={item.id}
                                        >
                                            <div className="user-infor flex gap-4">
                                                <div className="avatar w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={item.avatar}
                                                        width={200}
                                                        height={200}
                                                        alt="img"
                                                        priority={true}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="user pb-7 border-b border-outline">
                                                    <div className="flex items-center gap-2">
                                                        <div className="heading5">
                                                            {item.name}
                                                        </div>
                                                        <Icon.CheckCircle
                                                            weight="fill"
                                                            className="text-success"
                                                        />
                                                    </div>
                                                    <div className="text-variant2 mt-1">
                                                        {item.date}
                                                    </div>
                                                    <Rate
                                                        currentRate={item.star}
                                                        classname="text-base mt-2"
                                                    />
                                                    <div className="body2 mt-3">
                                                        {item.description}
                                                    </div>
                                                    <Link
                                                        href={'#form-review'}
                                                        className="text-button text-variant1 mt-3 cursor-pointer inline-block duration-300 hover:text-black"
                                                        onClick={() =>
                                                            setIsReplying(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Reply
                                                    </Link>

                                                    {/* Display replies */}
                                                    {item.replies?.map(
                                                        (reply: any) => (
                                                            <div
                                                                className="reply mt-4 pl-8 border-l border-outline"
                                                                key={reply.id}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <div className="heading5">
                                                                        {
                                                                            reply.name
                                                                        }
                                                                    </div>
                                                                    <Icon.CheckCircle
                                                                        weight="fill"
                                                                        className="text-success"
                                                                    />
                                                                </div>
                                                                <div className="text-variant2 mt-1">
                                                                    {reply.date}
                                                                </div>
                                                                <Rate
                                                                    currentRate={
                                                                        reply.star
                                                                    }
                                                                    classname="text-base mt-2"
                                                                />
                                                                <div className="body2 mt-3">
                                                                    {
                                                                        reply.description
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div
                                    id="form-review"
                                    className="form-review md:pt-10 pt-6"
                                >
                                    {isReplying ? (
                                        <h4 className="text-lg font-semibold mb-4">
                                            Replying to review by{' '}
                                            {
                                                testimonialData.find(
                                                    (item) =>
                                                        item.id === isReplying
                                                )?.name
                                            }
                                        </h4>
                                    ) : (
                                        <h4 className="text-lg font-semibold mb-4">
                                            Leave a Comment
                                        </h4>
                                    )}

                                    <form
                                        className="grid sm:grid-cols-2 gap-4 gap-y-5 md:mt-7 mt-3 max-w-3xl"
                                        onSubmit={handleReviewSubmit}
                                    >
                                        <div className="name">
                                            <label
                                                htmlFor="name"
                                                className="text-variant1"
                                            >
                                                Name
                                            </label>
                                            <input
                                                className="border-line px-4 pt-3 pb-3 w-full rounded-lg mt-3"
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Your Name *"
                                                value={/* reviewData.name */ user?.fullName ?? ''}
                                                onChange={handleInputChange}
                                                readOnly
                                            />
                                        </div>
                                        <div className="email">
                                            <label
                                                htmlFor="email"
                                                className="text-variant1"
                                            >
                                                Email
                                            </label>
                                            <input
                                                className="border-line px-4 pt-3 pb-3 w-full rounded-lg mt-3"
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Your Email *"
                                                value={`${user?.emailAddresses[0]
                                                    .emailAddress ?? ''
                                                    }`}
                                                onChange={handleInputChange}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-span-full review">
                                            <label
                                                htmlFor="images"
                                                className="text-variant1"
                                            >
                                                Upload Images (optional)
                                            </label>
                                            <ul
                                                className={` ${files.length !== 0
                                                    ? ' p-2 mt-3 '
                                                    : ''
                                                    } flex gap-6`}
                                            >
                                                {files.map((file: any) => (
                                                    <li
                                                        key={file.name}
                                                        className="w-[60px] h-[60px] relative group cursor-pointer"
                                                    >
                                                        <Image
                                                            src={file.base64}
                                                            width={60}
                                                            height={60}
                                                            alt={file.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                            <button
                                                                onClick={() =>
                                                                    removeFile(
                                                                        file.name
                                                                    )
                                                                }
                                                                className="text-white"
                                                            >
                                                                X
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div
                                                {...getRootProps()}
                                                className="w-full"
                                            >
                                                <input
                                                    {...getInputProps()}
                                                    name="images"
                                                />
                                                <p className="p-9 border-2 rounded-md border-line text-center">
                                                    {isDragActive
                                                        ? 'Drop the image here...'
                                                        : 'Drag & drop images here, or click to select files'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-full review">
                                            <label
                                                htmlFor="review"
                                                className="text-variant1"
                                            >
                                                Comment
                                            </label>
                                            <textarea
                                                className="border border-line px-4 py-3 w-full rounded-lg mt-3"
                                                id="review"
                                                name="review"
                                                rows={3}
                                                placeholder="Write your review *"
                                                value={reviewData.review}
                                                onChange={handleInputChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="col-span-full">
                                            <button
                                                type="submit"
                                                className="button-main bg-primary"
                                            >
                                                Submit Comment
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="news-insight-block lg:py-20 md:py-14 py-10">
                        <div className="heading3 text-center">News insight</div>
                        <div className="list-blog grid lg:grid-cols-3 sm:grid-cols-2 gap-[30px] md:mt-10 mt-6">
                            {communityData.slice(0, 3).map((item) => (
                                <CommunityItem
                                    data={item}
                                    type="style-grid"
                                    key={item.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Community;
