'use client';
import {
    Key,
    useEffect,
    useState,
} from 'react';
import Footer from '@/components/Footer/Footer';
import HeaderOne from '@/components/Header/HeaderOne';
import tentData from '@/data/Tent.json';
import { TentType } from '@/type/TentType';
import Image from 'next/image';
import Link from 'next/link';
import * as Icon from 'phosphor-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dynamic from 'next/dynamic';
const ExploreCamp = dynamic(() => import('@/components/Other/ExploreCamp'), {
    ssr: false,
});
import StickyBox from 'react-sticky-box';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import TentDetailsModal from '@/components/TentDetailsModal/TentDetailsModal';

const Reservation = () => {
    const [reservationDetails, setReservationDetails] = useState<any>(null);
    const [checkedIn, setCheckedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [reservationMain, setReservationMain] = useState<any>(null);

    const router = useRouter();
    useEffect(() => {
        const reservationData = JSON.parse(
            localStorage.getItem('reservationData')!
        );
      
        setReservationDetails(reservationData);
        const reservationMain = tentData.find(
            (tent) => tent.id === reservationData?.reservationData?.tentId
        ) as TentType;
        setReservationMain(reservationMain);
        const checkedIn = localStorage.getItem('checkedIn');
        checkedIn ? setCheckedIn(true) : setCheckedIn(false);
    }, []);


    const settings = {
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        touchThreshold: 100,
        swipe: true,
        swipeToSlide: true,
        draggable: true,
        useTransform: false,
        centerMode: true,
        centerPadding: '300px',
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '24px',
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '160px',
                },
            },
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const formattedDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleCheckIn = () => {
        setShowModal(true);

        // setCheckedIn(true);
    };

    const handleCheckOut = () => {
        localStorage.removeItem('checkedIn');
        setCheckedIn(false);
    };

    const handleCancelReservation = () => {
        localStorage.removeItem('reservationData');
        toast.success('Reservation Cancelled successfully');
        router.replace('/');
    };

    return (
        <>
            {showModal && (
                <TentDetailsModal
                    setShowModal={setShowModal}
                    setCheckedIn={setCheckedIn}
                />
            )}
            <div className="ten-detail">
                <HeaderOne />

                {reservationMain && (
                    <>
                        <div className="list-img-detail overflow-hidden">
                            <Slider {...settings} className="h-full">
                                {reservationMain.listImage.map(
                                    (img: string, index: Key) => (
                                        <div
                                            className="bg-img w-full aspect-[4/3]"
                                            key={index}
                                        >
                                            <Image
                                                src={img}
                                                width={3000}
                                                height={3000}
                                                alt={img}
                                                priority={true}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )
                                )}
                            </Slider>
                        </div>
                        <div className="content-detail lg:py-20 md:py-14 py-10">
                            <div className="container">
                                <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                                    <div className="content xl:w-2/3 lg:w-[60%] lg:pr-[15px] w-full">
                                        <div className="flex items-center justify-between gap-6">
                                            <div className="heading3">
                                                {reservationMain.name}
                                            </div>
                                            <div className="share w-12 h-12 rounded-full bg-white border border-outline flex-shrink-0 flex items-center justify-center cursor-pointer duration-300 hover:bg-black hover:text-white">
                                                <Icon.ShareNetwork className="text-2xl" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 flex-wrap gap-y-1 mt-2">
                                            <div className="flex items-center gap-1.5">
                                                <Icon.MapPin className="text-variant1" />
                                                <span className="text-variant1 capitalize">
                                                    {reservationMain.location}
                                                </span>
                                            </div>
                                            <Link
                                                href={`http://maps.google.com/?q=${reservationMain.locationMap.lat},${reservationMain.locationMap.lng}`}
                                                target="_blank"
                                                className="text-primary underline"
                                            >
                                                Show on map
                                            </Link>
                                        </div>
                                        <div className="desc lg:mt-10 mt-6 lg:pt-10 pt-6 border-t border-outline">
                                            <div className="heading5">
                                                Description
                                            </div>
                                            <div className="body2 text-variant1 mt-3">
                                                Thank you for booking with us!
                                                We look forward to making your
                                                experience unforgettable.
                                            </div>
                                        </div>
                                        <div className="rule lg:mt-8 mt-5">
                                            <div className="heading5">
                                                House Rules
                                            </div>
                                            <div className="list xl:grid grid-cols-3 xl:gap-16 max-xl:flex max-xl:flex-wrap max-xl:gap-8 max-xl:gap-y-2 xl:gap-y-2 mt-4">
                                                <div className="flex items-center gap-2">
                                                    <Icon.Clock className="text-2xl" />
                                                    <div className="body2">
                                                        Check-in: From 1pm
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Icon.Alarm className="text-2xl" />
                                                    <div className="body2">
                                                        Check-out: By 11am
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Icon.PawPrint className="text-2xl" />
                                                    <div className="body2">
                                                        Pet allowed
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {checkedIn && (
                                                    <p className="text-success mt-4">
                                                        Document Verified
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="feature lg:mt-10 mt-6 lg:pt-10 pt-6 border-t border-outline">
                                            <div className="heading5">
                                                Amenities and features
                                            </div>
                                            <div className="list flex justify-between w-full mt-4">
                                                <div className="w-fit">
                                                    <div className="text-title">
                                                        Services:
                                                    </div>
                                                    <div className="list flex flex-col gap-2 mt-3">
                                                        {reservationMain.services.map(
                                                            (
                                                                item: string,
                                                                index: Key
                                                            ) => (
                                                                <div
                                                                    key={index}
                                                                    className="item capitalize"
                                                                >
                                                                    {item}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="w-fit">
                                                    <div className="text-title">
                                                        Amenities:
                                                    </div>
                                                    <div className="list flex flex-col gap-2 mt-3">
                                                        {reservationMain.amenities.map(
                                                            (
                                                                item: string,
                                                                index: Key
                                                            ) => (
                                                                <div
                                                                    key={index}
                                                                    className="item capitalize"
                                                                >
                                                                    {item}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="w-fit max-sm:hidden">
                                                    <div className="text-title">
                                                        Activities:
                                                    </div>
                                                    <div className="list flex flex-col gap-2 mt-3">
                                                        {reservationMain.activities.map(
                                                            (
                                                                item: string,
                                                                index: Key
                                                            ) => (
                                                                <div
                                                                    key={index}
                                                                    className="item capitalize"
                                                                >
                                                                    {item}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="explore-block lg:mt-10 mt-6 lg:pt-10 pt-6 border-t border-outline">
                                            <div className="heading5">
                                                Explore Camp
                                            </div>
                                            <div className="bg-img rounded-2xl max-sm:h-[240px] relative overflow-hidden sm:aspect-[2/1] mt-4">
                                                <ExploreCamp />
                                                <div className="icon-block bg-white sm:w-20 w-16 sm:h-20 h-16 rounded-full flex items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 duration-300">
                                                    <Image
                                                        src={
                                                            '/images/other/snow.jpeg'
                                                        }
                                                        width={400}
                                                        height={400}
                                                        alt="icon"
                                                        priority={true}
                                                        className="sm:w-12 w-10 sm:h-12 h-10"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="map lg:mt-10 mt-6 lg:pt-10 pt-6 border-t border-outline">
                                            <div className="heading5">Map</div>
                                            <div className="bg-img relative mt-3">
                                                <iframe
                                                    className="w-full h-[360px]"
                                                    src={`https://maps.google.com/maps?q=${reservationMain.locationMap.lat}, ${reservationMain.locationMap.lng}&hl=es&z=14&amp&output=embed`}
                                                ></iframe>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sidebar xl:w-1/3 lg:w-[40%] lg:pl-[45px] w-full">
                                        <StickyBox
                                            offsetTop={100}
                                            offsetBottom={20}
                                        >
                                            <div className="reservation bg-surface p-6 rounded-md">
                                                <div className="heading4 text-center">
                                                    Reservation
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex items-center gap-1">
                                                        <Icon.Users className="text-xl" />
                                                        <div className="text-button">
                                                            Guests
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col space-y-2">
                                                        {reservationDetails
                                                            ?.reservationData
                                                            .guest?.adult >
                                                            0 && (
                                                                <div className="text-title">
                                                                    {`${reservationDetails
                                                                            ?.reservationData
                                                                            .guest
                                                                            .adult
                                                                        } ${reservationDetails
                                                                            ?.reservationData
                                                                            .guest
                                                                            .adult ===
                                                                            1
                                                                            ? 'Adult'
                                                                            : 'Adults'
                                                                        }`}
                                                                </div>
                                                            )}
                                                        {reservationDetails
                                                            ?.reservationData
                                                            .guest?.children >
                                                            0 && (
                                                                <div className="text-title">
                                                                    {`${reservationDetails
                                                                            ?.reservationData
                                                                            .guest
                                                                            .children
                                                                        } ${reservationDetails
                                                                            ?.reservationData
                                                                            .guest
                                                                            .children ===
                                                                            1
                                                                            ? 'Child'
                                                                            : 'Children'
                                                                        }`}
                                                                </div>
                                                            )}
                                                        {reservationDetails
                                                            ?.reservationData
                                                            .guest?.infant >
                                                            0 && (
                                                                <div className="text-title">
                                                                    {`${reservationDetails
                                                                            ?.reservationData
                                                                            .guest
                                                                            .infant
                                                                        } ${reservationDetails
                                                                            ?.reservationData
                                                                            .guest
                                                                            .infant ===
                                                                            1
                                                                            ? 'Infant'
                                                                            : 'Infants'
                                                                        }`}
                                                                </div>
                                                            )}
                                                        {reservationDetails
                                                            ?.reservationData
                                                            .guest?.pet > 0 && (
                                                                <div className="text-title">
                                                                    {`${reservationDetails
                                                                            ?.reservationData
                                                                            .guest
                                                                            .pet
                                                                        } ${reservationDetails
                                                                            ?.reservationData
                                                                            .guest
                                                                            .pet ===
                                                                            1
                                                                            ? 'Pet'
                                                                            : 'Pets'
                                                                        }`}
                                                                </div>
                                                            )}
                                                    </div>
                                                    <div className="flex flex-col space-y-2">
                                                        <div className="mt-4">
                                                            <div className="flex items-center gap-1">
                                                                <Icon.CalendarBlank className="text-xl" />
                                                                <div className="text-button">
                                                                    Checked In
                                                                </div>
                                                            </div>
                                                            <div className="body2 mt-1">
                                                                {formattedDate(
                                                                    reservationDetails
                                                                        ?.reservationData
                                                                        .startDate
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <div className="flex items-center gap-1">
                                                                <Icon.CalendarBlank className="text-xl" />
                                                                <div className="text-button">
                                                                    Checking Out
                                                                </div>
                                                            </div>
                                                            <div className="body2 mt-1">
                                                                {formattedDate(
                                                                    reservationDetails
                                                                        ?.reservationData
                                                                        .endDate
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {reservationDetails
                                                        ?.reservationData
                                                        .services.length >
                                                        0 && (
                                                            <div className="w-fit mt-4">
                                                                <div className="text-title">
                                                                    Services:
                                                                </div>
                                                                <div className="list flex flex-col gap-2 mt-3">
                                                                    {reservationDetails?.reservationData.services.map(
                                                                        (
                                                                            item: string,
                                                                            index: Key
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="item capitalize"
                                                                            >
                                                                                {
                                                                                    item
                                                                                }
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    <div className="total-block mt-5 pt-5 border-t border-outline flex items-center justify-between">
                                                        <div className="heading6">
                                                            Amount Paid
                                                        </div>
                                                        <div className="heading5">
                                                            €
                                                            {
                                                                reservationDetails
                                                                    ?.reservationData
                                                                    .totalPrice
                                                            }
                                                        </div>
                                                    </div>
                                                    {checkedIn ? (
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                handleCheckOut
                                                            }
                                                            className="button-main bg-primary w-full text-center mt-5"
                                                        >
                                                            Check Out
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                handleCheckIn
                                                            }
                                                            className="button-main bg-primary w-full text-center mt-5"
                                                        >
                                                            Check In
                                                        </button>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={
                                                            handleCancelReservation
                                                        }
                                                        className="button-main bg-primary w-full text-center mt-5"
                                                    >
                                                        Cancel Reservation
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="reservation bg-surface p-6 rounded-md md:mt-10 mt-6">
                                                <div className="bg-img relative">
                                                    <iframe
                                                        className="w-full lg:h-[200px] sm:h-[350px] h-[300px]"
                                                        src={`https://maps.google.com/maps?q=${reservationMain.locationMap.lat}, ${reservationMain.locationMap.lng}&hl=es&z=14&amp&output=embed`}
                                                    ></iframe>
                                                </div>
                                                <div className="heading6 mt-5">
                                                    {reservationMain.name}
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Icon.MapPin className="text-variant1" />
                                                    <span>
                                                        {
                                                            reservationMain.location
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Icon.Envelope className="text-variant1" />
                                                    <span>{`${reservationDetails?.user
                                                            ?.emailAddresses[0]
                                                            .emailAddress ?? ''
                                                        }`}</span>
                                                </div>
                                            </div>

                                            <div className="reservation bg-surface p-6 rounded-md md:mt-10 mt-6">
                                                <div className="heading6 mt-5">
                                                    Property Hightlishts
                                                </div>
                                                <div className="text-title mt-4">
                                                    Breakfast Info
                                                </div>
                                                <div className="text-variant1 mt-1">
                                                    Continental, Breakfast to go
                                                </div>
                                                <div className="heading6 mt-4">
                                                    Rooms with:
                                                </div>
                                                <div className="list mt-1">
                                                    <div className="flex items-center gap-2">
                                                        <Icon.UsersThree className="text-xl" />
                                                        <div>
                                                            Front desk{' '}
                                                            <span className="text-variant1">
                                                                (24-hour)
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Icon.Person className="text-xl" />
                                                        <div>Concierge</div>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Icon.CurrencyCircleDollar className="text-xl" />
                                                        <div>
                                                            Currency exchange
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </StickyBox>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <Footer />
            </div>
        </>
    );
};

export default Reservation;
