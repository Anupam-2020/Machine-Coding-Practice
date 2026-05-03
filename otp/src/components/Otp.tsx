import React, { useEffect, useRef, useState } from "react";
import './styles.css';

const Otp = function() {
    const otp_length = 6;
    const [otp, setOtp] = useState<Array<string>>(new Array(otp_length).fill(""));
    const inputRef = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        inputRef.current[0]?.focus();
    },[])

    const changeHandler = (index: number, value: string) => {
        const newOpt = [...otp];
        newOpt[index] = value;

        setOtp(newOpt);

        if(index < otp_length - 1) {
            inputRef.current[index + 1]?.focus();
        }
    }

    const handleSubmit = function() {
        const finalOtp = otp.join("");
        if(finalOtp.length === otp_length)  alert(`OTP verified ${finalOtp}`);
        else alert('Enter OTP');
        handleClear();
    }

    const handleClear = function() {
        setOtp(new Array(otp_length).fill(""));
        inputRef.current[0]?.focus();
    }

    const keyDownHandler = function(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
        if(e.key === "ArrowLeft") {
            inputRef.current[index - 1]?.focus();
        }

        if (e.key === "Backspace") {
            e.preventDefault();

            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);

            if (index > 0) {
                inputRef.current[index - 1]?.focus();
            }
        }

        if(e.key === 'ArrowRight') {
            inputRef.current[index + 1]?.focus();
        }
    }

    return (
        <div>
            <h2>OTP Verification</h2>
            <h4>Enter {otp_length} digit otp sent to your phone.</h4>
            <div className='otp_container'>
            {otp.map((o: string, index: number) => {
                return (
                    <input 
                        ref={(e) => { inputRef.current[index] = e; }} 
                        type="text" value={o} 
                        key={index}
                        maxLength={1}
                        className="otp_input" 
                        onChange={(e) => changeHandler(index, e.target.value)}
                        onKeyDown={(e) => keyDownHandler(e, index)}
                    />
                )
            })}
            </div>
            <div>
                <button onClick={handleSubmit}>Verify OTP</button>
                <button onClick={handleClear}>Clear</button>
            </div>
        </div>
    )
}

export default Otp;