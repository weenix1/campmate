'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Icon from 'phosphor-react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useTranslation } from 'react-i18next';
import i18n from '@/configs/i18n';

const HeaderOne = () => {
    const pathname = usePathname();
    const [fixedHeader, setFixedHeader] = useState(false);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false);
    const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(
        null
    );
    const [language, setLanguage] = useState(i18n.language);

    const isCheckedIn = localStorage.getItem('checkedIn');

    const handleOpenSubNavMobile = (index: number) => {
        setOpenSubNavMobile(openSubNavMobile === index ? null : index);
    };

    const { t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setFixedHeader(scrollPosition > 10);
            setLastScrollPosition(scrollPosition);
        };

        // Add event scroll when component mounted
        window.addEventListener('scroll', handleScroll);

        // Remove event scroll when component mounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollPosition]);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = e.target.value;
        i18n.changeLanguage(newLanguage);
        setLanguage(newLanguage); // Update the language state
    };

    return (
        <>
            <div id="header" className="header">
                <div
                    className={`header-main h-20 w-full bg-white min-[1322px]:px-10 px-4 flex items-center justify-between ${fixedHeader ? 'fixed box-shadow' : ''
                        }`}
                >
                    <Link href={'/'} className="logo">
                        <Image
                            src={'/images/logo.png'}
                            width={2000}
                            height={1000}
                            alt="logo"
                            priority={true}
                            className="sm:w-[220px] w-[160px]"
                        />
                    </Link>
                    <div className="menu-main h-full max-lg:hidden">
                        <ul className="flex items-center xl:gap-[50px] gap-10 h-full">
                            <li className="h-full relative">
                                <Link
                                    href="#!"
                                    className={`text-button duration-300 h-full flex items-center justify-center gap-1 ${pathname === '/' ||
                                        pathname.includes('/homepages/')
                                        ? 'active'
                                        : ''
                                        }`}
                                >
                                    {t('header.home')}
                                </Link>
                                <div className="sub-menu absolute bg-white">
                                    <ul>
                                        <li>
                                            <Link
                                                href="/"
                                                className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                            >
                                                {t('header.explore-camp')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/homepages/home2"
                                                className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname ===
                                                    '/homepages/home2'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                            >
                                                {t('header.discover-camp')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/homepages/home3"
                                                className={`link text-button text-variant1 py-4 pl-6 pr-16 duration-300 ${pathname ===
                                                    '/homepages/home3'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                            >
                                                {t(
                                                    'header.discover-luxury-camp'
                                                )}
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="h-full relative">
                                <Link
                                    href="#!"
                                    className={`text-button duration-300 h-full flex items-center justify-center gap-1 ${pathname.includes('/camp/')
                                        ? 'active'
                                        : ''
                                        }`}
                                >
                                    {t('header.camps')}
                                </Link>
                                <div className="sub-menu absolute bg-white">
                                    <ul>
                                        <li>
                                            <Link
                                                href="/camp/topmap-grid"
                                                className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname ===
                                                    '/camp/topmap-grid'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                            >
                                                {t('header.topmap-grid')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/camp/topmap-list"
                                                className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname ===
                                                    '/camp/topmap-list'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                            >
                                                {t('header.topmap-list')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/camp/filter-scroll"
                                                className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname ===
                                                    '/camp/filter-scroll'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                            >
                                                {t('header.filter-scrolls')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/camp/filter-dropdown"
                                                className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname ===
                                                    '/camp/filter-dropdown'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                            >
                                                {t('header.filter-dropdown')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/camp/topmap-sidebar"
                                                className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname ===
                                                    '/camp/topmap-sidebar'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                            >
                                                {t('header.topmap-sidebar')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/camp/halfmap-grid"
                                                className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname ===
                                                    '/camp/halfmap-grid'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                            >
                                                {t('header.halfmap-grid')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/camp/halfmap-list"
                                                className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname ===
                                                    '/camp/halfmap-list'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                            >
                                                {t('header.halfmap-list')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/camp/tent-detail"
                                                className={`link text-button text-variant1 py-4 pl-6 pr-16 duration-300 ${pathname ===
                                                    '/camp/tent-detail'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                            >
                                                {t('header.tent-details')}
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="h-full relative">
                                <Link
                                    href="/about"
                                    className={`text-button duration-300 h-full flex items-center justify-center gap-1 ${pathname === '/about' ? 'active' : ''
                                        }`}
                                >
                                    {t('header.about-us')}
                                </Link>
                            </li>
                            {isCheckedIn && <li className="h-full relative">
                                <Link
                                    href="/community"
                                    className={`text-button duration-300 h-full flex items-center justify-center gap-1 ${pathname.includes('/community/')
                                        ? 'active'
                                        : ''
                                        }`}
                                >
                                    {t('header.community')}
                                </Link>

                            </li>}
                            <li className="h-full relative">
                                <Link
                                    href="#!"
                                    className={`text-button duration-300 h-full flex items-center justify-center gap-1 ${pathname.includes('/pages/')
                                        ? 'active'
                                        : ''
                                        }`}
                                >
                                    {t('header.pages')}
                                </Link>
                                <div className="sub-menu absolute bg-white">
                                    <ul>
                                        <li>
                                            <Link
                                                href="/pages/contact"
                                                className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname ===
                                                    '/pages/contact'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                            >
                                                {t('header.contact-us')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/pages/faqs"
                                                className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/pages/faqs'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                            >
                                                {t('header.faqs')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/pages/review"
                                                className={`link text-button text-variant1 py-4 pl-6 pr-16 duration-300 ${pathname === '/pages/review'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                            >
                                                {t('header.review')}
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="right flex items-center gap-3">
                        <div className="weather flex items-center gap-1 max-sm:hidden">
                            <Icon.CloudSun className="text-xl" />
                            <div className="text-button">18°C</div>
                        </div>
                        <div className="bg-outline w-px h-4 max-sm:hidden"></div>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <div className="bg-outline w-px h-4 max-sm:hidden"></div>
                        <div className="select-block pr-5 max-sm:hidden">
                            <select
                                name="language"
                                id="language"
                                className="text-button"
                                value={language}
                                onChange={handleLanguageChange} // Language change handler
                            >
                                <option value="en">EN</option>
                                <option value="fr">FR</option>
                                <option value="de">DE</option>
                            </select>
                            <Icon.CaretDown className="icon text-base right-0" />
                        </div>
                        <div
                            className="menu-mobile-icon lg:hidden flex items-center ml-4"
                            onClick={() => setOpenMenuMobile(true)}
                        >
                            <Icon.List
                                className="sm:text-xl text-2xl text-black"
                                weight="bold"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div id="menu-mobile" className={`${openMenuMobile ? 'open' : ''}`}>
                <div className="menu-container bg-white h-full">
                    <div className="container h-full">
                        <div className="menu-main h-full overflow-hidden">
                            <div className="heading py-2 relative flex items-center justify-center">
                                <div
                                    className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                                    onClick={() => setOpenMenuMobile(false)}
                                >
                                    <Icon.X size={14} />
                                </div>
                                <Link href={'/'} className="logo text-center">
                                    <Image
                                        src={'/images/logo.png'}
                                        width={3000}
                                        height={2000}
                                        alt="logo"
                                        priority={true}
                                        className="md:w-[220px] w-[180px]"
                                    />
                                </Link>
                            </div>
                            <div className="list-nav mt-6">
                                <ul>
                                    <li>
                                        <a
                                            href={'#!'}
                                            className={`text-title uppercase flex items-center justify-between`}
                                        >
                                            {t('header.home')}
                                        </a>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 2 ? 'open' : ''
                                            }`}
                                        onClick={() =>
                                            handleOpenSubNavMobile(2)
                                        }
                                    >
                                        <a
                                            href={'#!'}
                                            className="text-title uppercase flex items-center justify-between mt-5"
                                        >
                                            {t('header.camps')}
                                            <span className="text-right">
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() =>
                                                    handleOpenSubNavMobile(2)
                                                }
                                            >
                                                <Icon.CaretLeft />
                                                {t('general.back')}
                                            </div>
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul>
                                                    <li>
                                                        <Link
                                                            href="/camp/topmap-grid"
                                                            className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname ===
                                                                '/camp/topmap-grid'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                        >
                                                            {t('header.topmap-grid')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/camp/topmap-list"
                                                            className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname ===
                                                                '/camp/topmap-list'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                        >
                                                            {t('header.topmap-list')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/camp/filter-scroll"
                                                            className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname ===
                                                                '/camp/filter-scroll'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                        >
                                                            {t('header.filter-scrolls')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/camp/filter-dropdown"
                                                            className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname ===
                                                                '/camp/filter-dropdown'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                        >
                                                            {t('header.filter-dropdown')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/camp/topmap-sidebar"
                                                            className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname ===
                                                                '/camp/topmap-sidebar'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                        >
                                                            {t('header.topmap-sidebar')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/camp/halfmap-grid"
                                                            className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname ===
                                                                '/camp/halfmap-grid'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                        >
                                                            {t('header.halfmap-grid')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/camp/halfmap-list"
                                                            className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname ===
                                                                '/camp/halfmap-list'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                        >
                                                            {t('header.halfmap-list')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/camp/tent-detail"
                                                            className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname ===
                                                                '/camp/tent-detail'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                        >
                                                            {t('header.tent-details')}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link
                                            href={'/about'}
                                            className="text-title uppercase flex items-center justify-between mt-5"
                                        >
                                            {t('header.about-us')}
                                            <span className="text-right">
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </Link>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 4 ? 'open' : ''
                                            }`}
                                        onClick={() =>
                                            handleOpenSubNavMobile(4)
                                        }
                                    >
                                        <a
                                            href={'#!'}
                                            className="text-title uppercase flex items-center justify-between mt-5"
                                        >
                                            {t('header.blog')}
                                            <span className="text-right">
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() =>
                                                    handleOpenSubNavMobile(4)
                                                }
                                            >
                                                <Icon.CaretLeft />
                                                {t('general.back')}
                                            </div>
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul className="w-full">
                                                    <li>
                                                        <Link
                                                            href="/blog/default"
                                                            className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname ===
                                                                '/blog/default'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                        >
                                                            {t('header.blog-default')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/blog/grid"
                                                            className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname ===
                                                                '/blog/grid'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                        >
                                                            {t('header.blog-grid')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/blog/detail"
                                                            className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname ===
                                                                '/blog/detail'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                        >
                                                            {t('header.blog-details')}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 5 ? 'open' : ''
                                            }`}
                                        onClick={() =>
                                            handleOpenSubNavMobile(5)
                                        }
                                    >
                                        <a
                                            href={'#!'}
                                            className="text-title uppercase flex items-center justify-between mt-5"
                                        >
                                            {t('header.pages')}
                                            <span className="text-right">
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() =>
                                                    handleOpenSubNavMobile(5)
                                                }
                                            >
                                                <Icon.CaretLeft />
                                                {t('general.back')}
                                            </div>
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul className="w-full">
                                                    <li>
                                                        <Link
                                                            href="/pages/contact"
                                                            className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname ===
                                                                '/pages/contact'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                        >
                                                            {t('header.about-us')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/pages/faqs"
                                                            className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname ===
                                                                '/pages/faqs'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                        >
                                                            {t('header.faqs')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/pages/review"
                                                            className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname ===
                                                                '/pages/review'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                        >
                                                            {t('header.review')}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderOne;
