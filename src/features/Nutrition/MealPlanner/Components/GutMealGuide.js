const GutMealGuide = ({ meal }) => {
  return (
    <div className="absolute z-30 flex h-full w-full">
      <div className="flex w-1/2 flex-col items-end ">
        <div className="mt-4 flex items-center ">
          <span className="rounded bg-yellow px-1 text-[10px] text-[rgba(0,0,0,0.80)]">
            25% Raw Veggiessdsdsd
          </span>{' '}
          <span className="w-[50px] border-b border-yellow"></span>
        </div>
        <div className="mt-9 flex items-center ">
          <span className="rounded bg-green px-1 text-[10px] text-[rgba(0,0,0,0.80)]">
            25% Cooked Veggies
          </span>{' '}
          <span className="w-[50px] border-b border-green"></span>
        </div>
      </div>
      <div className="flex w-1/2 flex-col ">
        <div className="mt-4 flex items-center ">
          <span className="w-[60px] border-b border-red"></span>
          <span className="rounded bg-red px-1 text-[10px] text-[rgba(0,0,0,0.80)]">
            25% Protien
          </span>{' '}
        </div>
        <div className="mt-9 flex items-center ">
          <span className="w-[70px] border-b border-blue"></span>
          <span className="rounded bg-blue px-1 text-[10px] text-[rgba(0,0,0,0.80)]">
            25% {meal === 'lunch' ? 'Fat' : 'Carbs'}
          </span>{' '}
        </div>
      </div>
    </div>
  );
};

export default GutMealGuide;
