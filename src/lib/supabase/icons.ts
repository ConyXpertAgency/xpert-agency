import type { IconType } from "react-icons";
import { HiOutlineCog, HiOutlineCog6Tooth, HiOutlineWrench } from "react-icons/hi2";
import { GiRobotGrab, GiChart, GiGlobe } from "react-icons/gi";
import { FiClipboard, FiCoffee, FiUsers, FiPhone, FiBarChart, FiTruck, FiTool } from "react-icons/fi";
import { FaRegUser, FaChartLine, FaTruckMoving, FaCogs, FaProjectDiagram, FaRegClock, FaRegChartBar, FaRegCheckCircle, FaArrowRight } from "react-icons/fa";
import { PiFactory, PiFactoryLight, PiSuitcaseSimpleDuotone, PiUsersThree } from "react-icons/pi";
import { AiOutlineTruck } from "react-icons/ai";
import { LuPuzzle, LuUsersRound, LuPencilLine, LuBrainCog, LuUsers, LuChartNoAxesCombined } from "react-icons/lu";
import { RiGraduationCapLine, RiTargetLine } from "react-icons/ri";
import { IoBarChartOutline, IoShieldCheckmarkOutline, IoBagHandleOutline, IoRocketOutline, IoChatboxEllipsesOutline, IoSchoolOutline, IoCallOutline } from "react-icons/io5";
import { IoIosSettings, IoIosSearch, IoMdClipboard, IoIosPulse } from "react-icons/io";
import { MdOutlineShoppingCart, MdOutlineEmail, MdLockOutline, MdWeb } from "react-icons/md";
import { BsBarChart, BsBarChartLine } from "react-icons/bs";
import { SlTarget } from "react-icons/sl";
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
  FiTool: FiTool,
  SlTarget: SlTarget,
  BsBarChart: BsBarChart,
  BsBarChartLine: BsBarChartLine,
  MdWeb: MdWeb,
  PiUsersThree: PiUsersThree,
  LuBrainCog: LuBrainCog,
  LuUsers: LuUsers,
  LuChartNoAxesCombined: LuChartNoAxesCombined,
  IoSchoolOutline: IoSchoolOutline,
  IoIosPulse: IoIosPulse,
  IoCallOutline: IoCallOutline,
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
