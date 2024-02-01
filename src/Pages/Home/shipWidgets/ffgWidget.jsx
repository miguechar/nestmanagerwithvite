import FFGjpg from "../../../assets/imgs/ffg.jpg";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Image,
  CardFooter,
} from "@nextui-org/react";

export const FFGWidget = () => {
  return (
    <div>
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-7">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            USS Constellation
          </p>
          <h4 className="text-white/90 font-medium text-xl">
            Guided Missile Frigate
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={FFGjpg}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black"
              src={FFGjpg}
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Guided Missile Frigate</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
