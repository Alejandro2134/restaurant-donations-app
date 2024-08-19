import "./style.css";

import cheeseImage from "../../../img/cheese.jpg";
import chickenImage from "../../../img/chicken.jpg";
import ketchupImage from "../../../img/ketchup.jpg";
import lemonImage from "../../../img/lemon.jpg";
import lettuceImage from "../../../img/lettuce.jpg";
import meatImage from "../../../img/meat.jpg";
import onionImage from "../../../img/onion.jpg";
import potatoImage from "../../../img/potato.jpg";
import riceImage from "../../../img/rice.jpg";
import tomatoImage from "../../../img/tomato.jpg";

type ImageSelector = {
  image: string;
  alt: string;
};

type Props = {
  imageName: string;
};

const imageSelector = (imageName: string) => {
  const selectImage: { [imageName: string]: ImageSelector } = {
    cheese: { image: cheeseImage, alt: "cheese" },
    chicken: { image: chickenImage, alt: "chicken" },
    ketchup: { image: ketchupImage, alt: "ketchup" },
    lemon: { image: lemonImage, alt: "lemon" },
    lettuce: { image: lettuceImage, alt: "lettuce" },
    meat: { image: meatImage, alt: "meat" },
    onion: { image: onionImage, alt: "onion" },
    potato: { image: potatoImage, alt: "potato" },
    rice: { image: riceImage, alt: "rice" },
    tomato: { image: tomatoImage, alt: "tomato" },
  };

  return selectImage[imageName];
};

const Image = ({ imageName }: Props) => {
  const { image, alt } = imageSelector(imageName);

  return <img src={image} alt={alt} />;
};

export default Image;
