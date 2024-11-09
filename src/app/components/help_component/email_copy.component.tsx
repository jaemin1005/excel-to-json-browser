import { Button } from "@nextui-org/button";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";
export default function EmailCopy() {
  const [isToggled, setIsToggled] = useState(false);
  const email = "converterfast@gmail.com"; // 복사할 이메일 주소

  const handleToggle = async () => {
    await navigator.clipboard.writeText(email);
    setIsToggled(true);
  };

  return (
    <>
      <Button
        size="sm"
        variant="bordered"
        endContent={isToggled ? <FaCheck /> : <FaCopy />}
        onClick={handleToggle}
      >
        Email
      </Button>
    </>
  );
}
