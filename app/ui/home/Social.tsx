import Link from 'next/link';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const socials = [
  { icon: <FaFacebook />, path: 'https://www.facebook.com/ieeecekgr/' },
  { icon: <FaInstagram />, path: 'https://www.instagram.com/ieeesbcekgr/' },
  { icon: <FaTwitter />, path: 'https://www.twitter.com/' },
];

const Social = ({
  containerStyles,
  iconsStyles,
}: {
  containerStyles: any;
  iconsStyles: any;
}) => {
  return (
    <div className={containerStyles}>
      {socials.map((social: any, index: number) => (
        <Link key={index} href={social.path} className={iconsStyles}>
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default Social;
