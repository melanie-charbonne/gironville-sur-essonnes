import Link from "next/link"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube'

const Footer = ({ footerMenu, footerInfos }) => {
    console.log(footerInfos)
    return (
        <>
            <footer className="p-8 lg:p-16 bg-blue-dark text-white">
                <div className="footer-top grid grid-cols-1 lg:grid-cols-3 lg:gap-x-4">
                    <div className=" mb-8 lg:mb-0">
                        <h3 className="font-hn mb-6 uppercase">
                            {footerInfos.footerTitleColumn1}
                        </h3>
                        <p className="text-sm mb-1">
                            {footerInfos.footerAddress}
                        </p>
                        <p className="text-sm">
                            <Link
                                href={`tel:${footerInfos.footerPhoneNumber}`}
                                className="hover:underline"
                            >
                                {footerInfos.footerPhoneNumber}
                            </Link>
                        </p>
                        <p className="text-sm">
                            <Link
                                href={`mailto:${footerInfos.footerEmailAddress}`}
                                className="hover:underline"
                            >
                                {footerInfos.footerEmailAddress}
                            </Link>
                        </p>
                    </div>
                    <div className="mb-8 lg:mb-0">
                        <h3 className="font-hn mb-6 uppercase">
                            {footerInfos.footerTitleColumn2}
                        </h3>
                        <div
                            className="text-sm leading-7"
                            dangerouslySetInnerHTML={{
                                __html: footerInfos.footerOpeningHours,
                            }}
                        />
                    </div>
                    <div>
                        <h3 className="font-hn mb-6 uppercase">
                            {footerInfos.footerTitleColumn3}
                        </h3>
                        <ul className="social flex gap-x-4">
                            <li className="social-email">
                                <Link
                                    href={`mailto:${footerInfos.footerEmailAddress}`}
                                >
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </Link>
                            </li>
                            {footerInfos.footerFacebookLink && (
                                <li className="social-facebook">
                                    <Link
                                        href={`${footerInfos.footerFacebookLink}`}
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </Link>
                                </li>
                            )}
                            {footerInfos.footerInstagramLink && (
                                <li className="social-facebook">
                                    <Link
                                        href={`${footerInfos.footerInstagramLink}`}
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </Link>
                                </li>
                            )}
                            {footerInfos.footerYoutubeLink && (
                                <li className="social-facebook">
                                    <Link
                                        href={`${footerInfos.footerYoutubeLink}`}
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom"></div>
            </footer>
        </>
    )
}
export default Footer
