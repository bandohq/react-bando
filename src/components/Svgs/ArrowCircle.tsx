import { SVGAttributes } from 'react';
import { styled } from '@mui/material/styles';

const ArrowCircle = (props?: SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.5" y="0.5" width="25" height="25" rx="12.5" />
      <path d="M14.3645 8.42779L18.7808 12.7004C18.8265 12.7445 18.8626 12.7967 18.887 12.8542C18.9115 12.9116 18.9239 12.973 18.9236 13.035C18.9232 13.097 18.91 13.1583 18.8848 13.2154C18.8596 13.2725 18.8229 13.3244 18.7767 13.3679L14.3083 17.586C14.2151 17.6739 14.0892 17.7229 13.9582 17.7221C13.8273 17.7213 13.7019 17.6708 13.6099 17.5817C13.5178 17.4926 13.4665 17.3723 13.4673 17.2471C13.468 17.1219 13.5208 17.0022 13.614 16.9142L17.2353 13.4964L7.5675 13.4371C7.43659 13.4363 7.31134 13.3858 7.21932 13.2968C7.12729 13.2078 7.07602 13.0875 7.07679 12.9624C7.07756 12.8372 7.1303 12.7176 7.22341 12.6297C7.31652 12.5418 7.44237 12.4929 7.57328 12.4937L17.241 12.553L13.662 9.09098C13.5699 9.0019 13.5186 8.88153 13.5193 8.75635C13.5201 8.63118 13.5729 8.51145 13.666 8.42351C13.7592 8.33557 13.8851 8.28661 14.0161 8.28741C14.1471 8.28822 14.2724 8.33871 14.3645 8.42779Z" />
    </svg>
  );
};

const ArrowCircleIcon = styled(ArrowCircle)(({ theme }) => ({
  transform: 'rotate(90deg)',
  color: theme.palette.ink.i800,
  fontSize: 16,
  '& rect': {
    color: 'inherit',
    stroke: theme.palette.ink.i800,
  },
  '& path, & d': {
    color: 'inherit',
    fill: theme.palette.ink.i800,
  },
}));

export default ArrowCircleIcon;
