import React, { useState } from "react";
import Title from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

const Services = () => {
  const [services, setServices] = useState([
    {
      icon: <FaCocktail />,
      title: "free cocktails",
      info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <FaHiking />,
      title: "endless hiking",
      info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <FaShuttleVan />,
      title: "free shuttle",
      info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <FaBeer />,
      title: "stronges beer",
      info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
  ]);
  return (
    <section className="services">
      <Title title="services" />
      <div className="services-center">
        {services.map((service, index) => (
          <article className="service" key={index}>
            <span>{service.icon}</span>
            <h6>{service.title}</h6>
            <p>{service.info}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
