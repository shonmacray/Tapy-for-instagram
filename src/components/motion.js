import React from "react";
import { View, Image, Text } from "react-native";
import { useSelector } from "react-redux";
import e1 from "../assets/64/1.png";
import e2 from "../assets/64/2.png";
import e3 from "../assets/64/3.png";
import e4 from "../assets/64/4.png";
import e5 from "../assets/64/5.png";
import e6 from "../assets/64/6.png";
import e7 from "../assets/64/7.png";
import e8 from "../assets/64/8.png";
import e9 from "../assets/64/9.png";
import e10 from "../assets/64/10.png";
import e11 from "../assets/64/11.png";
import e12 from "../assets/64/12.png";
import e13 from "../assets/64/13.png";
import e14 from "../assets/64/14.png";
import e15 from "../assets/64/15.png";
import e16 from "../assets/64/16.png";
import e17 from "../assets/64/17.png";
import e18 from "../assets/64/18.png";
import e19 from "../assets/64/19.png";
import e20 from "../assets/64/20.png";

const Motion = () => {
  const { motion } = useSelector(state => state.appReducer);
  switch (motion) {
    case 1:
      return <Image source={e1} />;
    case 2:
      return <Image source={e2} />;
    case 3:
      return <Image source={e3} />;
    case 4:
      return <Image source={e4} />;
    case 5:
      return <Image source={e5} />;
    case 6:
      return <Image source={e6} />;
    case 7:
      return <Image source={e7} />;
    case 8:
      return <Image source={e8} />;
    case 9:
      return <Image source={e9} />;
    case 10:
      return <Image source={e10} />;
    case 11:
      return <Image source={e11} />;
    case 12:
      return <Image source={e12} />;
    case 13:
      return <Image source={e13} />;
    case 14:
      return <Image source={e14} />;
    case 15:
      return <Image source={e15} />;
    case 16:
      return <Image source={e16} />;
    case 17:
      return <Image source={e17} />;
    case 18:
      return <Image source={e18} />;
    case 19:
      return <Image source={e19} />;
    case 20:
      return <Image source={e20} />;
    default:
      return <Image source={e2} />;
  }
};

export default Motion;
