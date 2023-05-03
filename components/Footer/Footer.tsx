import Link from "next/link"
import { isEmpty } from 'lodash'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube'

const Footer = ({ footerMenu, footerInfos }) => {
    return (
        <>
            <footer className="bg-blue-dark text-white">
                <div className="footer-top p-8 lg:py-16 px-4 md:px-7 lg:px-12 grid grid-cols-1 lg:grid-cols-3 lg:gap-x-4">
                    <div className=" mb-8 lg:mb-0">
                        <h3 className="font-hn mb-6 uppercase">
                            {footerInfos?.footerTitleColumn1}
                        </h3>
                        <p className="text-sm mb-1">
                            {footerInfos?.footerAddress}
                        </p>
                        <p className="text-sm">
                            <Link
                                href={`tel:${footerInfos?.footerPhoneNumber}`}
                                className="hover:underline"
                            >
                                {footerInfos?.footerPhoneNumber}
                            </Link>
                        </p>
                        <p className="text-sm">
                            <Link
                                href={`mailto:${footerInfos?.footerEmailAddress}`}
                                className="hover:underline"
                            >
                                {footerInfos?.footerEmailAddress}
                            </Link>
                        </p>
                    </div>
                    <div className="mb-8 lg:mb-0">
                        <h3 className="font-hn mb-6 uppercase">
                            {footerInfos?.footerTitleColumn2}
                        </h3>
                        <div
                            className="text-sm leading-7"
                            dangerouslySetInnerHTML={{
                                __html: footerInfos?.footerOpeningHours,
                            }}
                        />
                    </div>
                    <div>
                        <h3 className="font-hn mb-6 uppercase">
                            {footerInfos?.footerTitleColumn3}
                        </h3>
                        <ul className="social flex gap-x-4">
                            <li className="social-email">
                                <Link
                                    href={`mailto:${footerInfos?.footerEmailAddress}`}
                                >
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </Link>
                            </li>
                            {footerInfos?.footerFacebookLink && (
                                <li className="social-facebook">
                                    <Link
                                        href={`${footerInfos?.footerFacebookLink}`}
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </Link>
                                </li>
                            )}
                            {footerInfos?.footerInstagramLink && (
                                <li className="social-facebook">
                                    <Link
                                        href={`${footerInfos?.footerInstagramLink}`}
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </Link>
                                </li>
                            )}
                            {footerInfos?.footerYoutubeLink && (
                                <li className="social-facebook">
                                    <Link
                                        href={`${footerInfos?.footerYoutubeLink}`}
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom py-6 lg:py-4 px-4 md:px-7 lg:px-12 flex flex-col lg:flex-row justify-between gap-y-8 lg:gap-y-0 mt-8 border-t border-slate-400">
                    <div className="text-sm order-2 lg:order-1">
                        {footerInfos?.footerCopyright}
                    </div>
                    <div className="order-1 lg:order-2">
                        <ul className="flex flex-col lg:flex-row gap-y-3 lg:gap-x-4 lg:gap-y-0 text-sm">
                            {!isEmpty(footerMenu) &&
                                footerMenu.map((footerMenuItem) => (
                                    <li
                                        key={footerMenuItem?.node?.id}
                                        className="text-sm"
                                    >
                                        <Link
                                            href={footerMenuItem?.node?.path}
                                            className="lg:hover:underline"
                                        >
                                            {footerMenuItem?.node?.label}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer
