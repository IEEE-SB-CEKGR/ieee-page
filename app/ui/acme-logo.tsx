import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function AcmeLogo() {
  return (
    <div className={`flex flex-row items-center leading-none text-white`}>
      <GlobeAltIcon className="h-20 w-20 rotate-[15deg]" />
      <p className="text-[44px]">ADMIN</p>
    </div>
  );
}
