import AnimatedComponent from '../../components/AnimatedComponent';

const AerobicEquipment = ({
  aerobicDetail,
  setEquipmentSelected,
  equipmentSelected,
}) => {
  return (
    <AnimatedComponent className=" mt-[35px] px-[16px]">
      <h3 className="text-xl text-offwhite">Choose your Preferred equipment</h3>
      <div className="mt-[12px] flex flex-col gap-2 overflow-y-scroll">
        {aerobicDetail?.msg?.movement.map((item) => (
          <div
            className={`flex h-fit w-full items-center gap-[32px] rounded-xl bg-black-opacity-45 p-[8px] ${
              equipmentSelected === item.title && 'border border-custompurple'
            } `}
            onClick={() => {
              setEquipmentSelected(item.title);
            }}
          >
            <img src={item.gif} className="w-p[65px] h-[65px] rounded" />
            <div className="flex w-full justify-between">
              <h5 className="text-[20px]">{item.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </AnimatedComponent>
  );
};

export default AerobicEquipment;
