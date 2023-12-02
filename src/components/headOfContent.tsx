import Link from "next/link";
import React from "react";

interface HeadOfContentProps {
  contentName: string;
  navigateTo: string;
  isProductsPage: boolean;
}

export default function HeadOfContent({
  contentName,
  navigateTo,
  isProductsPage,
}: HeadOfContentProps) {
  return (
    <div className="w-full flex justify-between items-center p-4 bg-neutral-200 py-2">
      <h3 className="font-bold text-2xl">{contentName}</h3>
      <div className="flex gap-3 items-center">
        {isProductsPage && (
          <Link
            href="/categories"
            className="btn btn-outlined bg-[#ECEDEE]  hover:border-2 border-slate-500 "
          >
            <svg
              width="21px"
              height="21px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
              stroke-width="1.5"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM8.85826 11.375L11.0206 13.4601C11.3188 13.7476 11.3274 14.2224 11.0399 14.5206C10.7524 14.8188 10.2776 14.8274 9.9794 14.5399L6.48037 11.1658C6.33837 11.0294 6.25 10.8375 6.25 10.625C6.25 10.4223 6.33044 10.2383 6.46114 10.1033L9.96045 6.47905C10.2482 6.18107 10.723 6.17274 11.0209 6.46045C11.3189 6.74816 11.3273 7.22296 11.0396 7.52095L8.76667 9.875H14.2V10.625C14.2 9.875 14.2004 9.875 14.2008 9.875L14.2017 9.875L14.2037 9.87501L14.2084 9.87504L14.221 9.8752C14.2307 9.87537 14.2432 9.87567 14.2582 9.87621C14.2882 9.87728 14.3285 9.87929 14.3775 9.88305C14.4755 9.89054 14.61 9.90511 14.7693 9.93355C15.0847 9.98986 15.5153 10.1038 15.9542 10.3389C16.3969 10.5761 16.8548 10.9407 17.1993 11.4944C17.5452 12.0503 17.75 12.7539 17.75 13.625C17.75 15.565 16.9211 16.6576 15.9871 17.2205C15.5443 17.4873 15.1075 17.6178 14.7852 17.6826C14.6227 17.7152 14.4852 17.732 14.3846 17.7406C14.3342 17.745 14.2927 17.7473 14.2616 17.7486C14.246 17.7492 14.2329 17.7496 14.2226 17.7498L14.2092 17.75L14.2041 17.75L14.2019 17.75L14.2009 17.75C14.2005 17.75 14.2 17.75 14.2 17V17.75H13.4C12.9858 17.75 12.65 17.4142 12.65 17C12.65 16.5858 12.9858 16.25 13.4 16.25H14.1946L14.2013 16.2498C14.2112 16.2494 14.2298 16.2484 14.256 16.2462C14.3085 16.2416 14.3898 16.2321 14.4898 16.212C14.6925 16.1712 14.9557 16.0908 15.2129 15.9358C15.6789 15.6549 16.25 15.06 16.25 13.625C16.25 12.9961 16.1048 12.5747 15.9257 12.2869C15.7452 11.9968 15.5031 11.7989 15.2458 11.6611C14.9847 11.5212 14.7153 11.4476 14.5057 11.4102C14.4025 11.3918 14.3183 11.3829 14.2631 11.3787C14.2356 11.3766 14.2157 11.3756 14.2047 11.3753L14.1958 11.375H8.85826Z"
                fill="#000000"
              ></path>
            </svg>
            Categories
          </Link>
        )}

        <Link href={navigateTo}>
          <span className="text-3xl text-[#063970] pr-2 ">+</span>
        </Link>
      </div>
    </div>
  );
}
