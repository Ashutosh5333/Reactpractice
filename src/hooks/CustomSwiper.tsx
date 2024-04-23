'use client';
import React from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import UseIndexHandler from "../Components/UseIndexHandler";
import { Interier } from "../context/index";



interface CustomSwiperProps {
  data: { id: number; Image: string; Title: string; description: string }[];
}

const CustomSwiper: React.FC<CustomSwiperProps> = () => {
  const { activeIndex, handlePrev, handleNext } = UseIndexHandler(Interier);

  return (
    <div className="py-2 border border-dark w-100 sm:w-90 lg:w-80 m-auto">
      {Interier.map((el, index) => (
        <div
          className={` border border-yellow-500 py-2 pb-4 d-flex flex-column flex-sm-row ${
            index === activeIndex ? "d-block" : "d-none"
          }`}
          key={el.id}
        >
          <div className="w-100 w-sm-70 w-lg-60 m-auto py-2 px-4 bg-cover border border-danger">
            <div className="aspect-w-4 aspect-h-3">
              <img
                src={el.Image}
                className="img-fluid rounded-2rem"
                alt={`image_${el.id}`}
              />
            </div>
          </div>

          <div className="w-100 sm:w-40 border border-success d-flex flex-column justify-content-end">
            <div></div>
            <div>
              <div className="relative px-4 sm:px-4 flex-grow">
                <h2 className="text-4xl font-normal">{el.Title}</h2>
                <p className="text-sm py-2">{el.description}</p>
              </div>
              <div className="px-8 py-4 border border-yellow-600 d-flex justify-content-between">
                <button className="btn btn-primary w-10 h-10" onClick={handlePrev}>
                  <MoveLeft className="w-100 h-100" />
                </button>
                <button className="btn btn-primary" onClick={handleNext}>
                  <MoveRight className="w-100 h-100" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomSwiper;
