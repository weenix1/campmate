import React from 'react'
import TextHeading from '../TextHeading/TextHeading';
import BlogItem from '@/components/Community/CommunityItem';
import communityData from '@/data/Community.json'

const News = () => {
    return (
        <>
            <div className='news-insight-block lg:py-20 md:py-14 py-10'>
                <div className="container">
                    <TextHeading title='Helpful Camping Guides' subTitle='Tips & insights we collected through the years.' />
                    <div className="list-blog grid lg:grid-cols-3 sm:grid-cols-2 gap-[30px] md:mt-10 mt-6">
                        {communityData.slice(0, 3).map(item => (
                            <BlogItem data={item} type='style-grid' key={item.id} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default News