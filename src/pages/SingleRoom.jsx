import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ResortContext } from "../components/ResortContext";
import Banner from "../components/Banner";
import defaultBg from "../images/room-1.jpeg";
import styled from "styled-components";

const SingleRoom = () => {
  const { slug } = useParams();
  const { getRoom } = useContext(ResortContext);
  const room = getRoom(slug);

  if (!room) {
    return (
      <div className="error">
        <h3>no such room could be found</h3>
        <Link className="btn-primary" to="/">
          back to rooms
        </Link>
      </div>
    );
  }

  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images,
  } = room;

  const [mainImage, ...defaultImgs] = images;

  return (
    <div>
      <StyledHero $bgImg={mainImage}>
        <Banner title={`${name} room`}>
          <Link className="btn-primary" to="/rooms">
            back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-room">
        <div className="single-room-images">
          {defaultImgs.map((item, index) => (
            <img key={index} src={item} alt="name" />
          ))}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : {size} SQFT</h6>
            <h6>
              max capacity :
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>pets :{pets ? "pets allowed" : "no pets"}</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>extras</h6>
        <ul className="extras">
          {extras.map((extra, index) => (
            <li key={index}>- {extra}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const StyledHero = styled.header`
  min-height: 50vh;
  background: url(${(props) => props.$bgImg || defaultBg}) center/cover
    no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SingleRoom;
