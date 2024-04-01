import { Icon } from '@iconify/react'
import React from 'react'
import { useRouter } from 'next/navigation';

const BackButton = () => {
    const router = useRouter();
    const handleGoBack = () => {
        router.back();
      };
  return (
    <span onClick={handleGoBack} className='flex align-items-center text-black cursor-pointer mb-2'><Icon icon="ic:round-arrow-back-ios"  fontSize={21}  className='flex align-items-center pt-1'/> Back</span>
  )
}

export default BackButton