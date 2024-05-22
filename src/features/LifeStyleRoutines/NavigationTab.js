import React, { useState } from 'react'
import NavigationAnalytics from './components/NavigationAnalytics'
import NavigationClock from './components/NavigationClock'
function NavigationTab() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className='w-full flex flex-row justify-around items-center'>
      <div className='flex flex-row justify-center items-center gap-2' onClick={() => {
        setSelectedIndex(0);
      }}>
        <NavigationClock isSelected={selectedIndex === 0 ? true : false} />
        <p className='text-[20px] capitalize' style={{ color: selectedIndex === 0 ? "#DDF988" : "#929292" }}>Routines</p>
      </div>
      <div className='flex flex-row justify-center items-center gap-2' onClick={() => {
        setSelectedIndex(1)
      }}>
        <NavigationAnalytics isSelected={selectedIndex === 1 ? true : false} />
        <p className='text-[20px] capitalize' style={{ color: selectedIndex === 1 ? "#DDF988" : "#929292" }}>Summary</p>
      </div>
    </div>
  )
}

export default NavigationTab