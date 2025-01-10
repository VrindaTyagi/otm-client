import styled from 'styled-components';

export const StarterText = styled.div`
  color: var(--New-White, rgba(222.37, 222.37, 222.37, 0.5));
  /* H1 */
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: ${(props) =>
    props.fontSize !== undefined ? props.fontSize : '14px'};
  font-style: normal;

  line-height: 16px; /* 125% */
`;

export const handleBackFunc = ({
  section,
  setScreen,
  screen,
  showMealScreen,
  setShowMealScreen,
  setSection,
}) => {
  if (section === 'fitness' && screen > 1) {
    setScreen(screen - 1);
  }

  if (section === 'nutrition' && screen > 1) {
    if (showMealScreen) {
      setShowMealScreen(false);
    }
    if (!showMealScreen) {
      setScreen(screen - 1);
    }
  }
  if (section === 'nutrition' && screen === 1) {
    setSection('fitness');
    setScreen(4);
    // setSection('lifestyle');
    // setScreen(1);
  }

  if (section === 'lifestyle' && screen > 1) {
    setScreen(screen - 1);
  }
  if (section === 'lifestyle' && screen === 1) {
    setShowMealScreen(true);
    setSection('nutrition');
    setScreen(4);
  }
};

export const handleNextFunc = ({
  section,
  screen,
  setShowBMIScreen,
  setScreen,
  setSection,
  showMealScreen,
  setShowMealScreen,
  setLoading,
}) => {
  if (section === 'generalInformation' && screen === 1) {
    setShowBMIScreen(true);
    setSection('fitness');
  }
  if (section === 'fitness' && screen < 5) {
    setScreen(screen + 1);
  }
  if (section === 'fitness' && screen === 5) {
    // setShowFitnessInsightScreen(true);

    setSection('nutrition');
    setScreen(1);
  }
  if (section === 'nutrition' && screen < 4) {
    setScreen(screen + 1);
  }
  if (section === 'nutrition' && screen === 4) {
    if (!showMealScreen) {
      setShowMealScreen(true);
    }
    if (showMealScreen) {
      setShowMealScreen(false);

      setSection('lifestyle');
      setScreen(1);
    }
  }
  if (section === 'lifestyle' && screen < 2) {
    setScreen(screen + 1);
  }
  if (section === 'lifestyle' && screen === 2) {
    setLoading(true);
  }
};

export const proportionColor = ['#FA5757', '#7E87EF', '#5ECC7B', '#DDF988'];

export const mealResponse = {
  gut_opening: {
    heading: 'Gut Opening',
    img: '/assets/organic-food.svg',
  },
  brunch: {
    heading: 'Brunch',
    img: '/assets/bread.svg',
  },
  breakfast: {
    heading: 'Breakfast',
    img: '/assets/eggs.svg',
  },
  lunch: {
    heading: 'Lunch',
    img: '/assets/spaghetti.svg',
  },
  dinner: {
    heading: 'Dinner',
    img: '/assets/noodles.svg',
  },
  evening_snacks: {
    heading: 'Evening Snacks',
    img: '/assets/cookie.svg',
  },
};

export const mealproportion = [
  {
    id: 'gut_opening',
    portion: [
      {
        img: '/assets/food-gutopening.svg',
        mealProportion: {
          fruit: '50%',
          seeds: '50%',
        },
      },
    ],
  },
  {
    id: 'brunch',
    portion: [
      {
        img: '/assets/food-brunch.svg',
        mealProportion: {
          protein: '50%',
          rawVeggies: '25%',
          cookedVeggies: '25%',
        },
      },
    ],
  },
  {
    id: 'breakfast',
    portion: [
      {
        img: '/assets/food-breakfast.svg',
        mealProportion: {
          protein: '50%',

          rawVeggies: '25%',
          cookedVeggies: '25%',
        },
      },
    ],
  },
  {
    id: 'lunch',
    portion: [
      {
        img: '/assets/food-lunch.svg',
        mealProportion: {
          protein: '25%',
          carbs: '25%',
          rawVeggies: '25%',
          cookedVeggies: '25%',
        },
      },
      {
        img: '/assets/food-dinner.svg',
        mealProportion: {
          protein: '25%',
          fats: '25%',
          rawVeggies: '25%',
          cookedVeggies: '25%',
        },
      },
    ],
  },
  {
    id: 'evening_snacks',
    portion: [
      {
        img: '/assets/food-gutopening.svg',
        mealProportion: {
          fruit: '50%',
          seeds: '50%',
        },
      },
    ],
  },
  {
    id: 'dinner',
    portion: [
      {
        img: '/assets/food-lunch.svg',
        mealProportion: {
          protein: '25%',
          carbs: '25%',
          rawVeggies: '25%',
          cookedVeggies: '25%',
        },
      },
      {
        img: '/assets/food-dinner.svg',
        mealProportion: {
          protein: '25%',
          fats: '25%',
          rawVeggies: '25%',
          cookedVeggies: '25%',
        },
      },
    ],
  },
];

