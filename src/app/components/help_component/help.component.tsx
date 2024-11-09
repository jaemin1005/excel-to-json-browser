import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { IoMdHelp } from "react-icons/io";
import EmailCopy from "./email_copy.component";

export default function Help() {
  return (
    <div className="fixed left-4 bottom-4 z-50">
      <svg width="0" height="0">
        <defs>
          <linearGradient id="custom-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(17,134,163,1)" />
            <stop offset="100%" stopColor="rgba(160,171,177,1)" />
          </linearGradient>
        </defs>
      </svg>
      <Popover placement="right">
        <PopoverTrigger>
          <Button isIconOnly variant="faded" aria-label="Help">
            <IoMdHelp
              className="w-full h-full"
              style={{ fill: "url(#custom-gradient)" }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <p className="text-tiny max-w-60 text-justify">
              This page converts xlsx and csv files into JSON files, using the
              first row as keys and the subsequent rows as values. Nested
              objects are not supported.
            </p>
            <div className="flex flex-row-reverse">
              <div className="flex gap-x-2 items-center">
                <p className="text-tiny">For feedback</p>
                <EmailCopy />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
