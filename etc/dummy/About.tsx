"use client";

import React from 'react';
// import AboutData from '../../public/texts/aboutTexts.tsx';

const About = () => {
  return (
    <div className="faq-container">
      <h1 className="faq-title">FAQs</h1>
      {AboutData.map((faq:any, index:any) => (
        <div key={index} className="faq-item">
          <h3 className="faq-question">{faq.question}</h3>
          <p className="faq-answer">{faq.answer}</p>
        </div>
      ))}
      <style jsx>{`
        .faq-container {
          display: flex;
          flex-direction: column;
          color: black;
          background-color: #CBF9BE;
          padding: 20px;
          border-radius: 10px;
          width: 100%;
          max-width: 438px;
          margin: auto;
        }
        .faq-title {
          font-size: 24px;
          margin-bottom: 20px;
          font-family: ProtoMono-semiBold;
        }
        .faq-item {
          margin-bottom: 15px;
        }
        .faq-question {
          font-size: 18px;
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