import React from 'react'

function NavigationAnalytics({isSelected}) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="analytics-01">
                <g id="elements">
                    <path id="Vector 4075" d="M7 17L7 13" stroke={isSelected ? "#DDF988" : "#929292"} stroke-width="2" stroke-linecap="round" />
                    <path id="Vector 4077" d="M12 17L12 7" stroke={isSelected ? "#DDF988" : "#929292"} stroke-width="2" stroke-linecap="round" />
                    <path id="Vector 4078" d="M17 17L17 11" stroke={isSelected ? "#DDF988" : "#929292"} stroke-width="2" stroke-linecap="round" />
                    <path id="Vector" d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke={isSelected ? "#DDF988" : "#929292"} stroke-width="2" stroke-linejoin="round" />
                </g>
            </g>
        </svg>

    )
}

export default NavigationAnalytics