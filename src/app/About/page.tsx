"use client";

import React from 'react';
import AboutData from '../../../public/texts/aboutTexts';
import Image from 'next/image'

const About = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div 
      className="faq-container"
      style={{ 
        fontFamily: 'ProtoMono-semiBold',
      }}
    >
      <a onClick={goBack} className="go-back-link"> Go Back </a>

      <div style={{display:"flex", justifyContent: "center", marginTop:"12%"}}>
        <Image src="/images/logo120120nobg.png" width={100} height={100} alt="Kuro"/>
        </div>

      <div style={{justifyContent: "center", marginTop: "12%"}}>
      {AboutData.map((faq:any, index:any) => (
        <div key={index} className="faq-item">
          <h3 className="faq-question">{faq.question}</h3>
          <p className="faq-answer">{faq.answer}</p>
        </div>
      ))}
      </div>
      <style jsx>{`
        .faq-container {
          display: flex;
          flex-direction: column;
          color: white;
          padding: 20px;
          border-radius: 10px;
          width: 36%;
          margin: auto;
        }
        .go-back-link {
          cursor: pointer;
          color: blue;
          text-decoration: underline;
          margin-bottom: 10px;
        }
        .faq-item {
          margin-bottom: 10%;
          gap: 24%;
        }
        .faq-question {
          font-size: 36px;
          font-weight: bold;
          font-family: ProtoMono-semiBold;
        }
        .faq-answer {
          font-size: 16px;
          margin-top: 5px;
          font-family: ProtoMono-light;
        }
      `}</style>
    </div>
  );
};

export default About;