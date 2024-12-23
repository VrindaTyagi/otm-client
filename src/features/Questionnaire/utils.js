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
        id: 'MALE',
        value: 'Male',
      },
      {
        id: 'FEMALE',
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
    content: 'Weight ( in kg )',
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
    content: 'Height ( in cm )',
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
    content: 'Dietary Preference',
    inputType: 'singleChoice',
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
        id: 'anything',
        value: 'Anything (no specific preference)',
      },
    ],
    description: 'Please select your dietary preferences',
  },
  {
    content: 'Region',
    inputType: 'singleChoice',
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
      'Please select the region based on which you identify your meals',
  },
  {
    content: 'What is your aim for this nutrition plan?',
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
        value: 'Maintain',
      },
      {
        id: 'BULKING',
        value: 'Build muscle',
      },
    ],
    description: 'Select an aim for your nutrition plan',
  },
  {
    content: 'Preferred Unit',
    inputType: 'singleChoice',
    code: 'onb8',
    rank: 8,
    screen: 3,
    target: 'unit',
    section: 'nutrition',
    options: [
      {
        id: 'metric',
        value: 'Metric',
      },
      {
        id: 'imperial',
        value: 'Imperial',
      },
    ],
    description: 'What is your preferred unit?',
  },
  {
    content: 'Bodyfat',
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
    description: 'What is your bodyfat level?',
  },
  {
    content: 'Activity level',
    inputType: 'singleChoice',
    code: 'onb10',
    rank: 9,
    screen: 3,
    target: 'activity_level',
    section: 'nutrition',
    options: [
      {
        id: 'SED',
        value: 'Sedentary (no exercise)',
      },
      {
        id: 'LIA',
        value: 'Lightly Active (1-2 days/week)',
      },
      {
        id: 'MOA',
        value: 'Moderately Active (3-5 days/week)',
      },
      {
        id: 'VEA',
        value: 'Very Active (6-7 days/week)',
      },
      {
        id: 'SUA',
        value: 'Super Active (2x per day)',
      },
    ],
    description: 'What is your activity level?',
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
    content: 'Target weight(in Kgs)',
    inputType: 'number',
    code: 'onb12',
    rank: 11,
    screen: 3,
    target: 'target_weight',
    section: 'nutrition',
    description: 'What is your target weight?',
    isRequired: false,
  },
  {
    content: 'Select Breakfast Ingredients',
    inputType: 'multichoice',
    code: 'onb13',
    rank: 11,
    screen: 3,
    target: 'breakfastIngredients',
    section: 'nutrition',
    description: 'Select your breakfast ingredients',
    isRequired: false,
    options: [
      {
        id: 'eggs',
        value: 'Eggs',
      },
      {
        id: 'oats',
        value: 'Oats',
      },
      {
        id: 'fruits',
        value: 'Fruits',
      },
      {
        id: 'nuts',
        value: 'Nuts',
      },
      {
        id: 'yogurt',
        value: 'Yogurt',
      },
      {
        id: 'smoothie',
        value: 'Smoothie',
      },
      {
        id: 'pancakes',
        value: 'Pancakes',
      },
      {
        id: 'toast',
        value: 'Toast',
      },
    ],
  },
  {
    content: 'Choose your raw veggies',
    inputType: 'multichoice',
    code: 'onb14',
    rank: 12,
    screen: 3,
    target: 'rawVeggies',
    section: 'nutrition',
    description: 'Choose your raw veggies',
    isRequired: false,
    options: [
      {
        id: 'carrots',
        value: 'Carrots',
      },
      {
        id: 'cucumber',
        value: 'Cucumber',
      },
      {
        id: 'bell_pepper',
        value: 'Bell Pepper',
      },
      {
        id: 'tomato',
        value: 'Tomato',
      },
      {
        id: 'lettuce',
        value: 'Lettuce',
      },
      {
        id: 'spinach',
        value: 'Spinach',
      },
      {
        id: 'kale',
        value: 'Kale',
      },
      {
        id: 'broccoli',
        value: 'Broccoli',
      },
    ],
  },
  {
    content: 'Choose your meals',
    inputType: 'multichoice',
    code: 'onb15',
    rank: 13,
    screen: 3,
    target: 'meals',
    section: 'nutrition',
    sectionDescription: 'Set up your menu',
    description: 'Choose your meals',
    isRequired: false,
    options: [
      {
        id: 'breakfast',
        value: 'Breakfast',
      },
      {
        id: 'lunch',
        value: 'Lunch',
      },
      {
        id: 'dinner',
        value: 'Dinner',
      },
      {
        id: 'snacks',
        value: 'Snacks',
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
    content: 'How familiar are you with strength training exercises?',
    inputType: 'singleChoice',
    code: 'onb17',
    rank: 1,
    screen: 2,
    target: 'fitness',
    section: 'fitness',
    sectionDescription: 'Experience with fitness and exercise ',
    description: 'How familiar are you with strength training exercises?',
    options: [
      {
        id: 'NOVICE',
        value: 'Novice',
      },
      {
        id: 'INTERMEDIATE',
        value: 'Intermediate',
      },
      {
        id: 'ADVANCED',
        value: 'Advanced',
      },
    ],
  },
  {
    content:
      'On average, how many days a week do you engage in physical activity?',
    description: '',
    inputType: 'singleChoice',
    code: 'onb18',
    rank: 1,
    screen: 1,
    target: 'fitness',
    section: 'fitness',
    sectionDescription: ' Consistency and Workout Frequency',
    options: [
      {
        id: '0',
        value: '0 days',
      },
      {
        id: '1-2',
        value: '1-2 days',
      },
      {
        id: '3-4',
        value: '3-4 days',
      },
      {
        id: '5-6',
        value: '5-6 days',
      },
      {
        id: 'gt_6',
        value: 'More than 6',
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
    rank: 1,
    screen: 3,
    target: 'workout_consistency',
    section: 'fitness',
    sectionDescription: ' Consistency and Workout Frequency',
    options: [
      {
        id: 'NOT_CONSISTENT',
        value: 'Not consistent',
      },
      {
        id: 'SOMEWHAT_CONSISTENT',
        value: 'Somewhat consistent',
      },
      {
        id: 'VERY_CONSISTENT',
        value: 'Very consistent',
      },
    ],
    description:
      'How consistent have you been with your workout routine over the past 3 months?',
  },
  {
    content:
      'Which of the following best describes your strength training ability?',
    inputType: 'singleChoice',
    code: 'onb20',
    rank: 1,
    screen: 4,
    target: 'fit_test',
    section: 'fitness',
    sectionDescription: 'Strength and Endurance Level',
    description:
      'Which of the following best describes your strength training ability?',
    options: [
      {
        id: 'NOVICE',
        value: 'Novice',
      },
      {
        id: 'INTERMEDIATE',
        value: 'Intermediate',
      },
      {
        id: 'ADVANCED',
        value: 'Advanced',
      },
    ],
  },
  {
    content:
      'How long can you sustain moderate-intensity cardio activities (e.g., jogging, cycling) without excessive fatigue?',
    inputType: 'singleChoice',
    code: 'onb21',
    rank: 2,
    screen: 4,
    target: 'fit_test',
    section: 'fitness',
    sectionDescription: 'Strength and Endurance Level',
    description:
      'How long can you sustain moderate-intensity cardio activities (e.g., jogging, cycling) without excessive fatigue?',
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
        id: '20_30',
        value: '20-30 minutes',
      },
      {
        id: 'GT_30',
        value: 'More than 30 minutes',
      },
    ],
  },
  {
    content: 'What equipment do you have access to for your workouts?',
    inputType: 'multichoice',
    code: 'onb22',
    rank: 3,
    screen: 4,
    target: 'fit_test',
    section: 'fitness',
    sectionDescription: 'equipment',
    description: 'What equipment do you have access to for your workouts?',
    options: [
      {
        id: 'NONE',
        value: 'None',
      },
      {
        id: 'DUMBBELLS',
        value: 'Dumbbells',
      },
      {
        id: 'BARBELL',
        value: 'Barbell',
      },
    ],
  },
  {
    content: 'Push ups',
    inputType: 'number',
    code: 'onb22-PUUP',
    rank: 1,
    screen: 4,
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
    rank: 2,
    screen: 4,
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
    screen: 4,
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
    screen: 4,
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
    screen: 4,
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
    screen: 5,
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
    screen: 5,
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
    inputType: 'multichoice',
    code: 'onb29',
    rank: 3,
    screen: 5,
    target: 'supplements',
    section: 'lifestyle',
    description: 'Which supplements are you comfortable taking?',
    options: [
      {
        id: 'PROTEIN',
        value: 'Protein',
      },
      {
        id: 'BCAA',
        value: 'BCAA',
      },
      {
        id: 'CREATINE',
        value: 'Creatine',
      },
      {
        id: 'FISH_OIL',
        value: 'Fish Oil',
      },
      {
        id: 'MULTIVITAMIN',
        value: 'Multivitamin',
      },
    ],
  },
  {
    content: 'How long do you want your post-meal digestion walks to be?',
    inputType: 'singleChoice',
    code: 'onb30',
    rank: 4,
    screen: 5,
    target: 'digestion_walks',
    section: 'lifestyle',
    description: 'How long do you want your post-meal digestion walks to be?',
    options: [
      {
        id: '5',
        value: '5 minutes',
      },
      {
        id: '10',
        value: '10 minutes',
      },
      {
        id: '15',
        value: '15 minutes',
      },
      {
        id: '20',
        value: '20 minutes',
      },
    ],
  },
  {
    content: 'Do you want help with improving your sleep?',
    inputType: 'singleChoice',
    code: 'onb31',
    rank: 5,
    screen: 5,
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
    rank: 6,
    screen: 5,
    target: 'gut_alkalisation',
    section: 'lifestyle',
    description: 'Choose your preferred method of gut alkalisation',
    options: [
      {
        id: 'LEMON_WATER',
        value: 'Lemon Water',
      },
      {
        id: 'ACV',
        value: 'Apple Cider Vinegar',
      },
      {
        id: 'BICARBONATE',
        value: 'Bicarbonate',
      },
    ],
  },
];
