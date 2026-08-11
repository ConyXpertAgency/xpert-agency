import type { IconType } from "react-icons";
import { HiOutlineCog, HiOutlineCog6Tooth, HiOutlineWrench } from "react-icons/hi2";
import { GiRobotGrab, GiChart, GiGlobe } from "react-icons/gi";
import { FiClipboard, FiCoffee, FiUsers, FiPhone, FiBarChart, FiTruck } from "react-icons/fi";
import { FaRegUser, FaChartLine, FaTruckMoving, FaCogs, FaProjectDiagram, FaRegClock, FaRegChartBar, FaRegCheckCircle, FaArrowRight } from "react-icons/fa";
import { PiFactory, PiFactoryLight, PiSuitcaseSimpleDuotone } from "react-icons/pi";
import { AiOutlineTruck } from "react-icons/ai";
import { LuPuzzle, LuUsersRound, LuPencilLine } from "react-icons/lu";
import { RiGraduationCapLine, RiTargetLine } from "react-icons/ri";
import { IoBarChartOutline, IoShieldCheckmarkOutline, IoBagHandleOutline, IoRocketOutline, IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoIosSettings, IoIosSearch, IoMdClipboard } from "react-icons/io";
import { MdOutlineShoppingCart, MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { GrGroup, GrLocation, GrLineChart } from "react-icons/gr";
import { CiGlobe } from "react-icons/ci";
import { BiTargetLock, BiSolidQuoteAltLeft } from "react-icons/bi";
import { TfiReload } from "react-icons/tfi";

export const iconMap: Record<string, IconType> = {
  HiOutlineCog: HiOutlineCog,
  HiOutlineCog6Tooth: HiOutlineCog6Tooth,
  HiOutlineWrench: HiOutlineWrench,
  GiRobotGrab: GiRobotGrab,
  GiChart: GiChart,
  GiGlobe: GiGlobe,
  FiClipboard: FiClipboard,
  FiCoffee: FiCoffee,
  FiUsers: FiUsers,
  FiPhone: FiPhone,
  FiBarChart: FiBarChart,
  FiTruck: FiTruck,
  FaRegUser: FaRegUser,
  FaChartLine: FaChartLine,
  FaTruckMoving: FaTruckMoving,
  FaCogs: FaCogs,
  FaProjectDiagram: FaProjectDiagram,
  FaRegClock: FaRegClock,
  FaRegChartBar: FaRegChartBar,
  FaRegCheckCircle: FaRegCheckCircle,
  FaArrowRight: FaArrowRight,
  PiFactory: PiFactory,
  PiFactoryLight: PiFactoryLight,
  PiSuitcaseSimpleDuotone: PiSuitcaseSimpleDuotone,
  AiOutlineTruck: AiOutlineTruck,
  LuPuzzle: LuPuzzle,
  LuUsersRound: LuUsersRound,
  LuPencilLine: LuPencilLine,
  RiGraduationCapLine: RiGraduationCapLine,
  RiTargetLine: RiTargetLine,
  IoBarChartOutline: IoBarChartOutline,
  IoShieldCheckmarkOutline: IoShieldCheckmarkOutline,
  IoIosSettings: IoIosSettings,
  IoIosSearch: IoIosSearch,
  IoMdClipboard: IoMdClipboard,
  IoBagHandleOutline: IoBagHandleOutline,
  IoRocketOutline: IoRocketOutline,
  IoChatboxEllipsesOutline: IoChatboxEllipsesOutline,
  MdOutlineShoppingCart: MdOutlineShoppingCart,
  MdOutlineEmail: MdOutlineEmail,
  MdLockOutline: MdLockOutline,
  GrGroup: GrGroup,
  GrLocation: GrLocation,
  GrLineChart: GrLineChart,
  CiGlobe: CiGlobe,
  BiTargetLock: BiTargetLock,
  BiSolidQuoteAltLeft: BiSolidQuoteAltLeft,
  TfiReload: TfiReload,
};

export function getIcon(name?: string): IconType {
  if (name && name in iconMap) return iconMap[name];
  return HiOutlineCog;
}
