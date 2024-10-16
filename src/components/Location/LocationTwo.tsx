import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as Icon from 'phosphor-react'
import TextHeading from '../TextHeading/TextHeading'
import { useRouter } from 'next/navigation'
import tentData from '@/data/Tent.json'

const LocationTwo = () => {
    const router = useRouter()

    const handleClickCountry = (country: string) => {
        router.push(`/camp/topmap-grid?country=${country}`)
    }

    const germanNumberOfTents = tentData.filter(tent => tent.country === 'germany').length
    const swissNumberOfTents = tentData.filter(tent => tent.country === 'switzerland').length
    const norwegianNumberOfTents = tentData.filter(tent => tent.country === 'norway').length

    return (
        <>
            <div className="location-block lg:pt-20 md:pt-14 pt-10">
                <div className="container">
                    <TextHeading title='Locations on Camping Mate' subTitle='Discover the Most Popular Places to Visit' />
                    <div className="list-location grid xl:grid-cols-3 md:grid-cols-2 lg:gap-[30px] gap-y-7 gap-4 md:mt-10 mt-6">
                        <div className={`item hover-scale flex items-center bg-surface rounded-lg overflow-hidden box-shadow-sm`}
                            onClick={() => handleClickCountry('Switzerland')}
                        >
                            <div className="left h-full w-1/2 pr-4">
                                <div className="bg-img w-full h-full overflow-hidden">
                                    <Image
                                        src={'https://cdn.prod.v2.camping.info/media/campsites/rosenfelder-strand-ostsee-camping/SRegEmCPm5qz.jpg'}
                                        width={3000}
                                        height={2000}
                                        alt='1.png'
                                        priority={true}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                            </div>
                            <div className="right lg:pl-1.5 max-md:pl-1.5 lg:pr-6 md:pr-2 max-md:pr-3 py-6">
                                <div className="name heading5">Switzerland</div>
                                <div className="text-variant1 sm:mt-1">{swissNumberOfTents} accommodations</div>
                                <div className="flex items-center gap-1 sm:mt-2 mt-1">
                                    <div className="text-button-sm">Explore Now</div>
                                    <Icon.CaretRight className='text-xs' />
                                </div>
                            </div>
                        </div>
                        <div className={`item hover-scale flex items-center bg-surface rounded-lg overflow-hidden box-shadow-sm`}
                            onClick={() => handleClickCountry('Germany')}
                        >
                            <div className="left h-full w-1/2 pr-4">
                                <div className="bg-img w-full h-full overflow-hidden">
                                    <Image
                                        src={'https://cdn.prod.v2.camping.info/media/campsites/campingplatz-auf-dem-simpel/aHj3uc5HU2xB.jpg'}
                                        width={3000}
                                        height={2000}
                                        alt='1.png'
                                        priority={true}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                            </div>
                            <div className="right lg:pl-1.5 max-md:pl-1.5 lg:pr-6 md:pr-2 max-md:pr-3 py-6">
                                <div className="name heading5">Germany</div>
                                <div className="text-variant1 sm:mt-1">{germanNumberOfTents} accommodations</div>
                                <div className="flex items-center gap-1 sm:mt-2 mt-1">
                                    <div className="text-button-sm">Explore Now</div>
                                    <Icon.CaretRight className='text-xs' />
                                </div>
                            </div>
                        </div>
                        <div className={`item hover-scale flex items-center bg-surface rounded-lg overflow-hidden box-shadow-sm`}
                            onClick={() => handleClickCountry('Norway')}
                        >
                            <div className="left h-full w-1/2 pr-4">
                                <div className="bg-img w-full h-full overflow-hidden">
                                    <Image
                                        src={'https://cdn.prod.v2.camping.info/media/campsites/kur-feriencamping-holmernhof-dreiquellenbad/sKR9jSnEAl2M.jpg'}
                                        width={3000}
                                        height={2000}
                                        alt='1.png'
                                        priority={true}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                            </div>
                            <div className="right lg:pl-1.5 max-md:pl-1.5 lg:pr-6 md:pr-2 max-md:pr-3 py-6">
                                <div className="name heading5">Norway</div>
                                <div className="text-variant1 sm:mt-1">{norwegianNumberOfTents} accommodations</div>
                                <div className="flex items-center gap-1 sm:mt-2 mt-1">
                                    <div className="text-button-sm">Explore Now</div>
                                    <Icon.CaretRight className='text-xs' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LocationTwo