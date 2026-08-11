import type { IconType } from "react-icons";

import * as ai from "react-icons/ai";
import * as bi from "react-icons/bi";
import * as bs from "react-icons/bs";
import * as ci from "react-icons/ci";
import * as fa from "react-icons/fa";
import * as fa6 from "react-icons/fa6";
import * as fi from "react-icons/fi";
import * as gi from "react-icons/gi";
import * as go from "react-icons/go";
import * as gr from "react-icons/gr";
import * as hi from "react-icons/hi";
import * as hi2 from "react-icons/hi2";
import * as im from "react-icons/im";
import * as io from "react-icons/io";
import * as io5 from "react-icons/io5";
import * as lu from "react-icons/lu";
import * as md from "react-icons/md";
import * as pi from "react-icons/pi";
import * as ri from "react-icons/ri";
import * as rx from "react-icons/rx";
import * as tfi from "react-icons/tfi";
import * as ti from "react-icons/ti";

export const allIcons: Record<string, IconType> = {
  ...ai,
  ...bi,
  ...bs,
  ...ci,
  ...fa,
  ...fa6,
  ...fi,
  ...gi,
  ...go,
  ...gr,
  ...hi,
  ...hi2,
  ...im,
  ...io,
  ...io5,
  ...lu,
  ...md,
  ...pi,
  ...ri,
  ...rx,
  ...tfi,
  ...ti,
};

export const iconNames = Object.keys(allIcons).sort((a, b) => a.localeCompare(b));