export const questionnaireData = [
  //Data to show heading and Background Color on different pages of questionnaire form
  {
    bg: 'bg-blue',
    border: 'border-blue',
    text: 'text-blue',
    heading: 'General Information',
    section: 'generalInformation',
    img: '/assets/weekly-checkin-intro-bg.svg',
    icon: '/assets/fitnessIcon.svg',
  },
  {
    bg: 'bg-blue',
    text: 'text-blue',
    border: 'border-blue',
    section: 'fitness',
    heading: 'Fitness',
    img: '/assets/weekly-checkin-intro-bg.svg',
    icon: '/assets/fitnessIcon.svg',
  },
  {
    bg: 'bg-green',
    text: 'text-green',
    border: 'border-green',
    section: 'nutrition',
    heading: 'Nutrition',
    img: '/assets/nutrition-bg.svg',
    icon: '/assets/rice-bowl.svg',
  },
  {
    bg: 'bg-yellow',
    text: 'text-yellow',
    border: 'border-yellow',
    section: 'lifestyle',
    heading: 'Lifestyle',
    img: '/assets/yellow-background.svg',
    icon: '/assets/calender-tick.svg',
  },
];

export const DummyData = [
  {
    content: 'Gender',
    inputType: 'singleChoice',
    code: 'onb1',
    rank: 1,
    screen: 1,
    target: 'GEN',
    section: 'generalInformation',
    options: [
      {
        id: 'male',
        value: 'Male',
      },
      {
        id: 'female',
        value: 'Female',
      },
    ],
    description: 'What is your gender?',
  },
  {
    content: 'Age',
    inputType: 'number',
    code: 'onb2',
    questionOrder: 2,
    rank: 2,
    screen: 1,
    target: 'GEN',
    section: 'generalInformation',
    description: 'What is your age?',
    isRequired: true,
  },
  {
    content: 'Weight',
    inputType: 'number',
    code: 'onb3',
    questionOrder: 3,
    rank: 3,
    screen: 1,
    target: 'GEN',
    section: 'generalInformation',
    description: 'How much do you weight?',
    isRequired: true,
  },
  {
    content: 'Height',
    inputType: 'number',
    code: 'onb4',
    questionOrder: 4,
    rank: 4,
    screen: 1,
    target: 'GEN',
    section: 'generalInformation',
    description: 'What is your height?',
    isRequired: true,
  },
  {
    content: 'Please select any dietary preferences that you have',
    inputType: 'multiChoiceAndOther',
    code: 'onb5',
    rank: 1,
    screen: 1,
    target: 'dietPref',
    section: 'nutrition',
    options: [
      {
        id: 'vegetarian',
        value: 'Vegetarian',
      },
      {
        id: 'non_vegetarian',
        value: 'Non-Vegetarian',
      },
      {
        id: 'dairy_free',
        value: 'Dairy Free',
      },
      {
        id: 'gluten_free',
        value: 'Gluten Free',
      },
      {
        id: 'soy_free',
        value: 'Soy Free',
      },
      {
        id: 'vegan',
        value: 'Vegan',
      },
    ],
    description: 'Pick as Many',
  },
  {
    content: 'Region',
    inputType: 'singleChoiceAndOther',
    code: 'onb6',
    rank: 1,
    screen: 2,
    target: 'dietRegion',
    section: 'nutrition',
    options: [
      {
        id: 'india',
        value: 'India',
      },
      {
        id: 'europe',
        value: 'Europe',
      },
      {
        id: 'north_america',
        value: 'North America',
      },
      {
        id: 'asia_pacific',
        value: 'Asia Pacific',
      },
      {
        id: 'middle_east',
        value: 'Middle East',
      },
    ],
    description:
      'Select your region to get a meal plan based on your local cuisine',
  },

  {
    content: 'I want to',
    inputType: 'singleChoice',
    code: 'onb7',
    rank: 2,
    screen: 3,
    target: 'planAim',
    section: 'nutrition',
    options: [
      {
        id: 'CUTTING',
        value: 'Lose weight',
      },
      {
        id: 'MAINTAIN',
        value: 'Maintain weight',
      },
      {
        id: 'BULKING',
        value: 'Build muscle',
      },
    ],
    description: 'What is your goal with this nutrition plan?',
  },
  {
    content: 'Bodyfat level',
    inputType: 'singleChoice',
    code: 'onb9',
    rank: 8,
    screen: 3,
    target: 'bodyfat',
    section: 'nutrition',
    options: [
      {
        id: 'low',
        value: 'Low',
      },
      {
        id: 'medium',
        value: 'Medium',
      },
      {
        id: 'high',
        value: 'High',
      },
      {
        id: 'not_sure',
        value: 'Not sure',
      },
    ],
    description: 'What ++is your bodyfat level?',
  },
  {
    content: 'Set a weight goal',
    inputType: 'singleChoice',
    code: 'onb11',
    rank: 10,
    screen: 3,
    target: 'weight_goal',
    section: 'nutrition',
    options: [
      {
        id: 'no_thanks',
        value: 'No, thanks',
      },
      {
        id: 'lets_do_it',
        value: "Let's do it",
      },
    ],
    description: '',
  },
  {
    content: 'Set target weight (in Kgs)',
    inputType: 'number',
    code: 'onb12',
    rank: 11,
    screen: 3,
    target: 'target_weight',
    section: 'nutrition',
    description: '',
    isRequired: false,
  },

  {
    content: 'Choose meal types you want to include in your day',
    description: 'Pick as many',
    inputType: 'nestedMultichoice',
    code: 'onb15',
    rank: 13,
    screen: 4,
    target: 'meals',
    section: 'nutrition',
    sectionDescription: 'Set up your menu',
    isRequired: false,
    options: [
      {
        id: 'gut_opening',
        value: 'Gut Opening Meal',
        modifications: [
          {
            content: 'When do you want to have this meal?',
            inputType: 'time',
            code: 'onb15-time',
            rank: 1,
            target: 'meals-time',
            section: 'nutrition',
            sectionDescription: 'Set up your menu',
            description: 'When do you want to have this meal?',
          },
          {
            content: 'Recomended meal proportion',
            inputType: 'singleChoice',
            code: 'onb15-proportions',
            rank: 2,
            target: 'meals-proportion',
            section: 'nutrition',
            sectionDescription: 'Set up your menu',
            description: 'Choose meal proportions',
            options: [
              {
                fruits: '50%',
                seeds: '50%',
              },
            ],
          },
          {
            content: 'Set a plate size for your Gut Opening Meal',
            inputType: 'singleChoice',
            code: 'onb15-plateSize',
            rank: 2,
            target: 'plateSize',
            section: 'nutrition',
            sectionDescription: 'Customize your portions',
            description: 'Set a plate size for your Gut Opening Meal',
            options: [
              {
                id: 'small_plate',
                value: 'Small plate',
              },
              {
                id: 'large_plate',
                value: 'Large plate',
              },
            ],
          },
          {
            content: 'Customise your ingredients',
            inputType: 'multiChoice',
            code: 'onb15-ingredients',
            rank: 2,
            section: 'nutrition',
            target: 'ingredients',
            // sectionDescription: "Customize your portions",
            description: "Uncheck ingredients you don't want in your meal",
            ingredients: [
              {
                type: 'Fruits',
                options: [
                  'Bananas',
                  'Apples',
                  'Oranges',
                  'Mangoes',
                  'Papayas',
                  'Pineapples',
                  'Grapes',
                  'Watermelons',
                  'Pears',
                  'Guava',
                  'Kiwi',
                  'Dates',
                ],
              },
              {
                type: 'Nuts and Seeds',
                options: [
                  'Almonds',
                  'Cashews',
                  'Walnuts',
                  'Pistachios',
                  'Chia Seeds',
                  'Flax Seeds',
                  'Pumpkin Seeds',
                  'Sunflower Seeds',
                  'Sesame Seeds',
                  'Hemp Seeds',
                  'Watermelons Seeds',
                  'Basil Seeds',
                  'Poppy Seeds',
                  'Cumin Seeds',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'brunch',
        value: 'Brunch',
        modifications: [
          {
            content: 'When do you want to have this meal?',
            inputType: 'time',
            code: 'onb15-time',
            rank: 1,
            target: 'meals-time',
            section: 'nutrition',
            sectionDescription: 'Set up your menu',
            description: 'When do you want to have this meal?',
          },
          {
            content: 'Recomended meal proportion',
            inputType: 'singleChoice',
            code: 'onb15-proportions',
            rank: 2,
            target: 'meals-proportion',
            section: 'nutrition',
            sectionDescription: 'Set up your menu',
            description: 'Choose meal proportions',
            options: [
              {
                protein: '50%',
                rawVeggie: '25%',
                cookedVeggies: '25%',
              },
            ],
          },
          {
            content: 'Set a plate size for your brunch',
            inputType: 'singleChoice',
            code: 'onb16',
            rank: 2,
            target: 'plateSize',
            section: 'nutrition',
            sectionDescription: 'Customize your portions',
            description: 'Set a plate size for your Brunch',
            options: [
              {
                id: 'small_plate',
                value: 'Small plate',
              },
              {
                id: 'large_plate',
                value: 'Large plate',
              },
            ],
          },
          {
            content: 'Customise your ingredients',
            inputType: 'multiChoice',
            code: 'onb15-ingredients',
            rank: 2,
            section: 'nutrition',
            target: 'ingredients',
            sectionDescription: 'Customize your portions',
            description: "Uncheck ingredients you don't want in your meal",
            ingredients: [
              {
                type: 'Raw Veggies',
                options: [
                  'Cucumber',
                  'Radish',
                  'Tomatoes',
                  'Carrots',
                  'Capsicum (Bell Peppers)',
                  'Snake Cucumber',
                  'Lettuce',
                  'Raw Spinach',
                  'Turnips',
                  'Beetroot',
                ],
              },
              {
                type: 'Cooked Veggies',
                options: [
                  'Potatoes',
                  'Okra',
                  'Bottle Gourd',
                  'Ridge Gourd',
                  'Eggplant',
                  'Cauliflower',
                  'Cooked Spinach',
                  'Pointed Gourd',
                  'Bitter Gourd',
                  'Fenugreek Leaves',
                ],
              },
              {
                type: 'Protein',
                options: [
                  'Paneer (Indian Cottage Cheese)',
                  'Dal',
                  'Chickpeas',
                  'Kidney Beans (Rajma)',
                  'Tofu (Soy Paneer)',
                  'Soya Chunks',
                  'Black Chickpeas (Kala Chana)',
                  'Chicken',
                  'Fish (such as Rohu, Salmon)',
                  'Prawns',
                  'Mutton',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'breakfast',
        value: 'Breakfast',
        modifications: [
          {
            content: 'When do you want to have this meal?',
            inputType: 'time',
            code: 'onb15-time',
            rank: 1,
            target: 'meals-time',
            section: 'nutrition',
            sectionDescription: 'Set up your menu',
            description: 'When do you want to have this meal?',
          },
          {
            content: 'Recomended meal proportion',
            inputType: 'singleChoice',
            code: 'onb15-proportions',
            rank: 2,
            target: 'meals-proportion',
            section: 'nutrition',
            sectionDescription: 'Set up your menu',
            description: 'Choose meal proportions',
            options: [
              {
                protein: '50%',
                rawVeggie: '25%',
                cookedVeggies: '25%',
              },
            ],
          },
          {
            content: 'Set a plate size for your breakfast',
            inputType: 'singleChoice',
            code: 'onb15-plateSize',
            rank: 2,
            target: 'plateSize',
            section: 'nutrition',
            sectionDescription: 'Customize your portions',
            description: 'Set a plate size for your Breakfast',
            options: [
              {
                id: 'small_plate',
                value: 'Small plate',
              },
              {
                id: 'large_plate',
                value: 'Large plate',
              },
            ],
          },
          {
            content: 'Customise your ingredients',
            inputType: 'multiChoice',
            code: 'onb15-ingredients',
            rank: 2,
            section: 'nutrition',
            target: 'ingredients',
            // sectionDescription: "Customize your portions",
            description: "Uncheck ingredients you don't want in your meal",
            ingredients: [
              {
                type: 'Raw Veggies',
                options: [
                  'Cucumber',
                  'Radish',
                  'Tomatoes',
                  'Carrots',
                  'Capsicum (Bell Peppers)',
                  'Snake Cucumber',
                  'Lettuce',
                  'Raw Spinach',
                  'Turnips',
                  'Beetroot',
                ],
              },
              {
                type: 'Cooked Veggies',
                options: [
                  'Potatoes',
                  'Okra',
                  'Bottle Gourd',
                  'Ridge Gourd',
                  'Eggplant',
                  'Cauliflower',
                  'Cooked Spinach',
                  'Pointed Gourd',
                  'Bitter Gourd',
                  'Fenugreek Leaves',
                ],
              },
              {
                type: 'Protein',
                options: [
                  'Paneer (Indian Cottage Cheese)',
                  'Dal',
                  'Chickpeas',
                  'Kidney Beans (Rajma)',
                  'Tofu (Soy Paneer)',
                  'Soya Chunks',
                  'Black Chickpeas (Kala Chana)',
                  'Chicken',
                  'Fish (such as Rohu, Salmon)',
                  'Prawns',
                  'Mutton',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'lunch',
        value: 'Lunch',
        modifications: [
          {
            content: 'When do you want to have this meal?',
            inputType: 'time',
            code: 'onb15-time',
            rank: 1,
            target: 'meals-time',
            section: 'nutrition',
            sectionDescription: 'Set up your menu',
            description: 'When do you want to have this meal?',
          },
          {
            content: 'Choose your preferred meal proportion',
            inputType: 'singleChoice',
            code: 'onb15-proportions',
            rank: 2,
            target: 'meals-proportion',
            section: 'nutrition',
            sectionDescription: 'Set up your menu',
            description: 'Choose meal proportions',
            options: [
              {
                protein: '25%',
                rawVeggie: '25%',
                cookedVeggies: '25%',
                carbs: '25%',
              },
              {
                protein: '25%',
                rawVeggie: '25%',
                cookedVeggies: '25%',
                curd: '25%',
              },
            ],
          },
          {
            content: 'Set a plate size for your lunch',
            inputType: 'singleChoice',
            code: 'onb15-plateSize',
            rank: 2,
            target: 'plateSize',
            section: 'nutrition',
            sectionDescription: 'Customize your portions',
            description: 'Set a plate size for your Lunch',
            options: [
              {
                id: 'small_plate',
                value: 'Small plate',
              },
              {
                id: 'large_plate',
                value: 'Large plate',
              },
            ],
          },
          {
            content: 'Customise your ingredients',
            inputType: 'multiChoice',
            code: 'onb15-ingredients',
            rank: 2,
            section: 'nutrition',
            target: 'ingredients',
            sectionDescription: 'Customize your portions',
            description: "Uncheck ingredients you don't want in your meal",
            ingredients: [
              {
                type: 'Raw Veggies',
                options: [
                  'Cucumber',
                  'Radish',
                  'Tomatoes',
                  'Carrots',
                  'Capsicum (Bell Peppers)',
                  'Snake Cucumber',
                  'Lettuce',
                  'Raw Spinach',
                  'Turnips',
                  'Beetroot',
                ],
              },
              {
                type: 'Cooked Veggies',
                options: [
                  'Potatoes',
                  'Okra',
                  'Bottle Gourd',
                  'Ridge Gourd',
                  'Eggplant',
                  'Cauliflower',
                  'Cooked Spinach',
                  'Pointed Gourd',
                  'Bitter Gourd',
                  'Fenugreek Leaves',
                ],
              },
              {
                type: 'Carbs',
                options: [
                  'Brown Rice',
                  'Tapioca Pearls (Sabudana)',
                  'Quinoa',
                  'Whole Wheat Chapati',
                  'Idli/Dosa (Fermented Rice and Lentil Cakes/Pancakes)',
                  'Sweet Potatoes',
                ],
              },
              {
                type: 'Protein',
                options: [
                  'Paneer (Indian Cottage Cheese)',
                  'Dal',
                  'Chickpeas',
                  'Kidney Beans (Rajma)',
                  'Tofu (Soy Paneer)',
                  'Soya Chunks',
                  'Black Chickpeas (Kala Chana)',
                  'Chicken',
                  'Fish (such as Rohu, Salmon)',
                  'Prawns',
                  'Mutton',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'evening_snacks',
        value: 'Evening Snack',
        modifications: [
          {
            content: 'When do you want to have this meal?',
            inputType: 'time',
            code: 'onb15-time',
            rank: 1,
            target: 'meals-time',
            section: 'nutrition',
            sectionDescription: 'Set up your menu',
            description: 'When do you want to have this meal?',
          },
          {
            content: 'Recomended meal proportion',
            inputType: 'singleChoice',
            code: 'onb15-proportions',
            rank: 2,
            target: 'meals-proportion',
            section: 'nutrition',
            sectionDescription: 'Set up your menu',
            description: 'Choose meal proportions',
            options: [
              {
                fruit: '50%',
                seeds: '50%',
              },
            ],
          },
          {
            content: 'Set a plate size for your evening snack',
            inputType: 'singleChoice',
            code: 'onb15-plateSize',
            rank: 2,
            target: 'plateSize',
            section: 'nutrition',
            sectionDescription: 'Customize your portions',
            description: 'Set a plate size for your Evening Snack',
            options: [
              {
                id: 'small_plate',
                value: 'Small plate',
              },
              {
                id: 'large_plate',
                value: 'Large plate',
              },
            ],
          },
          {
            content: 'Customise your ingredients',
            inputType: 'multiChoice',
            code: 'onb15-ingredients',
            rank: 2,
            section: 'nutrition',
            target: 'ingredients',
            sectionDescription: 'Customize your portions',
            description: "Uncheck ingredients you don't want in your meal",
            ingredients: [
              {
                type: 'Fruits',
                options: [
                  'Bananas',
                  'Apples',
                  'Oranges',
                  'Mangoes',
                  'Papayas',
                  'Pineapples',
                  'Grapes',
                  'Watermelons',
                  'Pears',
                  'Guava',
                  'Kiwi',
                  'Dates',
                ],
              },
              {
                type: 'Nuts and Seeds',
                options: [
                  'Almonds',
                  'Cashews',
                  'Walnuts',
                  'Pistachios',
                  'Chia Seeds',
                  'Flax Seeds',
                  'Pumpkin Seeds',
                  'Sunflower Seeds',
                  'Sesame Seeds',
                  'Hemp Seeds',
                  'Watermelons Seeds',
                  'Basil Seeds',
                  'Poppy Seeds',
                  'Cumin Seeds',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'dinner',
        value: 'Dinner',
        modifications: [
          {
            content: 'When do you want to have this meal?',
            inputType: 'time',
            code: 'onb15-time',
            rank: 1,
            target: 'meals-time',
            section: 'nutrition',
            sectionDescription: 'Set up your menu',
            description: 'When do you want to have this meal?',
          },
          {
            content: 'Choose your preferred meal proportion',
            inputType: 'singleChoice',
            code: 'onb15-proportions',
            rank: 2,
            target: 'meals-proportion',
            section: 'nutrition',
            sectionDescription: 'Set up your menu',
            description: 'Choose meal proportions',
            options: [
              {
                protein: '25%',
                rawVeggie: '25%',
                cookedVeggies: '25%',
                carbs: '25%',
              },
              {
                protein: '25%',
                rawVeggie: '25%',
                cookedVeggies: '25%',
                curd: '25%',
              },
            ],
          },
          {
            content: 'Set a plate size for your dinner',
            inputType: 'singleChoice',
            code: 'onb15-plateSize',
            rank: 2,
            target: 'plateSize',
            section: 'nutrition',
            // sectionDescription: "Customize your portions",
            description: 'Set a plate size for your Dinner',
            options: [
              {
                id: 'small_plate',
                value: 'Small plate',
              },
              {
                id: 'large_plate',
                value: 'Large plate',
              },
            ],
          },
          {
            content: 'Customise your ingredients',
            inputType: 'multiChoice',
            code: 'onb15-ingredients',
            rank: 2,
            section: 'nutrition',
            target: 'ingredients',
            // sectionDescription: "Customize your portions",
            description: "Uncheck ingredients you don't want in your meal",
            ingredients: [
              {
                type: 'Raw Veggies',
                options: [
                  'Cucumber',
                  'Radish',
                  'Tomatoes',
                  'Carrots',
                  'Capsicum (Bell Peppers)',
                  'Snake Cucumber',
                  'Lettuce',
                  'Raw Spinach',
                  'Turnips',
                  'Beetroot',
                ],
              },
              {
                type: 'Cooked Veggies',
                options: [
                  'Potatoes',
                  'Okra',
                  'Bottle Gourd',
                  'Ridge Gourd',
                  'Eggplant',
                  'Cauliflower',
                  'Cooked Spinach',
                  'Pointed Gourd',
                  'Bitter Gourd',
                  'Fenugreek Leaves',
                ],
              },
              {
                type: 'Protein',
                options: [
                  'Paneer (Indian Cottage Cheese)',
                  'Dal',
                  'Chickpeas',
                  'Kidney Beans (Rajma)',
                  'Tofu (Soy Paneer)',
                  'Soya Chunks',
                  'Black Chickpeas (Kala Chana)',
                  'Chicken',
                  'Fish (such as Rohu, Salmon)',
                  'Prawns',
                  'Mutton',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    content: 'How long have you been engaging in regular exercise?',
    inputType: 'singleChoice',
    code: 'onb16',
    rank: 1,
    screen: 1,
    target: 'fitness',
    section: 'fitness',
    sectionDescription: 'Experience with fitness and exercise ',
    description: 'How long have you been engaging in regular exercise?',
    options: [
      {
        id: 'LT1Y',
        value: 'Less than 6 months',
      },
      {
        id: '6M!Y',
        value: '6 months to 1 year',
      },
      {
        id: 'MT1Y',
        value: 'More than 1 year',
      },
    ],
  },
  {
    content:
      'How familiar are you with exercises involving weights or resistance training?',
    inputType: 'singleChoice',
    code: 'onb17',
    rank: 2,
    screen: 1,
    target: 'fitness',
    section: 'fitness',
    sectionDescription: 'Experience with fitness and exercise ',
    description: 'How familiar are you with strength training exercises?',
    options: [
      {
        id: 'NOVICE',
        value: 'Very new, need guidance',
      },
      {
        id: 'INTERMEDIATE',
        value: 'Some experience, comfortable with basic exercises',
      },
      {
        id: 'ADVANCED',
        value: 'Experienced, comfortable with advanced techniques',
      },
    ],
  },
  {
    content: 'How many times do you work out in a typical week?',
    description: '',
    inputType: 'singleChoice',
    code: 'onb18',
    rank: 1,
    screen: 2,
    target: 'fitness',
    section: 'fitness',
    sectionDescription: ' Consistency and Workout Frequency',
    options: [
      {
        id: '1-2',
        value: '1-2 times',
      },
      {
        id: '3-4',
        value: '3-4 times',
      },

      {
        id: 'gt_5',
        value: '5 or more times',
      },
    ],
    placeholder: '',
    isRequired: false,
  },
  {
    content:
      'How consistent have you been with your workout routine over the past 3 months?',
    inputType: 'singleChoice',
    code: 'onb19',
    questionOrder: 4,
    rank: 2,
    screen: 2,
    target: 'workout_consistency',
    section: 'fitness',
    sectionDescription: ' Consistency and Workout Frequency',
    options: [
      {
        id: 'NOT_CONSISTENT',
        value: 'Inconsistent, missed almost all workouts',
      },
      {
        id: 'SOMEWHAT_CONSISTENT',
        value: 'Fairly consistent, missed some workouts',
      },
      {
        id: 'VERY_CONSISTENT',
        value: 'Very consistent, rarely missed any workouts',
      },
    ],
    description: '',
  },
  {
    content:
      'Which of the following best describes your strength training ability?',
    inputType: 'singleChoice',
    code: 'onb20',
    rank: 1,
    screen: 3,
    target: 'fit_test',
    section: 'fitness',
    sectionDescription: 'Strength and Endurance Level',
    description: '',
    options: [
      {
        id: 'NOVICE',
        value: 'I can only manage bodyweight exercises or light weights',
      },
      {
        id: 'INTERMEDIATE',
        value:
          'I am comfortable with moderate weights and can complete multiple sets',
      },
      {
        id: 'ADVANCED',
        value:
          'I can handle challenging weights and train at higher intensities',
      },
    ],
  },
  {
    content:
      'How long can you sustain moderate-intensity cardio activities (e.g., jogging, cycling) without excessive fatigue?',
    inputType: 'singleChoice',
    code: 'onb21',
    rank: 2,
    screen: 3,
    target: 'fit_test',
    section: 'fitness',
    sectionDescription: 'Strength and Endurance Level',
    description: '',
    options: [
      {
        id: 'LT_10',
        value: 'Less than 10 minutes',
      },
      {
        id: '10_20',
        value: '10-20 minutes',
      },
      {
        id: 'GT_20',
        value: 'More than 20 minutes',
      },
    ],
  },
  {
    content: 'What equipment do you have access to?',
    inputType: 'singleChoiceAndOther',
    code: 'onb22',
    rank: 1,
    screen: 4,
    target: 'fit_test',
    section: 'fitness',
    sectionDescription: 'Equipment',
    description: '',
    options: [
      {
        id: 'NONE',
        value: 'No equipment',
      },
      {
        id: 'DUMBBELLS',
        value: 'Bands and Dumbbells',
      },
      {
        id: 'GYM',
        value: 'Full Gym Equipment',
      },
    ],
  },
  {
    content: 'Push ups',
    inputType: 'number',
    code: 'onb22-PUUP',
    rank: 2,
    screen: 5,
    target: 'fit_test',
    section: 'fitness',
    sectionDescription:
      'Take this quick fitness test for us to gauge your fitness levels perfectly',
    description: 'Push ups',
  },
  {
    content: 'Pull ups',
    inputType: 'number',
    code: 'onb23-PLUP',
    rank: 1,
    screen: 5,
    target: 'fit_test',
    section: 'fitness',
    sectionDescription:
      'Take this quick fitness test for us to gauge your fitness levels perfectly',
    description: 'pull ups',
  },
  {
    content: 'Burpees',
    inputType: 'number',
    code: 'onb24-BRP',
    rank: 4,
    screen: 5,
    target: 'fit_test',
    section: 'fitness',
    sectionDescription:
      'Take this quick fitness test for us to gauge your fitness levels perfectly',
    description: 'Burpees',
  },
  {
    content: 'Situps',
    inputType: 'number',
    code: 'onb25-BSU',
    rank: 5,
    screen: 5,
    target: 'fit_test',
    section: 'fitness',
    sectionDescription:
      'Take this quick fitness test for us to gauge your fitness levels perfectly',
    description: 'Situps',
  },
  {
    content: 'Squats',
    inputType: 'number',
    code: 'onb26-ASQ',
    rank: 3,
    screen: 5,
    target: 'fit_test',
    section: 'fitness',
    sectionDescription:
      'Take this quick fitness test for us to gauge your fitness levels perfectly',
    description: 'Squats',
  },
  {
    content: 'Can you take out 15 mins in your morning for sunlight viewing?',
    inputType: 'singleChoice',
    code: 'onb27',
    rank: 1,
    screen: 1,
    target: 'sunlight_viewing',
    section: 'lifestyle',
    description:
      'Can you take out 15 mins in your morning for sunlight viewing?',
    options: [
      {
        id: 'YES',
        value: 'Yes',
      },
      {
        id: 'NO',
        value: 'No',
      },
    ],
  },
  {
    content: 'Do you want to incorporate meditation in your schedule?',
    inputType: 'singleChoice',
    code: 'onb28',
    rank: 2,
    screen: 1,
    target: 'meditation',
    section: 'lifestyle',
    description: 'Do you want to incorporate meditation in your schedule?',
    options: [
      {
        id: 'YES',
        value: 'Yes',
      },
      {
        id: 'NO',
        value: 'No',
      },
    ],
  },
  {
    content: 'Which supplements are you comfortable taking?',
    inputType: 'multiChoice',
    code: 'onb29',
    rank: 3,
    screen: 1,
    target: 'supplements',
    section: 'lifestyle',
    description: 'Which supplements are you comfortable taking?',
    options: [
      {
        id: 'OMEGA3',
        value: 'Omega 3',
      },
      {
        id: ' MULTIVITAMIN',
        value: 'Multi vitamin',
      },
      {
        id: 'D3',
        value: 'D3',
      },
      {
        id: 'MAGNESIUM',
        value: 'Magnesium',
      },
    ],
  },
  {
    content: 'How long do you want your post-meal digestion walks to be?',
    inputType: 'singleChoice',
    code: 'onb30',
    rank: 1,
    screen: 2,
    target: 'digestion_walks',
    section: 'lifestyle',
    description: 'How long do you want your post-meal digestion walks to be?',
    options: [
      {
        id: '10',
        value: '10 minutes',
      },
      {
        id: '20',
        value: '20 minutes',
      },
      {
        id: '30',
        value: '30 minutes',
      },
    ],
  },
  {
    content: 'Do you want help with improving your sleep?',
    inputType: 'singleChoice',
    code: 'onb31',
    rank: 2,
    screen: 2,
    target: 'sleep',
    section: 'lifestyle',
    description: 'Do you want help with improving your sleep?',
    options: [
      {
        id: 'YES',
        value: 'Yes',
      },
      {
        id: 'NO',
        value: 'No',
      },
    ],
  },
  {
    content: 'Choose your preferred method of gut alkalisation',
    inputType: 'singleChoice',
    code: 'onb32',
    rank: 3,
    screen: 2,
    target: 'gut_alkalisation',
    section: 'lifestyle',
    description: 'Choose your preferred method of gut alkalisation',
    options: [
      {
        id: 'LEMON_WATER',
        value: 'Half lemon + water + salt',
      },
      {
        id: 'ACV',
        value: 'ACV with water',
      },
      {
        id: 'WATER_WITH_SPICES',
        value: 'Half lemon + water + salt + turmeric + black pepper',
      },
    ],
  },
];
