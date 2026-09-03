import {
  IoMegaphone,
  IoPlay,
  IoChevronBack,
  IoArrowForward,
} from "react-icons/io5";
import {
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";
import {
  SlGraduation,
  SlHeart,
  SlPeople,
  SlBriefcase,
  SlDiamond,
} from "react-icons/sl";

export const EducationIcon = SlGraduation;
export const ServiceIcon = SlHeart;
export const RegularDonorIcon = SlDiamond;
export const LifetimeDonorIcon = SlDiamond;
export const VolunteerIcon = SlPeople;
export const CareerIcon = SlBriefcase;
export const ArrowLeftIcon = IoChevronBack;
export const ArrowRightIcon = IoArrowForward;
export const PlayIcon = IoPlay;
export const MegaphoneIcon = IoMegaphone;
export const FacebookIcon = FaFacebookF;
export const YoutubeIcon = FaYoutube;
export const WhatsappIcon = FaWhatsapp;

// Decorative divider used in the newsletter band.
export const DecoOneIcon = ({ className }: { className?: string }) => (
  <span aria-hidden className={className} />
);
export const DecoTwoIcon = DecoOneIcon;
export const DecoThreeIcon = DecoOneIcon;
export const DecoFourIcon = DecoOneIcon;
