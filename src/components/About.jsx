import React from "react";
import PageTitle from "./PageTitle";

export default function About() {
  const features = [
    {
      title: "Premium Quality",
      description:
        "We don't just sell stickers; we sell art that lasts. We strive to provide every customer with the utmost satisfaction by delivering high-quality vinyl stickers crafted with care, precision, and a passion for detail.",
    },
    {
      title: "Built to Last",
      description:
        "Our vinyl stickers feature a premium matte or glossy finish lamination and are made with advanced adhesive technology. Designed to withstand all weather conditions and resist scratches, our stickers are gentle enough to preserve the surface of your beloved gadgets.",
    },
    {
      title: "Customer First",
      description:
        "Your happiness is our vibe. Customer satisfaction is our top priority, and we’re committed to delivering a seamless, friendly, and exceptional shopping experience from click to stick.",
    },
    {
      title: "Designs You’ll Love",
      description:
        "With over 1,000 unique designs, our collection ranges from relatable and seriously funny to delightfully quirky. And we’re just getting started—stay tuned for more exciting products and designs!",
    },
  ];

  return (
    <div className="max-w-[1152px] min-h-[852px] mx-auto px-6 py-8 font-primary">
      <PageTitle title="About Us" />

      {/* Intro Section */}
      <section className="mb-12">
        {/* Added mx-auto and text-center to align with the centered PageTitle */}
        <p className="leading-7 text-lg text-gray-600 dark:text-lighter max-w-3xl mx-auto text-center">
          <span className="font-bold text-primary dark:text-light">
            StickyVibe
          </span>{" "}
          is a creative initiative by{" "}
          <span className="font-bold text-primary dark:text-light">
            StickyVibe Designs
          </span>
          , dedicated to offering you the freshest, most sought-after stickers
          and posters on the market!
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section>
        <h2 className="text-3xl font-bold text-primary dark:text-light mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">
          Why Choose Us?
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="text-xl font-semibold text-primary dark:text-light mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-lighter leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
