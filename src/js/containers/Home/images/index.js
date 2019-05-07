import React from 'react';

export const IconBtnCamera = props => (
  <svg {...props} width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect className="svg-fill" x="6" width="13" height="1" rx="0.5" fill="#F82462"/>
    <rect className="svg-stroke" x="0.5" y="2.5" width="24" height="18" rx="1.5" stroke="#F82462"/>
    <circle className="svg-stroke" cx="12.5" cy="11.5" r="6" stroke="#F82462"/>
  </svg>
);

export const IconBtnDrone = props => (
  <svg {...props} width="36" height="12" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="svg-stroke"
          d="M12.5 4.5H23.5M12.5 4.5V4.5C12.5 6.70914 14.2909 8.5 16.5 8.5H19.5C21.7091 8.5 23.5 6.70914 23.5 4.5V4.5M12.5 4.5H29H23.5M12.5 4.5H7"
          stroke="white"/>
    <path className="svg-stroke" d="M13.5 7.5C12.3333 8 10 9.6 10 12" stroke="white"/>
    <path className="svg-stroke" d="M22.5 7.5C23.6667 8 26 9.6 26 12" stroke="white"/>
    <path className="svg-stroke"
          d="M28.5 3.5H32.5V4.5C32.5 5.60457 31.6046 6.5 30.5 6.5C29.3954 6.5 28.5 5.60457 28.5 4.5V3.5Z" stroke="white"
          strokeLinecap="round" strokeLinejoin="round"/>
    <path className="svg-stroke"
          d="M3.5 3.5H7.5V4.5C7.5 5.60457 6.60457 6.5 5.5 6.5C4.39543 6.5 3.5 5.60457 3.5 4.5V3.5Z" stroke="white"
          strokeLinecap="round" strokeLinejoin="round"/>
    <rect className="svg-fill" x="30" y="1" width="1" height="2" fill="white"/>
    <rect className="svg-fill" x="25" width="11" height="1" rx="0.5" fill="white"/>
    <rect className="svg-fill" x="5" y="1" width="1" height="2" fill="white"/>
    <rect className="svg-fill" width="11" height="1" rx="0.5" fill="white"/>
  </svg>
);

export const IconBtnLight = props => (
  <svg {...props} width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="svg-stroke" d="M9 10.5V18.5M9 18.5L6 21.5M9 18.5L12 21.5" stroke="white"/>
    <path className="svg-stroke" d="M14.5 3.5L18.5 2.5M15.5 5.5H19.5M14.5 7.5L18.5 8.5" stroke="white"/>
    <path className="svg-stroke" d="M4 5.5C4 2.73858 6.23858 0.5 9 0.5H12V10.5H9C6.23858 10.5 4 8.26142 4 5.5Z"
          stroke="white"/>
    <path className="svg-stroke" d="M4.5 3.5H2C1.44772 3.5 1 3.94772 1 4.5V6.5C1 7.05228 1.44772 7.5 2 7.5H4.5"
          stroke="white"/>
  </svg>
);

export const IconLocation = props => (
  <svg {...props} width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="svg-stroke"
          d="M9.5 5.05556C9.5 5.63352 9.23211 6.45483 8.76861 7.41339C8.31353 8.35454 7.70195 9.36452 7.08315 10.2987C6.46552 11.2311 5.84695 12.0787 5.38232 12.6937C5.23839 12.8841 5.10941 13.0521 5 13.1931C4.89059 13.0521 4.76161 12.8841 4.61768 12.6937C4.15305 12.0787 3.53448 11.2311 2.91685 10.2987C2.29805 9.36452 1.68647 8.35454 1.23139 7.41339C0.767891 6.45483 0.5 5.63352 0.5 5.05556C0.5 2.53437 2.51991 0.5 5 0.5C7.48009 0.5 9.5 2.53437 9.5 5.05556Z"
          stroke="white" strokeOpacity="0.6"/>
    <path className="svg-stroke"
          d="M7.19321 5.05547C7.19321 6.288 6.20649 7.2777 5.0009 7.2777C3.79532 7.2777 2.80859 6.288 2.80859 5.05547C2.80859 3.82295 3.79532 2.83325 5.0009 2.83325C6.20649 2.83325 7.19321 3.82295 7.19321 5.05547Z"
          stroke="white" strokeOpacity="0.6"/>
  </svg>
);

export const IconSearch = props => (
  <svg {...props} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="svg-stroke"
          d="M8.629 8.5C9.32113 7.70387 9.74199 6.65253 9.74199 5.5C9.74199 3.01472 7.78503 1 5.371 1C2.95696 1 1 3.01472 1 5.5C1 7.98528 2.95696 10 5.371 10C6.66554 10 7.82864 9.42062 8.629 8.5ZM8.629 8.5L13 13"
          stroke="white" strokeOpacity="0.6"/>
  </svg>
);
