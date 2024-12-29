import React from 'react';

const IngredientScreen = ({ response, setResponse }) => {
  return (
    <div className="fixed bottom-0 left-0 z-20 h-[100%] w-screen bg-black px-4">
      IngredientScreen
      {/* <InputText heading={'what time do you want to set for this meal'}   
      response={
                            Object.keys(response)?.length > 0 && response
                          }
                          setResponse={setResponse}
                          key={ques?.code}
                          inputType={ques?.inputType}
                          heading={ques?.content}
                          isRequired={ques?.isRequired}
                          screen={screen}
                          section={section}/> */}
    </div>
  );
};

export default IngredientScreen;
