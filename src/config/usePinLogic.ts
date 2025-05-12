import { useRef, useState } from "react";

export function usePinLogic() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleInput = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    setOtp(newOtp);
    if (newOtp.every((digit) => digit !== "")) {
      const pin = newOtp.join("");
      handleSubmit(pin);
    }
  };

  const handleSubmit = (pin: string) => {
    console.log(pin);
    if (pin == "1111") {
      setTimeout(() => {
        window.location.href = "/home";
      }, 70);
      setError(null);
    } else {
      setError("Pin wrong");
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "v") return;

    if (
      !/^[0-9]$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      e.key !== "Ctrl" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      setError(null);
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!/^\d{4}$/.test(text)) return;

    const newOtp = text.split("");
    setOtp(newOtp);
    inputsRef.current[3]?.focus();
    const pin = newOtp.join("");
    handleSubmit(pin);
  };

  return {
    otp,
    error,
    inputsRef,
    handleInput,
    handleKeyDown,
    handlePaste,
    handleSubmit,
  };
}
