// ============ EDIT YOUR CONTENT HERE ============
export const BRAND = {
  name: 'TrainXShiv',
  email: 'trainxshiv@gmail.com',
  phone: '7080263878',
  whatsapp: '917080263878',
  instagram: 'https://www.instagram.com/trainxshiv/',
  city: 'Lucknow, Uttar Pradesh',
};

export const NAV = [
  ['Home', '/'],
  ['About Trainers', '/trainers'],
  ['Programs', '/programs'],
  ['Transformations', '/transformations'],
  ['Diet Plans', '/diet-plans'],
  ['Pricing', '/pricing'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
];

export const PROGRAMS = [
  { id: 'fat-loss', cat: 'Fat Loss', icon: 'Flame', title: 'Fat Loss Program', tag: 'Burn fat, get lean and build sustainable healthy habits.', weeks: '8–24 Weeks', level: 'All Levels', img: '/images/fat-loss.jpg', from: 1999, features: ['Customized workout plan', 'Personalized diet plan', 'Progress tracking', 'Expert guidance'] },
  { id: 'weight-gain', cat: 'Weight Gain', icon: 'Dumbbell', title: 'Weight Gain Program', tag: 'Gain healthy weight with structured training and nutrition.', weeks: '12–24 Weeks', level: 'Beginner–Advanced', img: '/images/weight-gain.jpg', from: 1999, features: ['Customized workout plan', 'Personalized diet plan', 'Progress tracking', 'Expert guidance'] },
  { id: 'muscle', cat: 'Muscle Building', icon: 'Trophy', title: 'Muscle Building Program', tag: 'Build lean muscle, strength and a stronger physique.', weeks: '12+ Weeks', level: 'Intermediate+', img: '/images/muscle.jpg', from: 2499, features: ['Customized workout plan', 'Personalized diet plan', 'Progress tracking', 'Expert guidance'] },
  { id: 'toning', cat: 'Fitness & Toning', icon: 'Activity', title: 'Fitness & Toning', tag: 'Improve overall fitness, shape your body and get stronger.', weeks: '8–24 Weeks', level: 'All Levels', img: '/images/toning.jpg', from: 1999, features: ['Customized workout plan', 'Personalized diet plan', 'Progress tracking', 'Expert guidance'] },
  { id: 'personal', cat: 'Personal Training', icon: 'Users', title: 'Personal Training', tag: 'One-to-one coaching with complete guidance.', weeks: 'Flexible Duration', level: 'All Levels', img: '/images/personal.jpg', from: 4999, features: ['Customized workout plan', 'Personalized diet plan', 'Progress tracking', 'Expert guidance'] },
  { id: 'online', cat: 'Online Training', icon: 'Laptop', title: 'Online Coaching', tag: 'Train from anywhere with expert guidance and weekly check-ins.', weeks: 'Flexible', level: 'All Levels', img: '/images/online.jpg', from: 1999, features: ['Workout plan in your app', 'Chat support', 'Weekly check-ins', 'Video tutorials'] },
  { id: 'diet', cat: 'Diet & Nutrition', icon: 'Utensils', title: 'Diet & Nutrition Plan', tag: 'Personalized meal plans for your goals and lifestyle.', weeks: '4–24 Weeks', level: 'All Levels', img: '/images/diet.jpg', from: 999, features: ['Customized diet plan', 'Vegetarian & non-vegetarian', 'Easy & sustainable diet', 'Nutrition tracking'] },
];

export const PLANS = [
  { id: 'online', name: 'Online Coaching', price: 1999, duration: 'Flexible', workout: true, diet: true, support: 'Chat Support', tracking: true, icon: 'Laptop' },
  { id: 'personal', name: 'Personal Training', price: 4999, duration: '8–24 Weeks', workout: true, diet: true, support: '1-on-1 Support', tracking: true, icon: 'Users' },
  { id: 'diet', name: 'Diet Plan', price: 999, duration: '4–24 Weeks', workout: false, diet: true, support: 'Chat Support', tracking: false, icon: 'Utensils' },
  { id: 'complete', name: 'Complete Transformation', price: 6999, duration: '12–24 Weeks', workout: true, diet: true, support: 'Priority Support', tracking: true, icon: 'Crown', popular: true },
];

export const PAID_DIETS = [
  { id: 'starter', name: 'Starter Diet Plan', price: 999, weeks: '4 Weeks', items: ['Custom calorie & macro targets', 'Veg / non-veg meal plan', 'Grocery list', 'One plan revision'] },
  { id: 'pro', name: 'Pro Diet Plan', price: 1999, weeks: '12 Weeks', popular: true, items: ['Everything in Starter', 'Weekly plan updates', 'Chat support with coach', 'Supplement guidance', 'Festival & travel diet tips'] },
  { id: 'elite', name: 'Elite Diet + Coaching', price: 3499, weeks: '24 Weeks', items: ['Everything in Pro', 'Workout plan included', 'Weekly video check-ins', 'Priority WhatsApp support'] },
];

export const HEAD_TRAINER = {
  id: 1,
  name: 'Shivan',
  badge: 'HEAD TRAINER & FOUNDER',
  role: 'HEAD TRAINER & FOUNDER',
  tags: ['Head Coach', 'Founder', 'Master Trainer'],
  img: '/images/trainers/shivan_hero.png',
  featured: true,
  bio: 'Helping people build a stronger, healthier and more confident version of themselves.',
  socials: {
    instagram: 'https://www.instagram.com/trainxshiv/',
    youtube: 'https://www.youtube.com/@trainxshiv',
    whatsapp: 'https://wa.me/917080263878?text=Hi%20Shivan,%20I%20want%20to%20start%20my%20fitness%20transformation',
    email: 'mailto:trainxshiv@gmail.com',
  },
};

export const TEAM_TRAINERS = [
  {
    id: 2,
    name: 'Rahul Sharma',
    badge: 'STRENGTH TRAINER',
    badgeIcon: 'Dumbbell',
    role: 'STRENGTH & CONDITIONING',
    tags: ['Strength Training', 'Conditioning', 'Endurance'],
    img: '/images/trainers/rahul.png',
    bio: 'Build strength, improve endurance and become your best self.',
    socials: {
      instagram: 'https://www.instagram.com/trainxshiv/',
      whatsapp: 'https://wa.me/917080263878?text=Hi%20Rahul,%20I%20am%20interested%20in%20Strength%20%26%20Conditioning%20training',
      email: 'mailto:trainxshiv@gmail.com',
    },
  },
  {
    id: 3,
    name: 'Priya Singh',
    badge: 'FEMALE TRAINER',
    badgeIcon: 'User',
    role: 'WEIGHT LOSS & WOMEN FITNESS',
    tags: ['Weight Loss', 'Women Fitness', 'Body Toning'],
    img: '/images/trainers/priya.png',
    bio: "Specialized in weight loss, toning and women's fitness programs.",
    socials: {
      instagram: 'https://www.instagram.com/trainxshiv/',
      whatsapp: 'https://wa.me/917080263878?text=Hi%20Priya,%20I%20am%20interested%20in%20Weight%20Loss%20%26%20Women%20Fitness%20training',
      email: 'mailto:trainxshiv@gmail.com',
    },
  },
  {
    id: 4,
    name: 'Aman Verma',
    badge: 'NUTRITION EXPERT',
    badgeIcon: 'Utensils',
    role: 'NUTRITION & DIET PLANS',
    tags: ['Diet Planning', 'Nutrition', 'Meal Prep'],
    img: '/images/trainers/aman.png',
    bio: 'Customized diet plans for a healthier and stronger you.',
    socials: {
      instagram: 'https://www.instagram.com/trainxshiv/',
      whatsapp: 'https://wa.me/917080263878?text=Hi%20Aman,%20I%20need%20a%20customized%20Nutrition%20%26%20Diet%20plan',
      email: 'mailto:trainxshiv@gmail.com',
    },
  },
];

export const TRAINERS = [HEAD_TRAINER, ...TEAM_TRAINERS];

// Real transformations with genuine Before & After photos
export const TRANSFORMS = [
  { id: 1, name: 'Amit Kumar', goal: 'Fat Loss & Abs', type: 'fat', result: '-12 KG', period: 'in 4 Months', image: '/images/transformations/amit_ba.png' },
  { id: 2, name: 'Sneha Verma', goal: 'Fat Loss & Inch Loss', type: 'fat', result: '-10 KG', period: 'in 3 Months', image: '/images/transformations/ba_1.png' },
  { id: 3, name: 'Rahul Mehta', goal: 'Muscle Building', type: 'muscle', result: '+8 KG', period: 'in 5 Months', image: '/images/transformations/ba_2.png' },
  { id: 4, name: 'Vikas Yadav', goal: 'Fat Loss & Toning', type: 'fat', result: '-14 KG', period: 'in 6 Months', image: '/images/transformations/ba_3.png' },
  { id: 5, name: 'Arjun Singh', goal: 'Lean Bulking', type: 'muscle', result: '+9 KG', period: 'in 5 Months', image: '/images/transformations/ba_4.jpg' },
  { id: 6, name: 'Karan Gupta', goal: 'Weight Loss & Definition', type: 'fat', result: '-11 KG', period: 'in 4 Months', image: '/images/transformations/ba_5.jpg' },
  { id: 7, name: 'Pooja Sharma', goal: 'Postpartum Fat Loss', type: 'fat', result: '-13 KG', period: 'in 5 Months', image: '/images/transformations/ba_6.jpg' },
  { id: 8, name: 'Rohan Deshmukh', goal: 'Athletic Conditioning', type: 'muscle', result: '+7 KG', period: 'in 4 Months', image: '/images/transformations/ba_7.jpg' },
  { id: 9, name: 'Deepak Joshi', goal: 'Body Recomposition', type: 'gain', result: '+8 KG', period: 'in 5 Months', image: '/images/transformations/ba_8.png' },
];

// Video reviews
export const VIDEO_REVIEWS = [
  { id: 1, name: 'Amit Kumar', result: 'Lost 12 KG in 4 months', poster: '/images/transformations/amit_video_poster.png', video: '/videos/review1.mp4', youtube: '' },
  { id: 2, name: 'Sneha Verma', result: 'Lost 10 KG in 3 months', poster: '/images/transformations/ba_1.png', video: '/videos/review2.mp4', youtube: '' },
  { id: 3, name: 'Rahul Mehta', result: 'Gained 8 KG lean mass', poster: '/images/transformations/ba_2.png', video: '/videos/review3.mp4', youtube: '' },
  { id: 4, name: 'Vikas Yadav', result: 'Lost 14 KG in 6 months', poster: '/images/transformations/ba_3.png', video: '/videos/review4.mp4', youtube: '' },
];

export const TESTIMONIALS = [
  { name: 'Amit Kumar', text: 'TrainXShiv changed my lifestyle completely. Lost 12 kg in 4 months and now I feel more confident and energetic.', img: '/images/transformations/amit_avatar.png' },
  { name: 'Sneha Verma', text: 'The diet plan and training were super easy to follow. Amazing support and guidance throughout my journey.', img: '/images/transformations/ba_1.png' },
  { name: 'Rahul Mehta', text: 'Professional, knowledgeable and always motivating. Best fitness coaching experience ever!', img: '/images/transformations/ba_2.png' },
];

export const STEPS = [
  { icon: 'MessageSquare', t: 'Consultation', d: 'Discuss your goals and current status.' },
  { icon: 'Target', t: 'Personalized Plan', d: 'Get a customized workout & diet plan.' },
  { icon: 'Dumbbell', t: 'Training & Support', d: 'Continuous guidance and progress tracking.' },
  { icon: 'BarChart3', t: 'Results & Progress', d: 'A stronger, healthier and more confident you.' },
];

export const BLOG = [
  { id: 1, cat: 'Fat Loss', title: '5 Habits That Make Fat Loss Actually Last', read: '4 min', body: ['Fat loss is not about a 30-day crash diet. It is about habits you can repeat on a busy Tuesday. Start with a modest calorie deficit, 8,000 to 10,000 steps a day and a protein source in every meal.', 'Sleep 7 to 8 hours, drink enough water and weigh yourself at the same time each week. Judge progress by the weekly average, not by one day on the scale.'] },
  { id: 2, cat: 'Nutrition', title: 'Indian Diet for Muscle Gain: Simple and Budget Friendly', read: '5 min', body: ['You do not need expensive imported food to build muscle. Dal, paneer, curd, eggs, soya, chana, milk and rice cover most needs when portions are planned.', 'Aim for around 1.6 to 2 g of protein per kg of body weight, spread across 4 to 5 meals, and eat a little above your maintenance calories.'] },
  { id: 3, cat: 'Workout', title: 'Home Workout Plan: No Equipment Needed', read: '3 min', body: ['Push-ups, squats, lunges, planks and glute bridges can build a strong base at home. Train 4 days a week and add reps or slow down the tempo each week.', 'Progressive overload still applies at home. If a set feels easy, make the movement harder instead of just doing more of it.'] },
  { id: 4, cat: 'Mindset', title: 'Why Motivation Fails and Discipline Wins', read: '3 min', body: ['Motivation comes and goes. A system carries you through the days you do not feel like training. Lay out your clothes, book your slots and track every session.', 'Aim to never miss twice. One skipped workout is a blip, two in a row starts a new habit.'] },
  { id: 5, cat: 'Nutrition', title: 'Protein Sources: Veg vs Non-Veg Guide', read: '4 min', body: ['Eggs, chicken and fish are dense in protein. Paneer, tofu, soya chunks, lentils and Greek curd are strong vegetarian options.', 'Mix sources through the day. If you struggle to hit your target, a whey or plant protein shake is a convenient top-up, not a replacement for meals.'] },
  { id: 6, cat: 'Workout', title: 'Beginner Gym Split: Your First 12 Weeks', read: '5 min', body: ['A 3-day full body split is ideal for beginners. Focus on squat, hinge, push, pull and carry patterns with good form before adding weight.', 'Add a small amount of weight or one rep each week. Keep two rep in reserve on most sets to stay safe and consistent.'] },
];

export const FAQ = [
  ['How do I start?', 'Tap "Start Your Transformation", share your goal and details, and our coach will contact you on WhatsApp for a free consultation.'],
  ['Are the diet plans vegetarian friendly?', 'Yes. Every plan is available in vegetarian and non-vegetarian versions and uses everyday Indian food.'],
  ['What is the difference between free and paid diet plans?', 'The free plan gives you calorie and macro targets with a sample day. The paid plan is made by a coach around your body, routine, budget, food choices and health notes, with revisions and support.'],
  ['Can I train from home?', 'Absolutely. Online coaching and home workout plans are included in our programs.'],
  ['What if I want to change my plan?', 'You can upgrade at any time. We adjust your plan based on your weekly progress.'],
];
