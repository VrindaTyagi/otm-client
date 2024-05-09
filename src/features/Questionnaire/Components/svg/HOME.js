import React from 'react'

function HOME({ isSelected }) {
    return (
        <svg width="65" height="52" viewBox="0 0 65 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4696 13.9471C15.218 13.4164 17.0731 13.131 18.9948 13.131C20.9937 13.131 22.9204 13.4397 24.7299 14.0121L28.1713 8.05149C28.2659 7.88766 28.2778 7.7795 28.2765 7.70356C28.2748 7.60621 28.2458 7.48045 28.1713 7.35136C28.0968 7.22227 28.0023 7.1343 27.9189 7.08415C27.8538 7.04502 27.7541 7.00129 27.565 7.00129L10.6722 7.00129C10.483 7.00129 10.3834 7.04502 10.3183 7.08415C10.2348 7.1343 10.1404 7.22226 10.0658 7.35136C9.99131 7.48045 9.96234 7.60621 9.96064 7.70356C9.95931 7.77951 9.97126 7.88766 10.0658 8.05149L13.4696 13.9471ZM7.25766 17.1902C2.83809 20.6681 0 26.0655 0 32.1258C0 34.0729 0.292973 35.9516 0.837241 37.7202H37.1524C37.6967 35.9516 37.9896 34.0729 37.9896 32.1258C37.9896 26.1434 35.224 20.8069 30.9015 17.3252L34.2346 11.5521C37.1989 6.41785 33.4935 0 27.565 0H10.6722C4.74361 0 1.03827 6.41786 4.00255 11.5521L7.25766 17.1902ZM34.1171 43.6218C33.2946 44.7021 32.3589 45.6916 31.3279 46.5727H6.66178C5.63069 45.6916 4.69505 44.7021 3.87254 43.6218H34.1171ZM35.1344 42.1464C35.7148 41.2137 36.2165 40.227 36.6304 39.1956H1.35925C1.77312 40.227 2.27485 41.2137 2.85518 42.1464H35.1344ZM18.9948 51.1206C15.172 51.1206 11.6129 49.9913 8.63294 48.048H29.3567C26.3768 49.9913 22.8177 51.1206 18.9948 51.1206Z" fill={isSelected ? "url(#paint0_linear_3089_6154)" : "#929292"} />
            <path d="M44.3051 41.8536C44.7673 46.9726 49.0843 50.9988 54.3203 50.9988C59.5562 50.9988 63.8732 46.9753 64.3354 41.8536C64.3653 41.5518 64.3789 41.2474 64.3789 40.9402L64.3789 9.27182C64.3843 8.04847 63.3757 7.00727 62.1171 7.00999C60.8584 7.00999 59.8498 8.04847 59.8552 9.27182C59.8552 15.4293 59.8552 35.1252 59.8552 40.9402C59.5562 48.2748 49.0925 48.2884 48.7853 40.9402C48.7771 40.2089 48.7907 35.5792 48.7853 34.9866C48.7853 31.7379 48.7853 16.756 48.7853 13.4801C48.7799 12.8902 48.7907 9.44037 48.7853 8.79064C48.7853 7.17039 50.1011 5.85461 51.7213 5.85461C53.3416 5.85461 54.6574 7.17039 54.6574 8.79064C54.6574 9.44037 54.6574 12.9364 54.6574 13.4801C54.6574 19.6431 54.6574 31.9581 54.6574 38.0232C54.6574 38.5506 54.6574 40.3937 54.6574 40.9375C54.6574 41.1223 54.5051 41.2746 54.3203 41.2746C54.1354 41.2746 53.9832 41.1223 53.9832 40.9375L53.9832 38.7001C53.9832 36.8814 53.9832 34.6304 53.9832 32.8117C53.9832 27.8422 53.9832 15.5272 53.9832 10.6583L53.9832 8.78792C53.9832 8.3448 53.8554 7.9343 53.6352 7.58361C52.7761 6.18355 50.672 6.1754 49.8075 7.58361C49.5873 7.93158 49.4595 8.3448 49.4595 8.78792L49.4595 10.6583C49.4541 11.2509 49.4622 13.3007 49.4595 13.839C49.4595 16.9245 49.4595 31.3546 49.4595 34.4211C49.4568 35.0436 49.4595 37.6317 49.4595 38.2923C49.4867 38.8958 49.3915 41.2746 49.5465 41.8509C49.976 44.0964 51.9524 45.7982 54.3203 45.7982C57.0143 45.8118 59.2001 43.5581 59.181 40.9375C59.181 34.905 59.181 15.1384 59.181 8.78792C59.2082 4.76175 55.8508 1.30648 51.7213 1.32823C48.0187 1.32823 44.9358 4.04134 44.3595 7.5836C44.2943 7.97508 44.2616 8.37742 44.2616 8.78792L44.2616 40.9375C44.2616 41.2447 44.2752 41.5518 44.3051 41.8509L44.3051 41.8536ZM46.1891 8.79064C46.4881 1.456 56.9518 1.44241 57.259 8.79064L57.259 13.7873C57.259 20.3662 57.259 34.5516 57.259 40.9402C57.1013 44.8277 51.5501 44.8413 51.3869 40.9402L51.3869 37.069C51.3869 29.158 51.3869 16.6826 51.3869 8.79064C51.3951 8.36383 52.0394 8.32849 52.0611 8.79064L52.0611 40.9402C52.0611 41.2664 52.1291 41.5763 52.2542 41.8536C53.0425 43.637 55.598 43.6451 56.3918 41.8536C56.5168 41.5736 56.5848 41.2637 56.5848 40.9402C56.5848 40.9402 56.5848 10.1798 56.5848 8.79064C56.5848 8.3747 56.5332 7.97235 56.4326 7.58632C55.1331 2.74187 48.3177 2.72827 47.0128 7.58632C46.9149 7.97235 46.8606 8.3747 46.8606 8.79064C46.8606 10.1853 46.7627 36.5416 46.9149 41.8536C48.3802 51.0695 61.4483 50.2784 61.78 40.9402C61.78 34.7337 61.78 15.6686 61.78 9.27182C61.7827 8.85045 62.4324 8.80423 62.4542 9.27182C62.4732 8.74442 62.4406 34.5543 62.4542 35.0273L62.4542 40.9375C62.4542 45.4231 58.8059 49.0713 54.3203 49.0713C49.8347 49.0713 46.1864 45.4231 46.1864 40.9375C46.1864 33.7034 46.1864 16.0492 46.1864 8.78792L46.1891 8.79064Z" fill={isSelected ? "url(#paint1_linear_3089_6154)" : "#929292"} />
            <defs>
                <linearGradient id="paint0_linear_3089_6154" x1="-0.08634" y1="18.3715" x2="38.8446" y2="21.148" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#D6B6F0" />
                    <stop offset="0.76" stop-color="#848CE9" />
                </linearGradient>
                <linearGradient id="paint1_linear_3089_6154" x1="57.1493" y1="1.21524" x2="45.6709" y2="49.6557" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#D6B6F0" />
                    <stop offset="0.76" stop-color="#848CE9" />
                </linearGradient>
            </defs>
        </svg>

    )
}

export default HOME