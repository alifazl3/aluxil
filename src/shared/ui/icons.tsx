import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M4 10h12" />
      <path d="m11.5 5.5 4.5 4.5-4.5 4.5" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      {...props}
    >
      <path d="m10 2.5 7 4-7 4-7-4 7-4Z" />
      <path d="m3 10 7 4 7-4" />
      <path d="m3 13.5 7 4 7-4" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      {...props}
    >
      <path d="M10 2.5 11.8 8l5.7 2-5.7 2L10 17.5 8.2 12l-5.7-2 5.7-2L10 2.5Z" />
    </svg>
  );
}
