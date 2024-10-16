import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TextHeading from '../TextHeading/TextHeading'
import { useRouter } from 'next/navigation'
import tentData from '@/data/Tent.json'


const LocationOne = () => {
    const router = useRouter()

    const handleClickContinents = (continents: string) => {
        router.push(`/camp/topmap-grid?continents=${continents}`)
    }

    const europeNumberOfTents = tentData.filter(tent => tent.continents === 'europe').length
    return (
        <>
            <div className="location-block lg:pt-20 md:pt-14 pt-10">
                <div className="container">
                    <TextHeading title='Locations on Camping Mate' subTitle='Discover the Most Popular Places to Visit' />
                    <div className="list-location  gap-y-7 gap-4 md:mt-10 mt-6">
                        <div
                            className="item hover-scale flex justify-items-center flex-col items-center cursor-pointer"
                            onClick={() => handleClickContinents('Europe')}
                        >
                            <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden ">
                                <Image
                                    src={'https://cdn.prod.v2.camping.info/media/campsites/grubhof/pl2k-u-Nmrsm.jpg'}
                                    width={3000}
                                    height={2000}
                                    alt='3.png'
                                    priority={true}
                                    className='w-full'
                                />
                            </div>
                            <div className="name heading5 sm:mt-5 mt-3">Europe</div>
                            <div className="text-variant1 sm:mt-1">{europeNumberOfTents} accommodations</div>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default LocationOne