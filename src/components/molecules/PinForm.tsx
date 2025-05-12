import React from "react";
import { usePinLogic } from "../../config/usePinLogic";

const PinForm: React.FC = () => {
  const {
    otp,
    error,
    inputsRef,
    handleInput,
    handleKeyDown,
    handlePaste,
    handleSubmit,
  } = usePinLogic();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const pin = otp.join("");
          handleSubmit(pin);
        }}
      >
        <div className="flex items-center justify-center gap-9">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              className={`w-36 h-52 text-center text-6xl font-bold text-white bg-black border-2
                ${
                  error
                    ? "border-red-700 hover:border-red-700 focus:border-red-600"
                    : "border-slate-400 focus:border-white"
                } 
                 appearance-none rounded-3xl p-4 outline-none focus:scale-105 transition-all`}
              maxLength={1}
              value={value}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              onChange={(e) => handleInput(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
              onPaste={handlePaste}
              pattern="\d*"
            />
          ))}
        </div>
      </form>
      <div style={{ height: "20px", paddingTop: "20px" }}>
        {error && (
          <small className="text-lg font-medium text-red-700">{error}</small>
        )}
      </div>
    </div>
  );
};

export default PinForm;
