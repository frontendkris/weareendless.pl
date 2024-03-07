import React, { useEffect, useMemo, useRef, useState } from "react";

const sampleText = [
  "(Z BEZKRESU [x])*",
  "POMYSŁÓW [x] I [x]",
  "MOŻLIWOŚCI [x][x]",
  "[x] WYBIERAMY TE, [x]",
  "KTÓRE [x] NAJLEPIEJ",
  'P@SUJĄ [x] "DO',
  "TWOJEGO* BRIEFU",
];

const imageSources = [
  "https://picsum.photos/344/260",
  "https://picsum.photos/300/200",
  "https://picsum.photos/150/150",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/310",
  "https://picsum.photos/200/320",
  "https://picsum.photos/240/300",
  "https://picsum.photos/260/300",
];

const boldRandomLetterInSegment = (segment: string): JSX.Element => {
  const elements: JSX.Element[] = [];

  segment.split("").forEach((letter, index) => {
    if (Math.random() < 0.2) {
      elements.push(<strong key={index}>{letter}</strong>);
    } else {
      elements.push(<React.Fragment key={index}>{letter}</React.Fragment>);
    }
  });

  return <span className="min-w-max">{elements}</span>;
};

const Mozaic: React.FC = () => {
  const textSegments = useMemo(
    () => sampleText.map((row) => row.split("[x]")),
    [sampleText]
  );
  const [content, setContent] = useState<JSX.Element | null>(null);
  const lastUpdateTimeRef = useRef(Date.now());
  const refreshRate = 500;

  useEffect(() => {
    updateContent();
  }, []);

  const getRandomImageSource = (usedImages: string[]): string => {
    let randomImageSource: string =
      imageSources[Math.floor(Math.random() * imageSources.length)];
    while (
      usedImages.includes(randomImageSource) &&
      usedImages.length < imageSources.length
    ) {
      randomImageSource =
        imageSources[Math.floor(Math.random() * imageSources.length)];
    }
    usedImages.push(randomImageSource);
    return randomImageSource;
  };

  const updateContent = () => {
    let usedImages: string[] = [];
    const contentWithImages = textSegments.map((row, rowIndex) => {
      return (
        <div
          className="flex items-center justify-start gap-4 w-full"
          key={`row-${rowIndex}`}
        >
          {row.flatMap((segment, index) => [
            !!segment && (
              <React.Fragment key={`segment-${index}`}>
                {boldRandomLetterInSegment(segment)}
              </React.Fragment>
            ),

            row.length - 1 !== index && (
              <div
                key={`image-${index}`}
                className="flex justify-center items-center h-14 w-[calc(100%-100px)]"
              >
                <img
                  src={getRandomImageSource(usedImages)}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            ),
          ])}
        </div>
      );
    });
    setContent(<>{contentWithImages}</>);
  };

  const scheduleUpdate = () => {
    requestAnimationFrame(() => {
      if (Date.now() - lastUpdateTimeRef.current > refreshRate) {
        updateContent();
        lastUpdateTimeRef.current = Date.now();
      }
      scheduleUpdate();
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full h-max m-0 text-white font-gothic-720 text-6xl">
      {content}
    </div>
  );
};

export default Mozaic;
