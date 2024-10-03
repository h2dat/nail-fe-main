import React from 'react';

const steps = [
    {'text': 'Services', type: 'service', 'final': false},
    {'text': 'Inventory ( Optional )', type: 'inventory', 'final': false},
    {'text': 'Staff', type: 'staff', 'final': false},
    {'text': 'Time', type: 'time', 'final': false},
    {'text': 'Infor', type: 'infor', 'final': false},
    {'text': 'Complete', type: 'complete', 'final': true},
]

function BookingStep({activeStep = 'service', setActiveStep}) {

    const setActiveStep2 = (value) => {
        if (value ==='complete' || activeStep === 'complete') return

        setActiveStep(value)
    }
    return (
        <div className={'flex justify-center items-center gap-3'}>
            {
                steps.map((step, index) => (
                    <div onClick={() => setActiveStep2(step.type)} className={'cursor-pointer flex gap-2 justify-center items-center'} key={index}>
                        <div
                            className={`${step.type === activeStep ? 'text-[#766E69]' : 'text-[#BDBDBD]'} font-semibold text-xl`}>{step.text}</div>
                        {!step.final &&
                            <svg width="45" height="47" viewBox="0 0 45 47" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M34.4166 30.3541L40.8333 23.4999L34.4166 16.6458L33.1205 18.0303L37.3243 22.5208H4.16663V24.4791H37.3243L33.1205 28.9695L34.4166 30.3541Z"
                                    fill={`${step.type === activeStep ? '#766E69' : '#BDBDBD'}`}/>
                            </svg>}
                    </div>
                ))
            }
        </div>
    );
}

export default BookingStep;
